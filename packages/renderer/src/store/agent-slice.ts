import type { StateCreator } from 'zustand';
import type {
  AgentSession,
  AgentStatus,
  ConversationMessage,
  ConfigOption,
  ContentBlock,
  PermissionRequest,
  SessionUpdate,
  SlashCommand,
  StopReason,
  ToolCall,
  PlanEntry,
} from '@grimoire/shared';

export interface AgentSlice {
  // State
  agentStatus: AgentStatus;
  currentSession: AgentSession | null;
  sessionList: AgentSession[];
  messages: ConversationMessage[];
  isStreaming: boolean;
  isLoadingSession: boolean;
  currentPlan: PlanEntry[];
  configOptions: ConfigOption[];
  slashCommands: SlashCommand[];
  pendingPermission: PermissionRequest | null;

  // Actions
  setAgentStatus: (status: AgentStatus) => void;
  setCurrentSession: (session: AgentSession | null) => void;
  setSessionList: (sessions: AgentSession[]) => void;
  addUserMessage: (content: ContentBlock[]) => void;
  handleSessionUpdate: (update: SessionUpdate) => void;
  setStreaming: (streaming: boolean) => void;
  setLoadingSession: (loading: boolean) => void;
  setConfigOptions: (options: ConfigOption[]) => void;
  setSlashCommands: (commands: SlashCommand[]) => void;
  setPendingPermission: (request: PermissionRequest | null) => void;
  clearMessages: () => void;
}

let messageCounter = 0;

export const createAgentSlice: StateCreator<AgentSlice> = (set, get) => ({
  agentStatus: 'disconnected',
  currentSession: null,
  sessionList: [],
  messages: [],
  isStreaming: false,
  isLoadingSession: false,
  currentPlan: [],
  configOptions: [],
  slashCommands: [],
  pendingPermission: null,

  setAgentStatus: (status) => set({ agentStatus: status }),

  setCurrentSession: (session) => set({ currentSession: session }),

  setSessionList: (sessions) => set({ sessionList: sessions }),

  addUserMessage: (content) => {
    const msg: ConversationMessage = {
      id: `user-${++messageCounter}`,
      role: 'user',
      content,
      timestamp: Date.now(),
    };
    set((s) => ({ messages: [...s.messages, msg] }));
  },

  handleSessionUpdate: (update) => {
    const { messages } = get();

    switch (update.sessionUpdate) {
      case 'user_message_chunk': {
        // Used during session replay (session/load) — user messages arrive as updates
        const last = messages[messages.length - 1];
        if (last?.role === 'user') {
          // Append delta to existing user message
          const existingText =
            last.content[0]?.type === 'text' ? last.content[0].text : '';
          const newText =
            update.content.type === 'text' ? update.content.text : '';
          const updated: ConversationMessage = {
            ...last,
            content: [{ type: 'text', text: existingText + newText }],
          };
          set({ messages: [...messages.slice(0, -1), updated] });
        } else {
          // Start new user message
          const msg: ConversationMessage = {
            id: `replay-user-${++messageCounter}`,
            role: 'user',
            content: [update.content],
            timestamp: Date.now(),
          };
          set({ messages: [...messages, msg] });
        }
        break;
      }

      case 'agent_message_chunk': {
        const last = messages[messages.length - 1];
        if (last?.role === 'agent' && !last.toolCalls?.length) {
          // Append delta to existing agent message
          const existingText =
            last.content[0]?.type === 'text' ? last.content[0].text : '';
          const newText =
            update.content.type === 'text' ? update.content.text : '';
          const updated: ConversationMessage = {
            ...last,
            content: [{ type: 'text', text: existingText + newText }],
          };
          set({ messages: [...messages.slice(0, -1), updated] });
        } else {
          // Start new agent message
          const msg: ConversationMessage = {
            id: `agent-${++messageCounter}`,
            role: 'agent',
            content: [update.content],
            timestamp: Date.now(),
          };
          set({ messages: [...messages, msg] });
        }
        break;
      }

      case 'tool_call': {
        const toolCall: ToolCall = {
          toolCallId: update.toolCallId,
          title: update.title,
          kind: update.kind,
          status: update.status,
          startedAt: Date.now(),
        };
        // Add as a new agent message with tool call
        const msg: ConversationMessage = {
          id: `tool-${++messageCounter}`,
          role: 'agent',
          content: [],
          toolCalls: [toolCall],
          timestamp: Date.now(),
        };
        set({ messages: [...messages, msg] });
        break;
      }

      case 'tool_call_update': {
        // Find and update the tool call in messages, computing duration on completion
        const updated = messages.map((m) => {
          if (!m.toolCalls) return m;
          const updatedCalls = m.toolCalls.map((tc) => {
            if (tc.toolCallId !== update.toolCallId) return tc;
            const isCompleting = update.status === 'completed' || update.status === 'cancelled';
            return {
              ...tc,
              status: update.status,
              content: update.content?.map((c) => c.content) ?? tc.content,
              duration: isCompleting && tc.startedAt ? Date.now() - tc.startedAt : tc.duration,
            };
          });
          return { ...m, toolCalls: updatedCalls };
        });
        set({ messages: updated });
        break;
      }

      case 'plan': {
        set({ currentPlan: update.entries });
        break;
      }

      case 'available_commands_update': {
        set({ slashCommands: update.availableCommands });
        break;
      }

      case 'config_options_update': {
        set({ configOptions: update.configOptions });
        break;
      }

      default:
        break;
    }
  },

  setStreaming: (streaming) => set({ isStreaming: streaming }),

  setLoadingSession: (loading) => set({ isLoadingSession: loading }),

  setConfigOptions: (options) => set({ configOptions: options }),

  setSlashCommands: (commands) => set({ slashCommands: commands }),

  setPendingPermission: (request) => set({ pendingPermission: request }),

  clearMessages: () => set({ messages: [], currentPlan: [], configOptions: [], slashCommands: [], pendingPermission: null }),
});
