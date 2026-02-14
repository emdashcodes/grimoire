import { cn } from '@/lib/cn';
import { useStore } from '@/store';

const statusColors: Record<string, string> = {
  disconnected: 'bg-gray-500',
  connecting: 'bg-yellow-500 animate-pulse',
  ready: 'bg-green-500',
  busy: 'bg-grimoire-accent animate-pulse',
  error: 'bg-red-500',
};

export function StatusBar() {
  const { agentStatus, currentSession } = useStore();

  return (
    <div className="flex items-center h-7 px-4 border-t border-grimoire-border bg-grimoire-surface/50 text-xs text-grimoire-text-muted">
      <div className="flex items-center gap-2">
        <div className={cn('w-2 h-2 rounded-full', statusColors[agentStatus])} />
        <span className="capitalize">{agentStatus}</span>
      </div>

      {currentSession && (
        <>
          <span className="mx-2 text-grimoire-border">|</span>
          <span className="truncate max-w-64">{currentSession.cwd}</span>
        </>
      )}

      <div className="flex-1" />
      <span>Grimoire v0.1.0</span>
    </div>
  );
}
