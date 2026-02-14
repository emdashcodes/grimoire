/// <reference types="vite/client" />

import type { GrimoireAPI } from '@grimoire/main/src/preload';

declare global {
  interface Window {
    grimoire: GrimoireAPI;
  }
}
