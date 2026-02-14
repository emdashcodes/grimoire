---
title: ipcMain
source_url: https://www.electronjs.org/docs/latest/api/ipc-main
---

# ipcMain

> Asynchronous communication from the main process to renderer processes.

**Process:** Main

The `ipcMain` module is an Event Emitter that handles asynchronous and synchronous messages from renderer processes. Messages from renderers are emitted to this module. For examples, see the IPC tutorial.

## Sending Messages

Messages can be sent from main to renderer via `webContents.send()`. When sending:
- The event name is the `channel`
- For synchronous replies, set `event.returnValue`
- For asynchronous replies, use `event.reply()` (handles frames including iframes) or `event.sender.send()` (main frame only)

## Methods

### `ipcMain.on(channel, listener)`

- `channel` string
- `listener` Function
  - `event` IpcMainEvent
  - `...args` any[]

Listens to channel and calls listener when messages arrive.

### `ipcMain.off(channel, listener)`

- `channel` string
- `listener` Function

Removes the specified listener from the channel.

### `ipcMain.once(channel, listener)`

- `channel` string
- `listener` Function
  - `event` IpcMainEvent
  - `...args` any[]

Adds a one-time listener that fires only on the next message, then removes itself.

### `ipcMain.addListener(channel, listener)`

Alias for `ipcMain.on()`.

### `ipcMain.removeListener(channel, listener)`

Alias for `ipcMain.off()`.

### `ipcMain.removeAllListeners([channel])`

- `channel` string (optional)

Removes all listeners from specified channel, or all channels if none specified.

### `ipcMain.handle(channel, listener)`

- `channel` string
- `listener` Function
  - `event` IpcMainInvokeEvent
  - `...args` any[]

**Returns:** `Promise<any>` or `any`

Registers a handler for `ipcRenderer.invoke()` calls. Returns Promise results to the caller. Errors are serialized; only the `message` property reaches the renderer.

If a listener is already registered for `channel`, an error will be thrown. Use `removeHandler` to remove a handler before registering a new one.

### `ipcMain.handleOnce(channel, listener)`

- `channel` string
- `listener` Function
  - `event` IpcMainInvokeEvent
  - `...args` any[]

Handles a single invoke message, then removes the listener.

### `ipcMain.removeHandler(channel)`

- `channel` string

Removes any handler for the specified channel.
