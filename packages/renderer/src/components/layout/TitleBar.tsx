import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useStore } from '@/store';

export function TitleBar() {
  const contextPanelVisible = useStore((s) => s.contextPanelVisible);
  const toggleContextPanel = useStore((s) => s.toggleContextPanel);
  const sidebarMode = useStore((s) => s.sidebarMode);

  return (
    <div
      className={cn(
        'drag-region flex items-center h-12 px-4 border-b border-grimoire-border',
        'bg-grimoire-surface/80 backdrop-blur-sm'
      )}
    >
      {/* Traffic light spacer on macOS */}
      <div className="w-20" />

      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-sm font-semibold text-grimoire-text-muted tracking-wide">
          Grimoire
        </h1>
      </div>

      <div className="w-20 flex items-center justify-end">
        {sidebarMode === 'chat' && (
          <button
            onClick={toggleContextPanel}
            className="no-drag p-1.5 rounded hover:bg-grimoire-surface-hover transition-colors text-grimoire-text-muted hover:text-grimoire-text"
            title={contextPanelVisible ? 'Hide context panel' : 'Show context panel'}
          >
            {contextPanelVisible ? (
              <PanelRightClose size={16} />
            ) : (
              <PanelRightOpen size={16} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
