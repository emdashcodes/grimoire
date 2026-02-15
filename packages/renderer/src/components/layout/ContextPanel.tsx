import { useState } from 'react';
import { ChevronDown, Circle, CircleDot, CircleCheck, FolderOpen, Info } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useStore } from '@/store';
import type { PlanEntry } from '@grimoire/shared';

/** Extract a short working directory label */
function cwdLabel(cwd: string): string {
  // Detect home directory pattern (/Users/x or /home/x)
  const homeMatch = cwd.match(/^\/(?:Users|home)\/[^/]+$/);
  if (homeMatch) return '~';
  // For project directories, show the last path segment
  const parts = cwd.split('/');
  return parts[parts.length - 1] || cwd;
}

function PlanEntryIcon({ status }: { status: PlanEntry['status'] }) {
  switch (status) {
    case 'completed':
      return <CircleCheck size={12} className="text-green-500/80 flex-shrink-0" />;
    case 'in_progress':
      return <CircleDot size={12} className="text-grimoire-accent flex-shrink-0 animate-pulse" />;
    case 'pending':
    default:
      return <Circle size={12} className="text-grimoire-text-muted/40 flex-shrink-0" />;
  }
}

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

function Section({ title, icon, children, defaultCollapsed = false }: SectionProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <div className="border-b border-grimoire-border/40 last:border-b-0">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-grimoire-surface-hover transition-colors"
      >
        {icon}
        <span className="text-xs font-medium text-grimoire-text-muted uppercase tracking-wide">
          {title}
        </span>
        <ChevronDown
          size={12}
          className={cn(
            'ml-auto text-grimoire-text-muted/50 transition-transform duration-150',
            collapsed && '-rotate-90'
          )}
        />
      </button>
      {!collapsed && <div className="px-3 pb-3">{children}</div>}
    </div>
  );
}

export function ContextPanel() {
  const { currentSession, currentPlan, configOptions } = useStore();

  if (!currentSession) return null;

  // Extract model and mode from config options
  const modelOption = configOptions.find((opt) => opt.category === 'model');
  const modeOption = configOptions.find((opt) => opt.category === 'mode');
  const currentModel = modelOption?.currentValue
    ? modelOption.options.find((o) => o.value === modelOption.currentValue)?.name
    : null;
  const currentMode = modeOption?.currentValue
    ? modeOption.options.find((o) => o.value === modeOption.currentValue)?.name
    : null;

  const completedCount = currentPlan.filter((e) => e.status === 'completed').length;
  const totalCount = currentPlan.length;

  return (
    <aside className="w-[280px] flex flex-col border-l border-grimoire-border bg-grimoire-surface/50">
      {/* Progress Section */}
      <Section
        title="Progress"
        icon={<CircleDot size={14} className="text-grimoire-text-muted" />}
      >
        {currentPlan.length === 0 ? (
          <p className="text-xs text-grimoire-text-muted/60">No active plan</p>
        ) : (
          <div className="space-y-2">
            {/* Visual progress indicator */}
            <div className="flex items-center gap-1.5">
              {currentPlan.slice(0, 8).map((entry, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all',
                    entry.status === 'completed' && 'bg-green-500/80',
                    entry.status === 'in_progress' && 'bg-grimoire-accent animate-pulse',
                    entry.status === 'pending' && 'bg-grimoire-text-muted/30'
                  )}
                />
              ))}
              {currentPlan.length > 8 && (
                <span className="text-[10px] text-grimoire-text-muted/60 ml-1">
                  +{currentPlan.length - 8}
                </span>
              )}
            </div>

            {/* Progress text */}
            <p className="text-xs text-grimoire-text-muted tabular-nums">
              {completedCount} of {totalCount} complete
            </p>

            {/* Plan entries list */}
            <ul className="space-y-1.5 mt-2">
              {currentPlan.map((entry, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <PlanEntryIcon status={entry.status} />
                  </div>
                  <span
                    className={cn(
                      'text-xs leading-snug',
                      entry.status === 'completed' && 'text-grimoire-text-muted/60 line-through',
                      entry.status === 'in_progress' && 'text-grimoire-text',
                      entry.status === 'pending' && 'text-grimoire-text-muted'
                    )}
                  >
                    {entry.content}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {/* Working Folder Section */}
      <Section
        title="Working folder"
        icon={<FolderOpen size={14} className="text-grimoire-text-muted" />}
      >
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-grimoire-text">
              {cwdLabel(currentSession.cwd)}
            </span>
          </div>
          <p className="text-xs text-grimoire-text-muted/60 break-all font-mono">
            {currentSession.cwd}
          </p>
        </div>
      </Section>

      {/* Context Section */}
      <Section
        title="Context"
        icon={<Info size={14} className="text-grimoire-text-muted" />}
      >
        <div className="space-y-2">
          {currentSession.title && (
            <div>
              <p className="text-[10px] text-grimoire-text-muted/60 uppercase tracking-wide mb-0.5">
                Session
              </p>
              <p className="text-xs text-grimoire-text">{currentSession.title}</p>
            </div>
          )}

          {currentModel && (
            <div>
              <p className="text-[10px] text-grimoire-text-muted/60 uppercase tracking-wide mb-0.5">
                Model
              </p>
              <p className="text-xs text-grimoire-text">{currentModel}</p>
            </div>
          )}

          {currentMode && (
            <div>
              <p className="text-[10px] text-grimoire-text-muted/60 uppercase tracking-wide mb-0.5">
                Mode
              </p>
              <p className="text-xs text-grimoire-text">{currentMode}</p>
            </div>
          )}

          {!currentModel && !currentMode && !currentSession.title && (
            <p className="text-xs text-grimoire-text-muted/60">No context available</p>
          )}
        </div>
      </Section>
    </aside>
  );
}
