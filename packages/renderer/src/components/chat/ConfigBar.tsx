import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/cn';
import type { ConfigOption } from '@grimoire/shared';

interface Props {
  configOptions: ConfigOption[];
  onSetConfig: (configId: string, value: string) => void;
}

/** A single config option selector dropdown */
function ConfigSelector({
  option,
  onSelect,
}: {
  option: ConfigOption;
  onSelect: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const currentLabel =
    option.options.find((o) => o.value === option.currentValue)?.name ??
    option.currentValue;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs',
          'text-grimoire-text-muted hover:text-grimoire-text',
          'hover:bg-grimoire-surface-hover transition-colors',
          open && 'bg-grimoire-surface-hover text-grimoire-text'
        )}
      >
        <span className="text-grimoire-text-muted/60 font-medium">{option.name}</span>
        <span className="text-grimoire-text">{currentLabel}</span>
        <ChevronDown size={12} className={cn('transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div
          className={cn(
            'absolute bottom-full left-0 mb-1 z-50',
            'min-w-[180px] py-1 rounded-lg',
            'bg-grimoire-surface border border-grimoire-border',
            'shadow-lg shadow-black/20'
          )}
        >
          {option.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onSelect(opt.value);
                setOpen(false);
              }}
              className={cn(
                'w-full text-left px-3 py-1.5 text-xs transition-colors',
                'hover:bg-grimoire-surface-hover',
                opt.value === option.currentValue
                  ? 'text-grimoire-accent'
                  : 'text-grimoire-text'
              )}
            >
              <div className="font-medium">{opt.name}</div>
              {opt.description && (
                <div className="text-grimoire-text-muted mt-0.5 text-[11px]">
                  {opt.description}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Horizontal config bar above the input area showing current session config options.
 * Populated from ACP config_options_update notifications.
 */
export function ConfigBar({ configOptions, onSetConfig }: Props) {
  if (configOptions.length === 0) return null;

  return (
    <div className="flex items-center gap-1 px-3 py-1 border-t border-grimoire-border/50">
      <div className="flex items-center gap-0.5 max-w-3xl mx-auto w-full">
        {configOptions.map((option) => (
          <ConfigSelector
            key={option.id}
            option={option}
            onSelect={(value) => onSetConfig(option.id, value)}
          />
        ))}
      </div>
    </div>
  );
}
