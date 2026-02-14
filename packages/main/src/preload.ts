import { contextBridge, ipcRenderer } from 'electron';
import type { InvokeChannel, InvokeMap, PushChannel, PushMap } from '@grimoire/shared';

/**
 * Typed bridge exposed to the renderer as window.grimoire.
 */
const api = {
  /** Request/response IPC calls */
  invoke<C extends InvokeChannel>(
    channel: C,
    args: InvokeMap[C]['args']
  ): Promise<InvokeMap[C]['result']> {
    return ipcRenderer.invoke(channel, args);
  },

  /** Listen for push events from main process */
  on<C extends PushChannel>(
    channel: C,
    callback: (data: PushMap[C]) => void
  ): () => void {
    const handler = (_event: Electron.IpcRendererEvent, data: PushMap[C]) => {
      callback(data);
    };
    ipcRenderer.on(channel, handler);
    // Return unsubscribe function
    return () => {
      ipcRenderer.removeListener(channel, handler);
    };
  },
};

contextBridge.exposeInMainWorld('grimoire', api);

// Type for the renderer to use
export type GrimoireAPI = typeof api;
