import { useState, useEffect, useCallback, useRef } from 'react';
import { Command } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { SlashCommand } from '@grimoire/shared';

interface Props {
  commands: SlashCommand[];
  filter: string;
  onSelect: (command: SlashCommand) => void;
  onClose: () => void;
  visible: boolean;
}

/**
 * Slash command palette. Triggered when the user types "/" in the input bar.
 * Shows a filtered list of available commands with keyboard navigation.
 */
export function SlashPalette({ commands, filter, onSelect, onClose, visible }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter commands by the text after "/"
  const filtered = commands.filter((cmd) => {
    const query = filter.toLowerCase();
    return (
      cmd.name.toLowerCase().includes(query) ||
      cmd.description.toLowerCase().includes(query)
    );
  });

  // Reset selection when filter changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filter]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!visible || filtered.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filtered.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
          break;
        case 'Enter':
        case 'Tab':
          e.preventDefault();
          onSelect(filtered[selectedIndex]);
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    },
    [visible, filtered, selectedIndex, onSelect, onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Scroll selected item into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const item = list.children[selectedIndex] as HTMLElement;
    if (item) {
      item.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  if (!visible || filtered.length === 0) return null;

  return (
    <div
      className={cn(
        'absolute bottom-full left-0 right-0 mb-1 z-50',
        'max-w-3xl mx-auto'
      )}
    >
      <div
        ref={listRef}
        className={cn(
          'rounded-lg border border-grimoire-border bg-grimoire-surface',
          'shadow-lg shadow-black/20',
          'max-h-[240px] overflow-y-auto py-1'
        )}
      >
        {filtered.map((cmd, i) => (
          <button
            key={cmd.name}
            onClick={() => onSelect(cmd)}
            onMouseEnter={() => setSelectedIndex(i)}
            className={cn(
              'w-full text-left px-3 py-2 flex items-start gap-3 transition-colors',
              i === selectedIndex
                ? 'bg-grimoire-surface-hover'
                : 'hover:bg-grimoire-surface-hover/50'
            )}
          >
            <div className="flex-shrink-0 mt-0.5">
              <Command size={14} className="text-grimoire-accent" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-grimoire-text">
                  /{cmd.name}
                </span>
                {cmd.input?.hint && (
                  <span className="text-xs text-grimoire-text-muted">
                    {cmd.input.hint}
                  </span>
                )}
              </div>
              <p className="text-xs text-grimoire-text-muted mt-0.5 line-clamp-1">
                {cmd.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
