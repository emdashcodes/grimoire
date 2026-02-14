import type { StateCreator } from 'zustand';

export type SidebarMode = 'chat' | 'vault' | 'tasks' | 'calendar';

export interface UiSlice {
  sidebarMode: SidebarMode;
  sidebarCollapsed: boolean;
  contextPanelVisible: boolean;

  setSidebarMode: (mode: SidebarMode) => void;
  toggleSidebar: () => void;
  toggleContextPanel: () => void;
}

export const createUiSlice: StateCreator<UiSlice> = (set) => ({
  sidebarMode: 'chat',
  sidebarCollapsed: false,
  contextPanelVisible: false,

  setSidebarMode: (mode) => set({ sidebarMode: mode }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  toggleContextPanel: () =>
    set((s) => ({ contextPanelVisible: !s.contextPanelVisible })),
});
