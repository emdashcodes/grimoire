import { spawn, type ChildProcess } from 'node:child_process';
import type {
  CreateTerminalRequest,
  CreateTerminalResponse,
  TerminalOutputRequest,
  TerminalOutputResponse,
  WaitForTerminalExitRequest,
  WaitForTerminalExitResponse,
  KillTerminalCommandRequest,
  KillTerminalCommandResponse,
  ReleaseTerminalRequest,
  ReleaseTerminalResponse,
} from '@agentclientprotocol/sdk';

interface TerminalInstance {
  process: ChildProcess;
  sessionId: string;
  output: string;
  outputByteLength: number;
  outputByteLimit: number;
  truncated: boolean;
  exitCode: number | null;
  exitSignal: string | null;
  exited: boolean;
  exitResolvers: Array<() => void>;
}

type OutputListener = (
  terminalId: string,
  sessionId: string,
  output: string,
  truncated: boolean,
  exitStatus: { exitCode?: number | null; signal?: string | null } | null
) => void;

/**
 * Manages terminal child processes for ACP terminal/* methods.
 */
export class TerminalService {
  private terminals = new Map<string, TerminalInstance>();
  private nextId = 1;
  private outputListeners: OutputListener[] = [];

  /** Register a listener for terminal output changes */
  onOutput(listener: OutputListener): () => void {
    this.outputListeners.push(listener);
    return () => {
      this.outputListeners = this.outputListeners.filter((l) => l !== listener);
    };
  }

  private emitOutput(terminal: TerminalInstance, terminalId: string) {
    const exitStatus = terminal.exited
      ? { exitCode: terminal.exitCode, signal: terminal.exitSignal }
      : null;
    for (const listener of this.outputListeners) {
      listener(
        terminalId,
        terminal.sessionId,
        terminal.output,
        terminal.truncated,
        exitStatus
      );
    }
  }

  /** Create a new terminal and start executing a command */
  create(params: CreateTerminalRequest): CreateTerminalResponse {
    const terminalId = `term_${this.nextId++}`;
    const outputByteLimit = params.outputByteLimit ?? 1_048_576; // 1MB default

    const proc = spawn(params.command, params.args ?? [], {
      cwd: params.cwd ?? undefined,
      env: {
        ...process.env,
        ...(params.env
          ? Object.fromEntries(params.env.map((e) => [e.name, e.value]))
          : {}),
      },
      shell: true,
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    const terminal: TerminalInstance = {
      process: proc,
      sessionId: params.sessionId,
      output: '',
      outputByteLength: 0,
      outputByteLimit,
      truncated: false,
      exitCode: null,
      exitSignal: null,
      exited: false,
      exitResolvers: [],
    };

    const appendOutput = (data: Buffer) => {
      const text = data.toString();
      terminal.output += text;
      terminal.outputByteLength += data.byteLength;

      // Truncate from the beginning if we exceed the limit
      if (terminal.outputByteLength > terminal.outputByteLimit) {
        const encoded = Buffer.from(terminal.output);
        const excess = encoded.byteLength - terminal.outputByteLimit;
        // Find a safe character boundary to truncate at
        let truncateAt = excess;
        while (truncateAt < encoded.byteLength && (encoded[truncateAt] & 0xc0) === 0x80) {
          truncateAt++;
        }
        terminal.output = encoded.subarray(truncateAt).toString();
        terminal.outputByteLength = Buffer.byteLength(terminal.output);
        terminal.truncated = true;
      }

      this.emitOutput(terminal, terminalId);
    };

    proc.stdout?.on('data', appendOutput);
    proc.stderr?.on('data', appendOutput);

    proc.on('exit', (code, signal) => {
      terminal.exitCode = code;
      terminal.exitSignal = signal;
      terminal.exited = true;
      // Resolve any waitForExit promises
      for (const resolve of terminal.exitResolvers) {
        resolve();
      }
      terminal.exitResolvers = [];
      this.emitOutput(terminal, terminalId);
    });

    proc.on('error', (err) => {
      terminal.output += `\nProcess error: ${err.message}\n`;
      terminal.exited = true;
      terminal.exitCode = 1;
      for (const resolve of terminal.exitResolvers) {
        resolve();
      }
      terminal.exitResolvers = [];
      this.emitOutput(terminal, terminalId);
    });

    this.terminals.set(terminalId, terminal);
    return { terminalId };
  }

  /** Get current terminal output without waiting */
  output(params: TerminalOutputRequest): TerminalOutputResponse {
    const terminal = this.terminals.get(params.terminalId);
    if (!terminal) {
      return { output: '', truncated: false };
    }

    return {
      output: terminal.output,
      truncated: terminal.truncated,
      ...(terminal.exited
        ? {
            exitStatus: {
              exitCode: terminal.exitCode,
              signal: terminal.exitSignal,
            },
          }
        : {}),
    };
  }

  /** Wait for terminal command to exit */
  async waitForExit(params: WaitForTerminalExitRequest): Promise<WaitForTerminalExitResponse> {
    const terminal = this.terminals.get(params.terminalId);
    if (!terminal) {
      return { exitCode: 1 };
    }

    if (!terminal.exited) {
      await new Promise<void>((resolve) => {
        terminal.exitResolvers.push(resolve);
      });
    }

    return {
      exitCode: terminal.exitCode,
      signal: terminal.exitSignal,
    };
  }

  /** Kill a terminal command without releasing */
  kill(params: KillTerminalCommandRequest): KillTerminalCommandResponse {
    const terminal = this.terminals.get(params.terminalId);
    if (terminal && !terminal.exited) {
      try {
        terminal.process.kill('SIGTERM');
      } catch {
        // already dead
      }
    }
    return {};
  }

  /** Release a terminal, killing the process if still running */
  release(params: ReleaseTerminalRequest): ReleaseTerminalResponse {
    const terminal = this.terminals.get(params.terminalId);
    if (terminal) {
      if (!terminal.exited) {
        try {
          terminal.process.kill('SIGTERM');
        } catch {
          // already dead
        }
      }
      this.terminals.delete(params.terminalId);
    }
    return {};
  }

  /** Clean up all terminals for a session */
  disposeSession(sessionId: string): void {
    for (const [id, terminal] of this.terminals) {
      if (terminal.sessionId === sessionId) {
        if (!terminal.exited) {
          try {
            terminal.process.kill('SIGTERM');
          } catch {
            // already dead
          }
        }
        this.terminals.delete(id);
      }
    }
  }

  /** Clean up all terminals */
  dispose(): void {
    for (const [id, terminal] of this.terminals) {
      if (!terminal.exited) {
        try {
          terminal.process.kill('SIGTERM');
        } catch {
          // already dead
        }
      }
    }
    this.terminals.clear();
  }
}
