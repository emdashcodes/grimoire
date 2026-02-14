import { spawn, type ChildProcess } from 'node:child_process';
import { Readable, Writable } from 'node:stream';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import {
  ClientSideConnection,
  ndJsonStream,
  PROTOCOL_VERSION,
  type Client,
  type Agent,
  type SessionNotification,
  type RequestPermissionRequest,
  type RequestPermissionResponse,
  type ReadTextFileRequest,
  type ReadTextFileResponse,
  type WriteTextFileRequest,
  type WriteTextFileResponse,
  type CreateTerminalRequest,
  type CreateTerminalResponse,
  type TerminalOutputRequest,
  type TerminalOutputResponse,
  type WaitForTerminalExitRequest,
  type WaitForTerminalExitResponse,
  type KillTerminalCommandRequest,
  type KillTerminalCommandResponse,
  type ReleaseTerminalRequest,
  type ReleaseTerminalResponse,
} from '@agentclientprotocol/sdk';
import type {
  AgentCapabilities,
  AgentConfig,
  AgentSession,
  AgentStatus,
  ConfigOption,
  ContentBlock,
  PermissionRequest,
  PermissionResponse,
  SessionUpdate,
  StopReason,
} from '@grimoire/shared';
import { TerminalService } from './terminal-service.js';

interface AgentInstance {
  config: AgentConfig;
  process: ChildProcess;
  connection: ClientSideConnection;
  capabilities: AgentCapabilities | null;
  status: AgentStatus;
}

interface SessionEntry {
  session: AgentSession;
  agentId: string;
}

type UpdateListener = (sessionId: string, update: SessionUpdate) => void;
type StatusListener = (agentId: string, status: AgentStatus) => void;
type PermissionListener = (request: PermissionRequest) => void;

/**
 * Manages ACP agent subprocesses and sessions.
 * Implements the ACP Client interface to handle agent callbacks
 * for filesystem, terminal, and permission operations.
 */
export class AgentManager {
  private agents = new Map<string, AgentInstance>();
  private sessions = new Map<string, SessionEntry>();
  private updateListeners: UpdateListener[] = [];
  private statusListeners: StatusListener[] = [];
  private permissionListeners: PermissionListener[] = [];
  private pendingPermissions = new Map<
    string,
    { resolve: (response: PermissionResponse) => void }
  >();
  private terminalService = new TerminalService();
  private nextPermissionId = 1;

  /** Register a listener for session updates */
  onSessionUpdate(listener: UpdateListener): () => void {
    this.updateListeners.push(listener);
    return () => {
      this.updateListeners = this.updateListeners.filter((l) => l !== listener);
    };
  }

  /** Register a listener for agent status changes */
  onStatusChange(listener: StatusListener): () => void {
    this.statusListeners.push(listener);
    return () => {
      this.statusListeners = this.statusListeners.filter((l) => l !== listener);
    };
  }

  /** Register a listener for permission requests */
  onPermissionRequest(listener: PermissionListener): () => void {
    this.permissionListeners.push(listener);
    return () => {
      this.permissionListeners = this.permissionListeners.filter((l) => l !== listener);
    };
  }

  /** Get the terminal service for output streaming */
  getTerminalService(): TerminalService {
    return this.terminalService;
  }

  /** Resolve a pending permission request from the renderer */
  resolvePermission(response: PermissionResponse): void {
    const pending = this.pendingPermissions.get(response.requestId);
    if (pending) {
      pending.resolve(response);
      this.pendingPermissions.delete(response.requestId);
    }
  }

  private emitUpdate(sessionId: string, update: SessionUpdate) {
    for (const listener of this.updateListeners) {
      listener(sessionId, update);
    }
  }

  private emitStatus(agentId: string, status: AgentStatus) {
    for (const listener of this.statusListeners) {
      listener(agentId, status);
    }
  }

  private emitPermissionRequest(request: PermissionRequest) {
    for (const listener of this.permissionListeners) {
      listener(request);
    }
  }

  private setStatus(agentId: string, status: AgentStatus) {
    const agent = this.agents.get(agentId);
    if (agent) {
      agent.status = status;
      this.emitStatus(agentId, status);
    }
  }

  /** List available agent configs */
  listAgents(): AgentConfig[] {
    return [
      {
        id: 'claude-code',
        name: 'Claude Code',
        command: 'npx',
        args: ['@zed-industries/claude-code-acp@latest'],
        env: {},
      },
    ];
  }

  /** Get the status of an agent */
  getStatus(agentId: string): AgentStatus {
    return this.agents.get(agentId)?.status ?? 'disconnected';
  }

  /**
   * Creates the ACP Client handler object that implements callbacks
   * the agent invokes on the client side.
   */
  private createClientHandler(_agent: Agent): Client {
    return {
      // ── Session update notifications ────────────────────────────────
      sessionUpdate: async (params: SessionNotification) => {
        this.emitUpdate(
          params.sessionId,
          params.update as unknown as SessionUpdate
        );
      },

      // ── Permission requests ─────────────────────────────────────────
      requestPermission: async (
        params: RequestPermissionRequest
      ): Promise<RequestPermissionResponse> => {
        const requestId = `perm_${this.nextPermissionId++}`;

        const permissionRequest: PermissionRequest = {
          requestId,
          sessionId: params.sessionId,
          toolCall: {
            toolCallId: params.toolCall.toolCallId,
            title: params.toolCall.title ?? undefined,
            kind: params.toolCall.kind ?? undefined,
            status: params.toolCall.status ?? undefined,
          },
          options: params.options.map((opt) => ({
            optionId: opt.optionId,
            name: opt.name,
            kind: opt.kind as PermissionRequest['options'][0]['kind'],
          })),
        };

        this.emitPermissionRequest(permissionRequest);

        // Wait for renderer to respond
        const response = await new Promise<PermissionResponse>((resolve) => {
          this.pendingPermissions.set(requestId, { resolve });
        });

        return { outcome: response.outcome };
      },

      // ── File system operations ──────────────────────────────────────
      readTextFile: async (
        params: ReadTextFileRequest
      ): Promise<ReadTextFileResponse> => {
        try {
          const fullContent = await fs.readFile(params.path, 'utf-8');
          const lines = fullContent.split('\n');

          // Apply line/limit parameters (1-based line numbers)
          const startLine = params.line ? params.line - 1 : 0;
          const endLine = params.limit
            ? startLine + params.limit
            : lines.length;
          const selectedLines = lines.slice(startLine, endLine);

          return { content: selectedLines.join('\n') };
        } catch (err: any) {
          throw new Error(`Failed to read file ${params.path}: ${err.message}`);
        }
      },

      writeTextFile: async (
        params: WriteTextFileRequest
      ): Promise<WriteTextFileResponse> => {
        try {
          // Ensure parent directory exists
          const dir = path.dirname(params.path);
          await fs.mkdir(dir, { recursive: true });
          await fs.writeFile(params.path, params.content, 'utf-8');
          return {};
        } catch (err: any) {
          throw new Error(
            `Failed to write file ${params.path}: ${err.message}`
          );
        }
      },

      // ── Terminal operations ─────────────────────────────────────────
      createTerminal: async (
        params: CreateTerminalRequest
      ): Promise<CreateTerminalResponse> => {
        return this.terminalService.create(params);
      },

      terminalOutput: async (
        params: TerminalOutputRequest
      ): Promise<TerminalOutputResponse> => {
        return this.terminalService.output(params);
      },

      waitForTerminalExit: async (
        params: WaitForTerminalExitRequest
      ): Promise<WaitForTerminalExitResponse> => {
        return this.terminalService.waitForExit(params);
      },

      killTerminal: async (
        params: KillTerminalCommandRequest
      ): Promise<KillTerminalCommandResponse> => {
        return this.terminalService.kill(params);
      },

      releaseTerminal: async (
        params: ReleaseTerminalRequest
      ): Promise<ReleaseTerminalResponse> => {
        return this.terminalService.release(params);
      },
    };
  }

  /** Initialize an agent subprocess and perform ACP handshake */
  async initializeAgent(agentId: string): Promise<void> {
    // Kill existing instance if any
    if (this.agents.has(agentId)) {
      await this.disposeAgent(agentId);
    }

    const configs = this.listAgents();
    const config = configs.find((c) => c.id === agentId);
    if (!config) {
      throw new Error(`Unknown agent: ${agentId}`);
    }

    this.emitStatus(agentId, 'connecting');

    // Spawn the agent subprocess
    const proc = spawn(config.command, config.args, {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env, ...config.env },
    });

    proc.stderr?.on('data', (data: Buffer) => {
      console.error(`[${agentId} stderr]`, data.toString());
    });

    proc.on('exit', (code) => {
      console.log(`[${agentId}] exited with code ${code}`);
      this.setStatus(agentId, 'disconnected');
    });

    // Create ACP connection using ndJsonStream (Web Streams API)
    const writableStream = Writable.toWeb(proc.stdin!);
    const readableStream = Readable.toWeb(
      proc.stdout!
    ) as ReadableStream<Uint8Array>;
    const stream = ndJsonStream(writableStream, readableStream);

    const connection = new ClientSideConnection(
      (agent) => this.createClientHandler(agent),
      stream
    );

    // Perform initialization handshake
    const initResult = await connection.initialize({
      protocolVersion: PROTOCOL_VERSION,
      clientCapabilities: {
        fs: {
          readTextFile: true,
          writeTextFile: true,
        },
        terminal: true,
      },
      clientInfo: {
        name: 'grimoire',
        title: 'Grimoire',
        version: '0.1.0',
      },
    });

    const capabilities: AgentCapabilities = {
      loadSession: initResult.agentCapabilities?.loadSession ?? false,
      promptCapabilities: {
        image:
          initResult.agentCapabilities?.promptCapabilities?.image ?? false,
        audio:
          initResult.agentCapabilities?.promptCapabilities?.audio ?? false,
        embeddedContext:
          initResult.agentCapabilities?.promptCapabilities?.embeddedContext ??
          false,
      },
      mcp: {
        http:
          initResult.agentCapabilities?.mcpCapabilities?.http ?? false,
        sse:
          initResult.agentCapabilities?.mcpCapabilities?.sse ?? false,
      },
    };

    const instance: AgentInstance = {
      config,
      process: proc,
      connection,
      capabilities,
      status: 'ready',
    };

    this.agents.set(agentId, instance);
    this.setStatus(agentId, 'ready');

    console.log(
      `[${agentId}] initialized — agent: ${initResult.agentInfo?.name} v${initResult.agentInfo?.version}`
    );
  }

  /** Create a new session */
  async createSession(
    agentId: string,
    cwd: string
  ): Promise<AgentSession> {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent ${agentId} not initialized`);
    }

    const result = await agent.connection.newSession({
      cwd,
      mcpServers: [],
    });

    const session: AgentSession = {
      sessionId: result.sessionId,
      agentId,
      cwd,
      createdAt: Date.now(),
    };

    this.sessions.set(result.sessionId, { session, agentId });
    return session;
  }

  /** Load (resume) an existing session */
  async loadSession(
    agentId: string,
    sessionId: string,
    cwd: string
  ): Promise<void> {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent ${agentId} not initialized`);
    }

    if (!agent.capabilities?.loadSession) {
      throw new Error(`Agent ${agentId} does not support session loading`);
    }

    await agent.connection.loadSession({
      sessionId,
      cwd,
      mcpServers: [],
    });

    // Store the session entry if not already tracked
    if (!this.sessions.has(sessionId)) {
      const session: AgentSession = {
        sessionId,
        agentId,
        cwd,
        createdAt: Date.now(),
      };
      this.sessions.set(sessionId, { session, agentId });
    }
  }

  /** Send a prompt to a session */
  async prompt(
    sessionId: string,
    content: ContentBlock[]
  ): Promise<{ stopReason: StopReason }> {
    const entry = this.sessions.get(sessionId);
    if (!entry) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const agent = this.agents.get(entry.agentId);
    if (!agent) {
      throw new Error(`Agent ${entry.agentId} not found`);
    }

    this.setStatus(entry.agentId, 'busy');

    try {
      const result = await agent.connection.prompt({
        sessionId,
        prompt: content as any,
      });
      this.setStatus(entry.agentId, 'ready');
      return { stopReason: (result.stopReason as StopReason) ?? 'end_turn' };
    } catch (err) {
      this.setStatus(entry.agentId, 'ready');
      throw err;
    }
  }

  /** Set a config option value for a session */
  async setConfigOption(
    sessionId: string,
    configId: string,
    value: string
  ): Promise<{ configOptions: ConfigOption[] }> {
    const entry = this.sessions.get(sessionId);
    if (!entry) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const agent = this.agents.get(entry.agentId);
    if (!agent) {
      throw new Error(`Agent ${entry.agentId} not found`);
    }

    const result = await agent.connection.setSessionConfigOption({
      sessionId,
      configId,
      value,
    });

    return { configOptions: (result?.configOptions ?? []) as ConfigOption[] };
  }

  /** Cancel an ongoing prompt */
  async cancel(sessionId: string): Promise<void> {
    const entry = this.sessions.get(sessionId);
    if (!entry) return;

    const agent = this.agents.get(entry.agentId);
    if (!agent) return;

    await agent.connection.cancel({ sessionId });

    // Cancel any pending permission requests for this session
    for (const [requestId, pending] of this.pendingPermissions) {
      pending.resolve({
        requestId,
        outcome: { outcome: 'cancelled' },
      });
    }
  }

  /** List all sessions */
  listSessions(): AgentSession[] {
    return Array.from(this.sessions.values()).map((e) => e.session);
  }

  /** Dispose a single agent */
  private async disposeAgent(agentId: string): Promise<void> {
    const agent = this.agents.get(agentId);
    if (!agent) return;

    // Clean up terminals for all sessions of this agent
    for (const [sessionId, entry] of this.sessions) {
      if (entry.agentId === agentId) {
        this.terminalService.disposeSession(sessionId);
      }
    }

    try {
      agent.process?.kill();
    } catch {
      // already dead
    }
    this.agents.delete(agentId);
    this.emitStatus(agentId, 'disconnected');
  }

  /** Clean up all agents on app quit */
  dispose(): void {
    this.terminalService.dispose();
    for (const [id] of this.agents) {
      this.disposeAgent(id);
    }
  }
}
