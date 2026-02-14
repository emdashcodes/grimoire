---
title: Context Isolation
source_url: https://www.electronjs.org/docs/latest/tutorial/context-isolation
---

# Context Isolation

## Overview

Context Isolation is a security feature that separates the execution context of preload scripts and Electron's internal logic from the website loaded in a `webContents`. This prevents websites from accessing Electron internals or powerful APIs exposed through preload scripts.

The `window` object that your preload script has access to is actually a different object than the website would have access to. This feature has been enabled by default since Electron 12.

## Migration from Disabled to Enabled Context Isolation

### Previous Approach (Disabled)

When context isolation was disabled, developers would directly attach APIs to the global `window` object in preload scripts:

```javascript
// preload.js
window.myAPI = {
  doAThing: () => {}
}
```

### Current Approach (Enabled)

With context isolation enabled, use the `contextBridge` module to safely expose APIs:

```javascript
// preload.js
const { contextBridge } = require('electron')
contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})
```

The exposed API remains accessible as `window.myAPI` in the renderer process, maintaining backward compatibility.

## Security Best Practices

Avoid exposing powerful APIs directly without filtering. Instead of exposing `ipcRenderer.send` directly, create specific methods for each IPC message:

```javascript
// Recommended approach
contextBridge.exposeInMainWorld('myAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

## TypeScript Support

For TypeScript projects, create a declaration file to add proper typing:

```typescript
// interface.d.ts
export interface IElectronAPI {
  loadPreferences: () => Promise<void>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
```

This ensures type safety when accessing exposed APIs in renderer scripts.
