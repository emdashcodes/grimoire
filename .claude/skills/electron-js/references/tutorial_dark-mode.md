---
title: Dark Mode
source_url: https://www.electronjs.org/docs/latest/tutorial/dark-mode
---

# Dark Mode

## Overview

### Automatically update the native interfaces

"Native interfaces" include the file picker, window border, dialogs, context menus, and more - anything where the UI comes from your operating system and not from your app. The default behavior is to opt into this automatic theming from the OS.

### Automatically update your own interfaces

If your app has its own dark mode, you should toggle it on and off in sync with the system's dark mode setting. You can do this by using the `prefers-color-scheme` CSS media query.

### Manually update your own interfaces

If you want to manually switch between light/dark modes, you can do this by setting the desired mode in the `themeSource` property of the `nativeTheme` module. This property's value will be propagated to your Renderer process. Any CSS rules related to `prefers-color-scheme` will be updated accordingly.

## macOS settings

In macOS 10.14 Mojave, Apple introduced a new system-wide dark mode for all macOS computers. If your Electron app has a dark mode, you can make it follow the system-wide dark mode setting using the `nativeTheme` API.

In macOS 10.15 Catalina, Apple introduced a new "automatic" dark mode option for all macOS computers. In order for the `nativeTheme.shouldUseDarkColors` and `Tray` APIs to work correctly in this mode on Catalina, you need to either have `NSRequiresAquaSystemAppearance` set to `false` in your `Info.plist` file, or be on Electron `>=7.0.0`. Both Electron Packager and Electron Forge have a `darwinDarkModeSupport` option to automate the `Info.plist` changes during app build time.

If you wish to opt-out while using Electron > 8.0.0, you must set the `NSRequiresAquaSystemAppearance` key in the `Info.plist` file to `true`. Please note that Electron 8.0.0 and above will not let you opt-out of this theming, due to the use of the macOS 10.14 SDK.

## Example

This example demonstrates an Electron application that derives its theme colors from `nativeTheme`. Additionally, it provides theme toggle and reset controls using IPC channels.

### main.js

```javascript
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron/main')
const path = require('node:path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system'
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

### preload.js

```javascript
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})
```

### index.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
    <link rel="stylesheet" type="text/css" href="./styles.css">
</head>
<body>
    <h1>Hello World!</h1>
    <p>Current theme source: <strong id="theme-source">System</strong></p>
    <button id="toggle-dark-mode">Toggle Dark Mode</button>
    <button id="reset-to-system">Reset to System Theme</button>
    <script src="renderer.js"></script>
</body>
</html>
```

### renderer.js

```javascript
document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await window.darkMode.toggle()
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
  await window.darkMode.system()
  document.getElementById('theme-source').innerHTML = 'System'
})
```

### styles.css

```css
:root {
  color-scheme: light dark;
}

@media (prefers-color-scheme: dark) {
  body { background: #333; color: white; }
}

@media (prefers-color-scheme: light) {
  body { background: #ddd; color: black; }
}
```

## How It Works

Starting from the `styles.css` file: The `styles.css` file uses the `prefers-color-scheme` CSS media query to set the `body` element's background and text colors conditionally based on the current theme.

The `preload.js` file exposes `window.darkMode` to the renderer via `contextBridge`, allowing secure IPC between the processes.

The `renderer.js` file handles the UI button interaction, toggling the dark mode and resetting to system theme.

In `main.js`, the `ipcMain.handle('dark-mode:toggle')` handler controls the theme source by setting `nativeTheme.themeSource` to either `'light'` or `'dark'` based on the current state. The `'dark-mode:system'` handler resets the theme source to `'system'` to follow OS preferences.

The `nativeTheme.themeSource` property can be set to `'system'`, `'light'`, or `'dark'` and is used to override and dictate which theme is applied to native UI elements and the `prefers-color-scheme` CSS query within web contents.
