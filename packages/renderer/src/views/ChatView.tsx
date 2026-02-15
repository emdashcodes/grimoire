import { useEffect, useRef } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { useStore } from '@/store';
import { useAgent } from '@/hooks/useAgent';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { InputBar } from '@/components/chat/InputBar';
import { ConfigBar } from '@/components/chat/ConfigBar';
import { PlanPanel } from '@/components/chat/PlanPanel';
import { PermissionDialog } from '@/components/chat/PermissionDialog';

export function ChatView() {
  const { messages, currentPlan, workingFolder, setWorkingFolder } = useStore();
  const {
    agentStatus,
    currentSession,
    isStreaming,
    isLoadingSession,
    configOptions,
    slashCommands,
    pendingPermission,
    connect,
    sendMessage,
    cancelPrompt,
    setConfigOption,
    respondToPermission,
    cancelPermission,
  } = useAgent();

  const scrollRef = useRef<HTMLDivElement>(null);
  const connected = agentStatus === 'ready' || agentStatus === 'busy';

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4">
        <div className="max-w-3xl mx-auto py-6">
          {/* Loading session indicator */}
          {isLoadingSession && (
            <div className="flex items-center justify-center gap-3 py-8 text-grimoire-text-muted">
              <Loader2 size={20} className="animate-spin text-grimoire-accent" />
              <span className="text-sm">Loading session...</span>
            </div>
          )}

          {messages.length === 0 && !isLoadingSession && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
              <div className="w-16 h-16 rounded-2xl bg-grimoire-accent/10 flex items-center justify-center mb-6">
                <Sparkles size={32} className="text-grimoire-accent" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Grimoire</h2>
              <p className="text-grimoire-text-muted text-sm max-w-md">
                {connected
                  ? 'Connected and ready. Ask anything.'
                  : 'Connect to an agent to start a conversation.'}
              </p>
              {!connected && (
                <button
                  onClick={() => connect()}
                  disabled={agentStatus === 'connecting'}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-grimoire-accent text-white text-sm font-medium hover:bg-grimoire-accent-hover transition-colors disabled:opacity-50"
                >
                  {agentStatus === 'connecting' ? 'Connecting...' : 'Connect to Claude Code'}
                </button>
              )}
            </div>
          )}

          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {/* Streaming indicator */}
          {isStreaming && messages[messages.length - 1]?.role !== 'agent' && (
            <div className="flex items-center gap-2 py-3 text-grimoire-text-muted text-sm">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-grimoire-accent animate-bounce" />
                <div className="w-1.5 h-1.5 rounded-full bg-grimoire-accent animate-bounce [animation-delay:150ms]" />
                <div className="w-1.5 h-1.5 rounded-full bg-grimoire-accent animate-bounce [animation-delay:300ms]" />
              </div>
              <span>Thinking...</span>
            </div>
          )}
        </div>
      </div>

      {/* Plan panel (if active) */}
      {currentPlan.length > 0 && <PlanPanel entries={currentPlan} />}

      {/* Config bar */}
      <ConfigBar configOptions={configOptions} onSetConfig={setConfigOption} />

      {/* Input bar */}
      <InputBar
        onSend={sendMessage}
        onCancel={cancelPrompt}
        isStreaming={isStreaming}
        disabled={!connected || !currentSession}
        slashCommands={slashCommands}
        workingFolder={workingFolder}
        onFolderSelect={setWorkingFolder}
      />

      {/* Permission dialog (modal overlay) */}
      {pendingPermission && (
        <PermissionDialog
          request={pendingPermission}
          onRespond={respondToPermission}
          onCancel={cancelPermission}
        />
      )}
    </div>
  );
}
