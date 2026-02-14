/** Agent configuration stored in ~/.grimoire/agents/*.json */
export interface AgentConfig {
  id: string;
  name: string;
  command: string;
  args: string[];
  env?: Record<string, string>;
}

/** Capabilities reported by the agent during initialization */
export interface AgentCapabilities {
  loadSession: boolean;
  promptCapabilities: {
    image: boolean;
    audio: boolean;
    embeddedContext: boolean;
  };
  mcp?: {
    http: boolean;
    sse: boolean;
  };
}

/** Agent connection state */
export type AgentStatus = 'disconnected' | 'connecting' | 'ready' | 'busy' | 'error';

/** A session with an agent */
export interface AgentSession {
  sessionId: string;
  agentId: string;
  cwd: string;
  createdAt: number;
  title?: string;
}

/** Content block types (matching ACP ContentBlock) */
export type ContentBlock =
  | TextContent
  | ImageContent
  | ResourceContent
  | ResourceLinkContent;

export interface TextContent {
  type: 'text';
  text: string;
}

export interface ImageContent {
  type: 'image';
  mimeType: string;
  data: string;
  uri?: string;
}

export interface ResourceContent {
  type: 'resource';
  resource: {
    uri: string;
    mimeType?: string;
    text?: string;
    blob?: string;
  };
}

export interface ResourceLinkContent {
  type: 'resource_link';
  uri: string;
  name: string;
  mimeType?: string;
  title?: string;
  description?: string;
  size?: number;
}

/** Tool call status */
export type ToolCallStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

/** A tool call from the agent */
export interface ToolCall {
  toolCallId: string;
  title: string;
  kind: string;
  status: ToolCallStatus;
  content?: ContentBlock[];
  /** Duration in milliseconds (set on completion) */
  duration?: number;
  /** Timestamp when the tool call started */
  startedAt?: number;
}

/** Permission option kind hint for UI rendering */
export type PermissionOptionKind = 'allow_once' | 'allow_always' | 'reject_once' | 'reject_always';

/** A permission option presented to the user */
export interface PermissionOption {
  optionId: string;
  name: string;
  kind: PermissionOptionKind;
}

/** Permission request forwarded from agent to renderer */
export interface PermissionRequest {
  requestId: string;
  sessionId: string;
  toolCall: {
    toolCallId: string;
    title?: string;
    kind?: string;
    status?: string;
  };
  options: PermissionOption[];
}

/** Permission response from renderer back to main */
export interface PermissionResponse {
  requestId: string;
  outcome: { outcome: 'selected'; optionId: string } | { outcome: 'cancelled' };
}

/** Terminal output data pushed to renderer for live display */
export interface TerminalOutputData {
  terminalId: string;
  sessionId: string;
  output: string;
  truncated: boolean;
  exitStatus?: { exitCode?: number | null; signal?: string | null } | null;
}

/** Plan entry from the agent */
export interface PlanEntry {
  content: string;
  priority: string;
  status: 'pending' | 'in_progress' | 'completed';
}

/** A message in the conversation */
export interface ConversationMessage {
  id: string;
  role: 'user' | 'agent';
  content: ContentBlock[];
  toolCalls?: ToolCall[];
  plan?: PlanEntry[];
  timestamp: number;
}

/** Stop reasons for a prompt turn */
export type StopReason = 'end_turn' | 'max_tokens' | 'max_turn_requests' | 'refusal' | 'cancelled';

/** Session update types from ACP */
export type SessionUpdate =
  | { sessionUpdate: 'agent_message_chunk'; content: ContentBlock }
  | { sessionUpdate: 'user_message_chunk'; content: ContentBlock }
  | { sessionUpdate: 'tool_call'; toolCallId: string; title: string; kind: string; status: ToolCallStatus }
  | { sessionUpdate: 'tool_call_update'; toolCallId: string; status: ToolCallStatus; content?: Array<{ type: 'content'; content: ContentBlock }> }
  | { sessionUpdate: 'plan'; entries: PlanEntry[] }
  | { sessionUpdate: 'available_commands_update'; availableCommands: SlashCommand[] }
  | { sessionUpdate: 'config_options_update'; configOptions: ConfigOption[] };

/** Slash command from agent (ACP AvailableCommand) */
export interface SlashCommand {
  name: string;
  description: string;
  input?: {
    hint: string;
  };
}

/** Config option value (ACP ConfigOptionValue) */
export interface ConfigOptionValue {
  value: string;
  name: string;
  description?: string;
}

/** Config option category (ACP ConfigOptionCategory) */
export type ConfigOptionCategory = 'mode' | 'model' | 'thought_level' | string;

/** Config option from agent (ACP ConfigOption) */
export interface ConfigOption {
  id: string;
  name: string;
  description?: string;
  category?: ConfigOptionCategory;
  type: 'select';
  currentValue: string;
  options: ConfigOptionValue[];
}
