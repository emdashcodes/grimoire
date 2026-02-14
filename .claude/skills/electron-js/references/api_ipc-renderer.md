---
title: ipcRenderer
source_url: https://www.electronjs.org/docs/latest/api/ipc-renderer
---

# ipcRenderer

> Asynchronous communication from renderer processes to the main process.

**Process:** Renderer

The `ipcRenderer` module is an EventEmitter that provides methods for sending synchronous and asynchronous messages from a renderer process to the main process. You can also receive replies from the main process.

**Note:** With context isolation enabled, API calls should be placed in preload scripts and exposed via `contextBridge`.

**Breaking Change:** As of version 29.0.0+, `ipcRenderer` cannot be sent over the `contextBridge`.

## Methods

### `ipcRenderer.on(channel, listener)`

- `channel` string
- `listener` Function
  - `event` IpcRendererEvent
  - `...args` any[]

Listens to channel messages.

### `ipcRenderer.off(channel, listener)`

- `channel` string
- `listener` Function

Removes the specified listener from the channel.

### `ipcRenderer.once(channel, listener)`

- `channel` string
- `listener` Function
  - `event` IpcRendererEvent
  - `...args` any[]

Adds a one-time listener for the next message on the channel.

### `ipcRenderer.addListener(channel, listener)`

Alias for `ipcRenderer.on()`.

### `ipcRenderer.removeListener(channel, listener)`

Alias for `ipcRenderer.off()`.

### `ipcRenderer.removeAllListeners([channel])`

- `channel` string (optional)

Removes all listeners from the specified channel, or from all channels if none is specified.

### `ipcRenderer.send(channel, ...args)`

- `channel` string
- `...args` any[]

Sends an asynchronous message to the main process via `channel`, along with arguments. Arguments are serialized using the Structured Clone Algorithm (same as `window.postMessage`), so DOM objects and special types like Functions, Promises, Symbols, WeakMaps, and WeakSets cannot be sent.

The main process handles it by listening for `channel` with the `ipcMain` module.

### `ipcRenderer.invoke(channel, ...args)`

- `channel` string
- `...args` any[]

**Returns:** `Promise<any>` - Resolves with the response from the main process.

Sends a message to the main process via `channel` and expects a result asynchronously. The main process should listen for `channel` with `ipcMain.handle()`.

If there is no handler registered for `channel`, or the handler throws an error, the returned Promise will be rejected.

### `ipcRenderer.sendSync(channel, ...args)`

- `channel` string
- `...args` any[]

**Returns:** `any` - The value sent back by the `ipcMain` handler.

Sends a synchronous message to the main process via `channel` and expects a result synchronously. The main process handles it by listening for `channel` with `ipcMain.on()` and replying by setting `event.returnValue`.

**Warning:** Sending a synchronous message will block the entire renderer process until the reply is received. Using this method is strongly discouraged. Use the asynchronous `invoke()` instead.

### `ipcRenderer.postMessage(channel, message, [transfer])`

- `channel` string
- `message` any
- `transfer` MessagePort[] (optional)

Sends a message to the main process, optionally transferring ownership of `MessagePort` objects. The transferred ports are available in the main process as `MessagePortMain` objects by accessing the `ports` property of the emitted event.

### `ipcRenderer.sendToHost(channel, ...args)`

- `channel` string
- `...args` any[]

Like `ipcRenderer.send` but the event is sent to the `<webview>` element in the host page instead of the main process.

## Important Security Note

Avoid exposing the `event` object from IPC callbacks to untrusted content. Wrap callbacks to pass only necessary arguments, protecting against exposure of dangerous Electron APIs.
