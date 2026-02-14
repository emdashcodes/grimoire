import { useState, useMemo } from 'react';
import {
  Wrench,
  Loader2,
  Check,
  X,
  ChevronRight,
  FileText,
  Terminal,
  Search,
  FolderOpen,
  Pencil,
  Eye,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { DiffViewer } from './DiffViewer';
import type { ToolCall, ContentBlock } from '@grimoire/shared';

interface Props {
  toolCall: ToolCall;
}

/** Map tool kind to a descriptive icon */
function toolIcon(kind: string) {
  switch (kind) {
    case 'bash':
    case 'terminal':
      return Terminal;
    case 'read':
    case 'read_file':
      return Eye;
    case 'write':
    case 'write_file':
    case 'edit':
    case 'edit_file':
      return Pencil;
    case 'search':
    case 'grep':
    case 'glob':
      return Search;
    case 'list_dir':
    case 'list_files':
      return FolderOpen;
    case 'file':
      return FileText;
    default:
      return Wrench;
  }
}

/** Format milliseconds as a human-readable duration */
function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  const secs = ms / 1000;
  if (secs < 60) return `${secs.toFixed(1)}s`;
  const mins = Math.floor(secs / 60);
  const remainSecs = Math.round(secs % 60);
  return `${mins}m ${remainSecs}s`;
}

/** Detect if a text block contains a unified diff */
function isDiffContent(text: string): boolean {
  return (
    text.includes('--- ') &&
    text.includes('+++ ') &&
    text.includes('@@ ')
  );
}

/** Extract text from content blocks */
function extractText(content: ContentBlock[]): string {
  return content
    .filter((c) => c.type === 'text')
    .map((c) => (c as { type: 'text'; text: string }).text)
    .join('\n');
}

export function ToolCallCard({ toolCall }: Props) {
  const [expanded, setExpanded] = useState(false);
  const isActive = toolCall.status === 'pending' || toolCall.status === 'in_progress';
  const hasContent = toolCall.content && toolCall.content.length > 0;
  const ToolIcon = toolIcon(toolCall.kind);

  const contentText = useMemo(
    () => (hasContent ? extractText(toolCall.content!) : ''),
    [hasContent, toolCall.content]
  );

  const hasDiff = useMemo(() => isDiffContent(contentText), [contentText]);
  const isTerminal = toolCall.kind === 'bash' || toolCall.kind === 'terminal';

  return (
    <div
      className={cn(
        'mt-1.5 rounded-lg border text-sm transition-colors',
        'border-grimoire-border/60 bg-grimoire-bg/60',
        isActive && 'border-grimoire-accent/25'
      )}
    >
      {/* Header — always visible */}
      <button
        onClick={() => hasContent && setExpanded(!expanded)}
        disabled={!hasContent}
        className={cn(
          'flex items-center gap-2 w-full px-3 py-2 text-left',
          hasContent && 'cursor-pointer hover:bg-grimoire-surface-hover/50',
          !hasContent && 'cursor-default'
        )}
      >
        {/* Expand chevron */}
        {hasContent ? (
          <ChevronRight
            size={12}
            className={cn(
              'flex-shrink-0 text-grimoire-text-muted transition-transform duration-150',
              expanded && 'rotate-90'
            )}
          />
        ) : (
          <span className="w-3 flex-shrink-0" />
        )}

        {/* Tool icon */}
        <ToolIcon size={13} className="flex-shrink-0 text-grimoire-text-muted" />

        {/* Title */}
        <span className="flex-1 truncate text-grimoire-text/80">{toolCall.title}</span>

        {/* Duration (shown on completed) */}
        {toolCall.status === 'completed' && toolCall.duration != null && (
          <span className="text-xs text-grimoire-text-muted tabular-nums">
            {formatDuration(toolCall.duration)}
          </span>
        )}

        {/* Status indicator */}
        {isActive && (
          <Loader2
            size={13}
            className="flex-shrink-0 animate-spin text-grimoire-accent"
          />
        )}
        {toolCall.status === 'completed' && (
          <Check size={13} className="flex-shrink-0 text-green-500/80" />
        )}
        {toolCall.status === 'cancelled' && (
          <X size={13} className="flex-shrink-0 text-red-500/80" />
        )}
      </button>

      {/* Expanded content */}
      {expanded && hasContent && (
        <div className="border-t border-grimoire-border/40 px-3 py-2">
          {hasDiff ? (
            <DiffViewer diff={contentText} />
          ) : isTerminal ? (
            <pre className="text-xs font-mono text-grimoire-text-muted whitespace-pre-wrap overflow-x-auto max-h-[300px] overflow-y-auto leading-relaxed">
              {contentText}
            </pre>
          ) : (
            <pre className="text-xs font-mono text-grimoire-text-muted whitespace-pre-wrap overflow-x-auto max-h-[300px] overflow-y-auto leading-relaxed">
              {contentText}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
