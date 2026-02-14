import { create } from 'zustand';
import { createAgentSlice, type AgentSlice } from './agent-slice';
import { createUiSlice, type UiSlice } from './ui-slice';

export type AppStore = AgentSlice & UiSlice;

export const useStore = create<AppStore>()((...args) => ({
  ...createAgentSlice(...args),
  ...createUiSlice(...args),
}));

// Expose store to window for dev/testing (always expose for now to enable CI testing)
(window as any).__GRIMOIRE_STORE__ = useStore;
