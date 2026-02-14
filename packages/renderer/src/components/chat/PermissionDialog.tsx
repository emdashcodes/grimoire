import { useEffect, useCallback, useMemo } from 'react';
import { ShieldAlert, Terminal, FileText, Wrench } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { PermissionRequest, PermissionOption } from '@grimoire/shared';

interface Props {
  request: PermissionRequest;
  onRespond: (requestId: string, optionId: string) => void;
  onCancel: (requestId: string) => void;
}

function kindIcon(kind?: string) {
  switch (kind) {
    case 'bash':
    case 'terminal':
      return Terminal;
    case 'read':
    case 'write':
    case 'edit':
    case 'file':
      return FileText;
    default:
      return Wrench;
  }
}

export function PermissionDialog({ request, onRespond, onCancel }: Props) {
  const KindIcon = kindIcon(request.toolCall.kind);

  // Find primary allow and deny options
  const allowOption = useMemo(
    () => request.options.find((o) => o.kind === 'allow_once') ?? request.options.find((o) => o.kind === 'allow_always'),
    [request.options]
  );
  const denyOption = useMemo(
    () => request.options.find((o) => o.kind === 'reject_once') ?? request.options.find((o) => o.kind === 'reject_always'),
    [request.options]
  );

  const handleAllow = useCallback(() => {
    if (allowOption) onRespond(request.requestId, allowOption.optionId);
  }, [onRespond, request.requestId, allowOption]);

  const handleDeny = useCallback(() => {
    if (denyOption) {
      onRespond(request.requestId, denyOption.optionId);
    } else {
      onCancel(request.requestId);
    }
  }, [onRespond, onCancel, request.requestId, denyOption]);

  // Keyboard shortcuts: Enter to allow, Escape to deny
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAllow();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleDeny();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleAllow, handleDeny]);

  const title = request.toolCall.title || request.toolCall.kind || 'Unknown tool';

  return (
    /* Backdrop */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Dialog */}
      <div
        className={cn(
          'w-full max-w-md mx-4 rounded-xl border',
          'bg-grimoire-bg border-grimoire-border shadow-2xl shadow-black/50'
        )}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="perm-title"
        aria-describedby="perm-desc"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-3">
          <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
            <ShieldAlert size={18} className="text-yellow-500" />
          </div>
          <div>
            <h2 id="perm-title" className="text-sm font-semibold text-grimoire-text">
              Permission Required
            </h2>
            <p className="text-xs text-grimoire-text-muted mt-0.5">
              The agent wants to perform an action
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 pb-4">
          <div className="rounded-lg border border-grimoire-border/60 bg-grimoire-surface/40 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <KindIcon size={13} className="text-grimoire-text-muted" />
              <span id="perm-desc" className="text-sm font-medium text-grimoire-text">
                {title}
              </span>
            </div>
          </div>
        </div>

        {/* Option buttons */}
        <div className="px-5 pb-5">
          {/* Primary actions row */}
          <div className="flex items-center justify-end gap-2">
            {denyOption && (
              <button
                onClick={handleDeny}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  'border border-grimoire-border text-grimoire-text-muted',
                  'hover:bg-grimoire-surface-hover hover:text-grimoire-text'
                )}
              >
                {denyOption.name}
                <kbd className="ml-2 text-[10px] text-grimoire-text-muted/50 font-mono">esc</kbd>
              </button>
            )}
            {allowOption && (
              <button
                onClick={handleAllow}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  'bg-grimoire-accent text-white',
                  'hover:bg-grimoire-accent-hover'
                )}
              >
                {allowOption.name}
                <kbd className="ml-2 text-[10px] text-white/50 font-mono">&#x23CE;</kbd>
              </button>
            )}
          </div>

          {/* Secondary options (allow_always, reject_always) if present */}
          {request.options.length > 2 && (
            <div className="flex items-center justify-end gap-2 mt-2">
              {request.options
                .filter((o) => o !== allowOption && o !== denyOption)
                .map((opt) => (
                  <button
                    key={opt.optionId}
                    onClick={() => onRespond(request.requestId, opt.optionId)}
                    className="text-xs text-grimoire-text-muted hover:text-grimoire-text transition-colors"
                  >
                    {opt.name}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
