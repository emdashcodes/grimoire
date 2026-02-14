import { useEffect, useState } from 'react';
import { MessageSquare, FolderOpen, CheckSquare, Calendar, Plus, Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useStore } from '@/store';
import { useAgent } from '@/hooks/useAgent';
import type { SidebarMode } from '@/store/ui-slice';
import type { AgentSession } from '@grimoire/shared';

const modes: Array<{ id: SidebarMode; icon: typeof MessageSquare; label: string }> = [
  { id: 'chat', icon: MessageSquare, label: 'Chat' },
  { id: 'vault', icon: FolderOpen, label: 'Vault' },
  { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
  { id: 'calendar', icon: Calendar, label: 'Calendar' },
];

/** Format a timestamp into a relative or short date string */
function formatTimestamp(ts: number): string {
  const now = Date.now();
  const diff = now - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

/** Extract a display title from a session */
function sessionTitle(session: AgentSession): string {
  return session.title || 'Untitled session';
}

/** Extract a short working directory label */
function cwdLabel(cwd: string): string {
  // Detect home directory pattern (/Users/x or /home/x)
  const homeMatch = cwd.match(/^\/(?:Users|home)\/[^/]+$/);
  if (homeMatch) return '~';
  // For project directories, show the last path segment
  const parts = cwd.split('/');
  return parts[parts.length - 1] || cwd;
}

function SessionItem({
  session,
  isActive,
  isLoading,
  onClick,
}: {
  session: AgentSession;
  isActive: boolean;
  isLoading: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={cn(
        'w-full text-left px-3 py-2 rounded-lg transition-colors group',
        isActive
          ? 'bg-grimoire-accent/10 text-grimoire-text'
          : 'text-grimoire-text-muted hover:text-grimoire-text hover:bg-grimoire-surface-hover',
        isLoading && 'opacity-60'
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        {isLoading ? (
          <Loader2 size={14} className="animate-spin flex-shrink-0 text-grimoire-accent" />
        ) : (
          <MessageSquare
            size={14}
            className={cn(
              'flex-shrink-0',
              isActive ? 'text-grimoire-accent' : 'text-grimoire-text-muted'
            )}
          />
        )}
        <span className="text-sm truncate font-medium">{sessionTitle(session)}</span>
      </div>
      <div className="flex items-center gap-2 mt-0.5 ml-[22px]">
        <span className="text-[11px] text-grimoire-text-muted truncate">
          {cwdLabel(session.cwd)}
        </span>
        <span className="text-[11px] text-grimoire-text-muted/60 flex-shrink-0">
          {formatTimestamp(session.createdAt)}
        </span>
      </div>
    </button>
  );
}

export function Sidebar() {
  const { sidebarMode, setSidebarMode, sidebarCollapsed } = useStore();

  // Tick every 30s to refresh relative timestamps
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => clearInterval(id);
  }, []);
  const {
    currentSession,
    sessionList,
    isLoadingSession,
    agentStatus,
    connect,
    createSession,
    loadSession,
    fetchSessionList,
  } = useAgent();

  const connected = agentStatus === 'ready' || agentStatus === 'busy';

  // Fetch session list on mount and when agent becomes connected
  useEffect(() => {
    if (connected) {
      fetchSessionList();
    }
  }, [connected, fetchSessionList]);

  if (sidebarCollapsed) return null;

  const handleNewSession = () => {
    if (!connected) {
      connect();
    } else {
      createSession('claude-code');
    }
  };

  const handleSessionClick = (session: AgentSession) => {
    if (session.sessionId === currentSession?.sessionId) return;
    loadSession(session.sessionId, session.agentId, session.cwd);
  };

  return (
    <aside className="w-56 flex flex-col border-r border-grimoire-border bg-grimoire-surface/50">
      {/* Mode switcher */}
      <nav className="flex flex-col gap-1 p-2">
        {modes.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setSidebarMode(id)}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
              sidebarMode === id
                ? 'bg-grimoire-accent/10 text-grimoire-accent'
                : 'text-grimoire-text-muted hover:text-grimoire-text hover:bg-grimoire-surface-hover'
            )}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Session list (chat mode) */}
      {sidebarMode === 'chat' && (
        <div className="flex-1 flex flex-col overflow-hidden border-t border-grimoire-border mt-2">
          {/* New session button */}
          <div className="p-2">
            <button
              onClick={handleNewSession}
              disabled={agentStatus === 'connecting'}
              className={cn(
                'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm',
                'text-grimoire-text-muted hover:text-grimoire-text',
                'hover:bg-grimoire-surface-hover transition-colors',
                'disabled:opacity-50'
              )}
            >
              <Plus size={16} />
              <span>New session</span>
            </button>
          </div>

          {/* Session list */}
          <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-0.5">
            {sessionList.length === 0 ? (
              <p className="text-xs text-grimoire-text-muted px-3 py-2">
                {connected ? 'No sessions yet' : 'Connect to see sessions'}
              </p>
            ) : (
              sessionList
                .slice()
                .sort((a, b) => b.createdAt - a.createdAt)
                .map((session) => (
                  <SessionItem
                    key={session.sessionId}
                    session={session}
                    isActive={session.sessionId === currentSession?.sessionId}
                    isLoading={isLoadingSession && session.sessionId === currentSession?.sessionId}
                    onClick={() => handleSessionClick(session)}
                  />
                ))
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
