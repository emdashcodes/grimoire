import { TitleBar } from '@/components/layout/TitleBar';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBar } from '@/components/layout/StatusBar';
import { ChatView } from '@/views/ChatView';
import { useAgentListeners } from '@/hooks/useAgentListeners';
import { useStore } from '@/store';
import type { SidebarMode } from '@/store/ui-slice';
import { FolderOpen, CheckSquare, Calendar } from 'lucide-react';

function PlaceholderView({ mode }: { mode: SidebarMode }) {
  const icons = { vault: FolderOpen, tasks: CheckSquare, calendar: Calendar };
  const labels = { vault: 'Vault', tasks: 'Tasks', calendar: 'Calendar' };
  const Icon = icons[mode as keyof typeof icons];
  const label = labels[mode as keyof typeof labels];
  return (
    <div className="flex-1 flex items-center justify-center text-grimoire-text-muted">
      <div className="text-center">
        <Icon size={48} className="mx-auto mb-4 opacity-30" />
        <p className="text-lg font-medium">{label}</p>
        <p className="text-sm mt-1">Coming soon</p>
      </div>
    </div>
  );
}

export function App() {
  // Register IPC listeners once at the app level
  useAgentListeners();
  const sidebarMode = useStore((s) => s.sidebarMode);

  return (
    <div className="flex flex-col h-screen">
      <TitleBar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        {sidebarMode === 'chat' ? (
          <ChatView />
        ) : (
          <PlaceholderView mode={sidebarMode} />
        )}
      </div>

      <StatusBar />
    </div>
  );
}
