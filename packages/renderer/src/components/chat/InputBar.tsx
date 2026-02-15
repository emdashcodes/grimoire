import { useState, useRef, useCallback, useMemo } from 'react';
import { Send, Square, Folder, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { SlashPalette } from './SlashPalette';
import type { SlashCommand } from '@grimoire/shared';

interface Props {
  onSend: (text: string) => Promise<boolean>;
  onCancel: () => void;
  isStreaming: boolean;
  disabled: boolean;
  slashCommands: SlashCommand[];
  workingFolder: string | null;
  onFolderSelect: (path: string | null) => void;
}

export function InputBar({ onSend, onCancel, isStreaming, disabled, slashCommands, workingFolder, onFolderSelect }: Props) {
  const [text, setText] = useState('');
  const [showSlashPalette, setShowSlashPalette] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Determine if the input is a slash command prefix (starts with "/" and is on a single line)
  const slashFilter = useMemo(() => {
    if (!text.startsWith('/') || text.includes('\n')) return null;
    return text.slice(1); // text after the "/"
  }, [text]);

  const slashPaletteVisible = showSlashPalette && slashFilter !== null && slashCommands.length > 0;

  const handleSubmit = useCallback(async () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    const sent = await onSend(trimmed);
    if (sent) {
      setText('');
      setShowSlashPalette(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  }, [text, disabled, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Let slash palette handle navigation keys when visible
    if (slashPaletteVisible && ['ArrowDown', 'ArrowUp', 'Tab'].includes(e.key)) {
      return; // The SlashPalette handles these via document-level listeners
    }

    if (e.key === 'Escape' && slashPaletteVisible) {
      return; // SlashPalette handles Escape
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      if (slashPaletteVisible) {
        return; // SlashPalette handles Enter for selection
      }
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);

    // Show slash palette when typing "/" at start of empty input
    if (val.startsWith('/') && !val.includes('\n')) {
      setShowSlashPalette(true);
    } else {
      setShowSlashPalette(false);
    }
  };

  const handleSlashSelect = useCallback(
    (cmd: SlashCommand) => {
      // Replace text with the command, adding a space for the input
      const commandText = `/${cmd.name} `;
      setText(commandText);
      setShowSlashPalette(false);
      textareaRef.current?.focus();
    },
    []
  );

  const handleSlashClose = useCallback(() => {
    setShowSlashPalette(false);
  }, []);

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 200) + 'px';
  };

  const handleFolderClick = useCallback(async () => {
    const path = await window.grimoire.invoke('dialog:open-folder');
    if (path) {
      onFolderSelect(path);
    }
  }, [onFolderSelect]);

  const handleClearFolder = useCallback(() => {
    onFolderSelect(null);
  }, [onFolderSelect]);

  const getFolderName = (path: string) => {
    const segments = path.split('/');
    return segments[segments.length - 1] || path;
  };

  return (
    <div className="border-t border-grimoire-border bg-grimoire-surface/80 backdrop-blur-sm p-3">
      <div className="relative max-w-3xl mx-auto">
        {/* Folder selector */}
        {workingFolder ? (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-grimoire-surface border border-grimoire-border">
              <Folder size={12} className="text-grimoire-text-muted" />
              <span className="text-grimoire-text">{getFolderName(workingFolder)}</span>
              <button
                onClick={handleClearFolder}
                className="ml-1 text-grimoire-text-muted hover:text-grimoire-text transition-colors"
                title="Clear folder"
              >
                <X size={12} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={handleFolderClick}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs',
                'text-grimoire-text-muted hover:text-grimoire-text',
                'hover:bg-grimoire-surface transition-colors',
              )}
            >
              <Folder size={12} />
              <span>Work in a folder</span>
            </button>
          </div>
        )}

      <div className="relative flex items-end gap-2">
        {/* Slash command palette */}
        <SlashPalette
          commands={slashCommands}
          filter={slashFilter ?? ''}
          onSelect={handleSlashSelect}
          onClose={handleSlashClose}
          visible={slashPaletteVisible}
        />

        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder={disabled ? 'Connect to an agent to start...' : 'Send a message... (/ for commands)'}
          disabled={disabled}
          rows={1}
          className={cn(
            'flex-1 resize-none rounded-xl px-4 py-2.5 text-sm',
            'bg-grimoire-bg border border-grimoire-border',
            'text-grimoire-text placeholder:text-grimoire-text-muted',
            'focus:outline-none focus:border-grimoire-accent/50',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-colors'
          )}
        />

        {isStreaming ? (
          <button
            onClick={onCancel}
            className="flex-shrink-0 p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
            title="Cancel"
          >
            <Square size={18} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || disabled}
            className={cn(
              'flex-shrink-0 p-2.5 rounded-xl transition-colors',
              text.trim() && !disabled
                ? 'bg-grimoire-accent text-white hover:bg-grimoire-accent-hover'
                : 'bg-grimoire-surface text-grimoire-text-muted cursor-not-allowed'
            )}
            title="Send"
          >
            <Send size={18} />
          </button>
        )}
      </div>
      </div>
    </div>
  );
}
