import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface Props {
  content: string;
}

export function ThinkingBlock({ content }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        'mt-1.5 rounded-lg border text-sm transition-colors',
        'border-grimoire-border/60 bg-grimoire-bg/60'
      )}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 w-full px-3 py-2 text-left cursor-pointer hover:bg-grimoire-surface-hover/50"
      >
        {/* Expand chevron */}
        <ChevronRight
          size={12}
          className={cn(
            'flex-shrink-0 text-grimoire-text-muted transition-transform duration-150',
            expanded && 'rotate-90'
          )}
        />

        {/* Title */}
        <span className="flex-1 text-grimoire-text/80">Thought process</span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-grimoire-border/40 px-3 py-2">
          <pre className="text-xs text-grimoire-text-muted whitespace-pre-wrap overflow-x-auto max-h-[300px] overflow-y-auto leading-relaxed pl-2">
            {content}
          </pre>
        </div>
      )}
    </div>
  );
}
