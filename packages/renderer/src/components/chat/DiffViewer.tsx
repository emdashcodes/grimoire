import { useMemo } from 'react';
import { cn } from '@/lib/cn';

interface Props {
  diff: string;
}

interface DiffLine {
  type: 'add' | 'remove' | 'context' | 'header';
  content: string;
}

/** Parse a unified diff into annotated lines */
function parseDiff(raw: string): DiffLine[] {
  const lines = raw.split('\n');
  const result: DiffLine[] = [];

  for (const line of lines) {
    if (line.startsWith('@@')) {
      result.push({ type: 'header', content: line });
    } else if (line.startsWith('+') && !line.startsWith('+++')) {
      result.push({ type: 'add', content: line.slice(1) });
    } else if (line.startsWith('-') && !line.startsWith('---')) {
      result.push({ type: 'remove', content: line.slice(1) });
    } else if (line.startsWith('---') || line.startsWith('+++')) {
      // Skip file headers — the tool call title already names the file
      continue;
    } else {
      // Context line (may start with a space)
      result.push({ type: 'context', content: line.startsWith(' ') ? line.slice(1) : line });
    }
  }

  return result;
}

export function DiffViewer({ diff }: Props) {
  const lines = useMemo(() => parseDiff(diff), [diff]);

  return (
    <div className="overflow-x-auto rounded text-xs font-mono leading-[1.6]">
      {lines.map((line, i) => (
        <div
          key={i}
          className={cn(
            'px-2 whitespace-pre',
            line.type === 'add' && 'bg-green-500/10 text-green-400',
            line.type === 'remove' && 'bg-red-500/10 text-red-400',
            line.type === 'header' && 'text-grimoire-accent/60 mt-1',
            line.type === 'context' && 'text-grimoire-text-muted'
          )}
        >
          {line.type === 'add' && (
            <span className="select-none text-green-500/50 mr-2">+</span>
          )}
          {line.type === 'remove' && (
            <span className="select-none text-red-500/50 mr-2">-</span>
          )}
          {line.type === 'context' && (
            <span className="select-none text-grimoire-text-muted/30 mr-2">&nbsp;</span>
          )}
          {line.content}
        </div>
      ))}
    </div>
  );
}
