---
title: Opening windows from the renderer
source_url: https://www.electronjs.org/docs/latest/api/window-open
---

# Opening windows from the renderer

There are several ways to control how windows are created from trusted or untrusted content within a renderer. Windows can be created from the renderer in two ways:

- clicking on links or submitting forms decorated with `target=_blank`
- JavaScript calling `window.open()`

For same-origin content, the new window is created within the same process, enabling the parent to access the child window directly. This can be very useful for app sub-windows that act as preference panels, or similar, as the parent can render to the sub-window directly, as if it were a `div` in the parent.

When `nativeWindowOpen` is set to true, or when it is created from untrusted content, a `BrowserWindow` is created for the child window.

## BrowserWindow Integration

Electron pairs each native Chrome `Window` with a `BrowserWindow`. Use `webContents.setWindowOpenHandler()` to customize the `BrowserWindow` created for windows opened by the renderer.

`BrowserWindow` constructor options are set by, in increasing precedence order:

1. Parsed options from the `features` string from `window.open()`
2. Security-related `webPreferences` inherited from the parent
3. Options given by `webContents.setWindowOpenHandler()`

Unrecognized options set via the features string are not filtered out.

## `window.open(url[, frameName][, features])`

- `url` string
- `frameName` string (optional)
- `features` string (optional)

Returns `Window | null`

`features` is a comma-delimited list of key-value pairs, following the standard format of the browser's `window.open()`. Electron will parse the following WebPreferences from the features string:

- `zoomFactor`
- `nodeIntegration`
- `javascript`
- `contextIsolation`
- `webviewTag`

## Security Notes

- Node integration will always be disabled in the opened `window` if it is disabled on the parent window.
- Context isolation will always be enabled in the opened `window` if it is enabled on the parent window.
- JavaScript will always be disabled in the opened `window` if it is disabled on the parent window.
- Non-standard features (that are not handled by Chromium or Electron) given in `features` will be passed to any registered `webContents` `did-create-window` event handler in the `options` argument.

## `webContents.setWindowOpenHandler(handler)`

Main process handlers can return the following:

- `{ action: 'deny' }` -- Blocks window creation.
- `{ action: 'allow', overrideBrowserWindowOptions: {...} }` -- Allows creation with custom BrowserWindow options.
- `{ action: 'allow', outlivesOpener: true, ... }` -- The new window will not close when the opener window closes.

## Customization and `did-create-window` Event

The `did-create-window` event gives the opportunity to access the child `BrowserWindow` from the main process. This event can be used to configure the window, set up event listeners, etc.

```javascript
// main process
const { BrowserWindow } = require('electron')

const mainWindow = new BrowserWindow()

mainWindow.webContents.setWindowOpenHandler(({ url }) => {
  if (url.startsWith('https://github.com/')) {
    return { action: 'allow' }
  }
  return { action: 'deny' }
})

mainWindow.webContents.on('did-create-window', (childWindow) => {
  // For example...
  childWindow.webContents.on('will-navigate', (e) => {
    e.preventDefault()
  })
})
```

## Native `Window` Example

```javascript
// renderer process
const windowProxy = window.open('https://github.com/', null, 'minimizable=false')
windowProxy.postMessage('hi', '*')
```
