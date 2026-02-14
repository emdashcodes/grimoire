---
title: Inter-Process Communication
source_url: https://www.electronjs.org/docs/latest/tutorial/ipc
---

# Inter-Process Communication

## Overview

Inter-process communication (IPC) enables communication between Electron's main and renderer processes. The `ipcMain` and `ipcRenderer` modules facilitate message passing through developer-defined channels that are arbitrary (customizable names) and bidirectional.

## IPC Channels

Processes communicate by passing messages through channels using `ipcMain` and `ipcRenderer` modules. Channel names are arbitrary and can be used bidirectionally.

## Pattern 1: Renderer to Main (One-Way)

Use `ipcRenderer.send()` paired with `ipcMain.on()` for one-way messaging from renderer to main process.

### Implementation Steps:

**1. Listen with ipcMain.on**

```javascript
const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

function handleSetTitle (event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}

app.whenReady().then(() => {
  ipcMain.on('set-title', handleSetTitle)
  createWindow()
})
```

**2. Expose via contextBridge in preload**

```javascript
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title)
})
```

**3. Call from renderer UI**

```javascript
const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')

setButton.addEventListener('click', () => {
  const title = titleInput.value
  window.electronAPI.setTitle(title)
})
```

## Pattern 2: Renderer to Main (Two-Way)

Use `ipcRenderer.invoke()` with `ipcMain.handle()` for asynchronous request-response communication.

### Implementation:

**Main Process Handler**

```javascript
const { dialog, ipcMain } = require('electron/main')

async function handleFileOpen () {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (!canceled) {
    return filePaths[0]
  }
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:openFile', handleFileOpen)
})
```

**Preload Exposure**

```javascript
contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})
```

**Renderer Implementation**

```javascript
const btn = document.getElementById('btn')

btn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile()
  document.getElementById('filePath').innerText = filePath
})
```

## Pattern 3: Main to Renderer

Send messages from main process using `webContents.send()`.

**Main Process**

```javascript
const menu = Menu.buildFromTemplate([
  {
    label: app.name,
    submenu: [
      {
        click: () => mainWindow.webContents.send('update-counter', 1),
        label: 'Increment'
      }
    ]
  }
])
```

**Preload Listener**

```javascript
contextBridge.exposeInMainWorld('electronAPI', {
  onUpdateCounter: (callback) =>
    ipcRenderer.on('update-counter', (_event, value) => callback(value))
})
```

**Renderer Handler**

```javascript
window.electronAPI.onUpdateCounter((value) => {
  const oldValue = Number(counter.innerText)
  counter.innerText = (oldValue + value).toString()
})
```

## Pattern 4: Renderer to Renderer

No direct method exists. Use either:
- Main process as message broker
- MessagePort for direct renderer communication

## Object Serialization

Electron uses the HTML Structured Clone Algorithm for IPC serialization. Only certain types serialize properly. DOM objects (Element, Location), Node.js objects (process.env), and Electron objects (WebContents, BrowserWindow) are not serializable.

## Security Considerations

Avoid exposing entire `ipcRenderer` or `ipcMain` APIs through contextBridge. Instead, create specific wrapper functions that expose only necessary functionality to limit renderer process access to Electron APIs.
