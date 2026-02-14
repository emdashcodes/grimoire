import { useState } from 'react';
import { ChevronDown, Circle, CircleDot, CircleCheck, ListChecks } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { PlanEntry } from '@grimoire/shared';

interface Props {
  entries: PlanEntry[];
}

function PlanEntryIcon({ status }: { status: PlanEntry['status'] }) {
  switch (status) {
    case 'completed':
      return <CircleCheck size={14} className="text-green-500/80 flex-shrink-0" />;
    case 'in_progress':
      return <CircleDot size={14} className="text-grimoire-accent flex-shrink-0 animate-pulse" />;
    case 'pending':
    default:
      return <Circle size={14} className="text-grimoire-text-muted/40 flex-shrink-0" />;
  }
}

function priorityDot(priority: string) {
  switch (priority) {
    case 'high':
      return 'bg-red-500/70';
    case 'medium':
      return 'bg-yellow-500/60';
    case 'low':
      return 'bg-grimoire-text-muted/30';
    default:
      return null;
  }
}

export function PlanPanel({ entries }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  const completedCount = entries.filter((e) => e.status === 'completed').length;
  const totalCount = entries.length;
  const allDone = completedCount === totalCount;

  return (
    <div
      className={cn(
        'border-t border-grimoire-border/60 bg-grimoire-bg/80',
        'backdrop-blur-sm transition-colors',
        allDone && 'opacity-60'
      )}
    >
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-2 w-full py-2 text-left group"
        >
          <ListChecks size={14} className="text-grimoire-text-muted" />
          <span className="text-xs font-medium text-grimoire-text-muted">
            Plan
          </span>
          <span className="text-xs text-grimoire-text-muted/60 tabular-nums">
            {completedCount}/{totalCount}
          </span>

          {/* Progress bar (micro) */}
          <div className="flex-1 mx-2 h-0.5 bg-grimoire-border/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-grimoire-accent/50 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
            />
          </div>

          <ChevronDown
            size={12}
            className={cn(
              'text-grimoire-text-muted/50 transition-transform duration-150',
              collapsed && '-rotate-90'
            )}
          />
        </button>

        {/* Entries */}
        {!collapsed && (
          <ul className="pb-2 space-y-0.5">
            {entries.map((entry, i) => {
              const dot = priorityDot(entry.priority);
              return (
                <li key={i} className="flex items-start gap-2 py-0.5">
                  <div className="mt-0.5">
                    <PlanEntryIcon status={entry.status} />
                  </div>
                  <span
                    className={cn(
                      'text-sm leading-snug',
                      entry.status === 'completed' && 'text-grimoire-text-muted line-through',
                      entry.status === 'in_progress' && 'text-grimoire-text',
                      entry.status === 'pending' && 'text-grimoire-text/70'
                    )}
                  >
                    {entry.content}
                  </span>
                  {dot && (
                    <span
                      className={cn('mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ml-auto', dot)}
                      title={`${entry.priority} priority`}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
