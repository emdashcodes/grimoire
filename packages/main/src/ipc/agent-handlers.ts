import type { IpcMain, BrowserWindow } from 'electron';
import { IPC, PUSH } from '@grimoire/shared';
import type { PermissionResponse } from '@grimoire/shared';
import type { AgentManager } from '../services/agent-manager.js';

export function registerAgentHandlers(
  ipcMain: IpcMain,
  agentManager: AgentManager,
  win: BrowserWindow
): void {
  // Forward session updates to the renderer
  agentManager.onSessionUpdate((sessionId, update) => {
    if (!win.isDestroyed()) {
      win.webContents.send(PUSH.SESSION_UPDATE, { sessionId, update });
    }
  });

  // Forward status changes to the renderer
  agentManager.onStatusChange((agentId, status) => {
    if (!win.isDestroyed()) {
      win.webContents.send(PUSH.AGENT_STATUS_CHANGED, { agentId, status });
    }
  });

  // Forward permission requests to the renderer
  agentManager.onPermissionRequest((request) => {
    if (!win.isDestroyed()) {
      win.webContents.send(PUSH.PERMISSION_REQUEST, request);
    }
  });

  // Forward terminal output to the renderer
  agentManager.getTerminalService().onOutput(
    (terminalId, sessionId, output, truncated, exitStatus) => {
      if (!win.isDestroyed()) {
        win.webContents.send(PUSH.TERMINAL_OUTPUT, {
          terminalId,
          sessionId,
          output,
          truncated,
          exitStatus,
        });
      }
    }
  );

  // Agent lifecycle
  ipcMain.handle(IPC.AGENT_LIST, () => {
    return agentManager.listAgents();
  });

  ipcMain.handle(IPC.AGENT_INITIALIZE, async (_event, { agentId }: { agentId: string }) => {
    await agentManager.initializeAgent(agentId);
  });

  ipcMain.handle(IPC.AGENT_STATUS, (_event, { agentId }: { agentId: string }) => {
    return agentManager.getStatus(agentId);
  });

  // Sessions
  ipcMain.handle(
    IPC.SESSION_CREATE,
    async (_event, { agentId, cwd }: { agentId: string; cwd: string }) => {
      return agentManager.createSession(agentId, cwd);
    }
  );

  ipcMain.handle(IPC.SESSION_LIST, () => {
    return agentManager.listSessions();
  });

  // Session load (resume previous session)
  ipcMain.handle(
    IPC.SESSION_LOAD,
    async (_event, { agentId, sessionId, cwd }: { agentId: string; sessionId: string; cwd: string }) => {
      await agentManager.loadSession(agentId, sessionId, cwd);
      if (!win.isDestroyed()) {
        win.webContents.send(PUSH.SESSION_LOAD_DONE, { sessionId });
      }
    }
  );

  // Session config option
  ipcMain.handle(
    IPC.SESSION_SET_CONFIG,
    async (_event, { sessionId, configId, value }: { sessionId: string; configId: string; value: string }) => {
      return agentManager.setConfigOption(sessionId, configId, value);
    }
  );

  // Prompt
  ipcMain.handle(
    IPC.PROMPT_SEND,
    async (_event, { sessionId, content }) => {
      const result = await agentManager.prompt(sessionId, content);
      if (!win.isDestroyed()) {
        win.webContents.send(PUSH.PROMPT_DONE, {
          sessionId,
          stopReason: result.stopReason,
        });
      }
      return result;
    }
  );

  ipcMain.handle(IPC.PROMPT_CANCEL, async (_event, { sessionId }) => {
    await agentManager.cancel(sessionId);
  });

  // Permission response from renderer
  ipcMain.handle(
    IPC.PERMISSION_RESPOND,
    async (_event, response: PermissionResponse) => {
      agentManager.resolvePermission(response);
    }
  );
}
