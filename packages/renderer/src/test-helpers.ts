/**
 * Test helpers for CI testing.
 * Only available when window.__TEST__ is true.
 */

import { useStore } from './store';
import type { SessionUpdate } from '@grimoire/shared';

export function setupTestHelpers() {
  if (typeof window === 'undefined') return;

  // Always enable test helpers (can be gated by env var later if needed)
  // This allows CI testing via Playwright CDP

  (window as any).__injectMessage = (update: SessionUpdate) => {
    const store = useStore.getState();
    store.handleSessionUpdate(update);
  };

  (window as any).__injectAgentMessage = (text: string) => {
    const store = useStore.getState();
    store.handleSessionUpdate({
      sessionUpdate: 'agent_message_chunk',
      content: { type: 'text', text },
    });
  };

  (window as any).__injectUserMessage = (text: string) => {
    const store = useStore.getState();
    store.handleSessionUpdate({
      sessionUpdate: 'user_message_chunk',
      content: { type: 'text', text },
    });
  };

  console.log('[Grimoire Test Helpers] Test helpers loaded. Available functions: __injectMessage, __injectAgentMessage, __injectUserMessage');
}
