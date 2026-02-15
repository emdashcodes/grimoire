import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface Props {
  content: string;
}

export function ThinkingBlock({ content }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-1.5 mb-2 rounded-lg border border-grimoire-border/60 bg-grimoire-bg/60 text-sm">
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
        <div className="border-t border-grimoire-border/40 px-3 py-2 pl-7">
          <div className="text-xs text-grimoire-text-muted whitespace-pre-wrap leading-relaxed">
            {content}
          </div>
        </div>
      )}
    </div>
  );
}
