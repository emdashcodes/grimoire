/**
 * Typed IPC channel definitions.
 * Both main and renderer import these to ensure type safety across the bridge.
 */

import type {
  AgentConfig,
  AgentSession,
  AgentStatus,
  ConfigOption,
  ContentBlock,
  ConversationMessage,
  PermissionRequest,
  PermissionResponse,
  SessionUpdate,
  StopReason,
  TerminalOutputData,
} from './types/agent';

// ── Invoke channels (request/response via ipcRenderer.invoke) ──────────────

export const IPC = {
  // Agent lifecycle
  AGENT_LIST: 'agent:list',
  AGENT_INITIALIZE: 'agent:initialize',
  AGENT_STATUS: 'agent:status',

  // Session management
  SESSION_CREATE: 'session:create',
  SESSION_LOAD: 'session:load',
  SESSION_LIST: 'session:list',
  SESSION_SET_CONFIG: 'session:set-config',

  // Prompt
  PROMPT_SEND: 'prompt:send',
  PROMPT_CANCEL: 'prompt:cancel',

  // Permissions
  PERMISSION_RESPOND: 'permission:respond',

  // App utilities
  APP_GET_CWD: 'app:get-cwd',

  // Window controls
  WINDOW_MINIMIZE: 'window:minimize',
  WINDOW_MAXIMIZE: 'window:maximize',
  WINDOW_CLOSE: 'window:close',
} as const;

// ── Push channels (main → renderer via webContents.send) ───────────────────

export const PUSH = {
  SESSION_UPDATE: 'session:update',
  SESSION_LOAD_DONE: 'session:load-done',
  PROMPT_DONE: 'prompt:done',
  AGENT_STATUS_CHANGED: 'agent:status-changed',
  PERMISSION_REQUEST: 'permission:request',
  TERMINAL_OUTPUT: 'terminal:output',
} as const;

// ── Type maps for invoke channels ──────────────────────────────────────────

export interface InvokeMap {
  [IPC.AGENT_LIST]: { args: void; result: AgentConfig[] };
  [IPC.AGENT_INITIALIZE]: { args: { agentId: string }; result: void };
  [IPC.AGENT_STATUS]: { args: { agentId: string }; result: AgentStatus };

  [IPC.SESSION_CREATE]: {
    args: { agentId: string; cwd: string };
    result: AgentSession;
  };
  [IPC.SESSION_LOAD]: {
    args: { agentId: string; sessionId: string; cwd: string };
    result: void;
  };
  [IPC.SESSION_LIST]: { args: void; result: AgentSession[] };
  [IPC.SESSION_SET_CONFIG]: {
    args: { sessionId: string; configId: string; value: string };
    result: { configOptions: ConfigOption[] };
  };

  [IPC.PROMPT_SEND]: {
    args: { sessionId: string; content: ContentBlock[] };
    result: { stopReason: StopReason };
  };
  [IPC.PROMPT_CANCEL]: { args: { sessionId: string }; result: void };

  [IPC.PERMISSION_RESPOND]: {
    args: PermissionResponse;
    result: void;
  };

  [IPC.APP_GET_CWD]: { args: void; result: string };

  [IPC.WINDOW_MINIMIZE]: { args: void; result: void };
  [IPC.WINDOW_MAXIMIZE]: { args: void; result: void };
  [IPC.WINDOW_CLOSE]: { args: void; result: void };
}

export interface PushMap {
  [PUSH.SESSION_UPDATE]: { sessionId: string; update: SessionUpdate };
  [PUSH.SESSION_LOAD_DONE]: { sessionId: string };
  [PUSH.PROMPT_DONE]: { sessionId: string; stopReason: StopReason };
  [PUSH.AGENT_STATUS_CHANGED]: { agentId: string; status: AgentStatus };
  [PUSH.PERMISSION_REQUEST]: PermissionRequest;
  [PUSH.TERMINAL_OUTPUT]: TerminalOutputData;
}

// ── Helper types for the preload bridge ────────────────────────────────────

export type InvokeChannel = keyof InvokeMap;
export type PushChannel = keyof PushMap;
