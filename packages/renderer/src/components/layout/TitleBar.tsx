import { cn } from '@/lib/cn';

export function TitleBar() {
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

      <div className="w-20" />
    </div>
  );
}
