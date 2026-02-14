---
title: Using Preload Scripts
source_url: https://www.electronjs.org/docs/latest/tutorial/tutorial-preload
---

# Using Preload Scripts

## Learning Goals

In this part of the tutorial, you will learn what a preload script is and how to use one to securely expose privileged APIs into the renderer process. You will also learn how to communicate between main and renderer processes with Electron's inter-process communication (IPC) modules.

## What is a Preload Script?

Electron's main process is a Node.js environment that has full operating system access. On top of Electron modules, you can also access Node.js built-ins, as well as any packages installed via npm. On the other hand, renderer processes run web pages and do not run Node.js by default for security reasons.

To bridge Electron's different process types together, we will need to use a special script called a **preload**.

## Augmenting the Renderer with a Preload

A BrowserWindow's preload script runs in a context that has access to both the HTML DOM and a limited subset of Node.js and Electron APIs.

### Preload Script Sandboxing

From Electron 20 onwards, preload scripts are **sandboxed** by default and no longer have access to a full Node.js environment. Practically, this means that you have a polyfilled `require` function that only has access to a limited set of APIs.

| Available API               | Details                                                |
|-----------------------------|--------------------------------------------------------|
| Electron modules            | Renderer process modules                               |
| Node.js modules             | `events`, `timers`, `url`                              |
| Polyfilled globals          | `Buffer`, `process`, `clearImmediate`, `setImmediate` |

For more information, check the Process Sandboxing guide.

### Exposing APIs with contextBridge

Since the preload script shares a global `Window` interface with the renderers, and can access Node.js APIs, its purpose is to expose selected APIs and behaviors for the renderer to use through Electron's `contextBridge` module.

**preload.js:**

```javascript
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
})
```

### Attaching the Preload to the BrowserWindow

To attach this script to your renderer process, pass its path to the `webPreferences.preload` option in the BrowserWindow constructor:

**main.js:**

```javascript
const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})
```

**Important:** At this point, the renderer has access to the `versions` global, so display that information in the window.

**index.html:**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <title>Hello from Electron renderer!</title>
  </head>
  <body>
    <h1>Hello from Electron renderer!</h1>
    <p>👋</p>
    <p id="info"></p>
    <script src="./renderer.js"></script>
  </body>
</html>
```

**renderer.js:**

```javascript
const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`
```

## Communicating Between Processes

As mentioned above, Electron's main and renderer processes have distinct responsibilities and are not interchangeable. This means it is not possible to access the Node.js APIs directly from the renderer process, nor the HTML DOM from the main process.

The solution for this problem is to use Electron's `ipcMain` and `ipcRenderer` modules for inter-process communication (IPC).

To send a message from your web page to the main process, you can set up a main process handler with `ipcMain.handle` and then expose a function that calls `ipcRenderer.invoke` to trigger the handler in your preload script.

### IPC Implementation Example

**preload.js:**

```javascript
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  // we can also expose variables, not just functions
})
```

**Important security note:** You never want to directly expose the entire `ipcRenderer` module via context bridge. This would give your renderer the ability to send arbitrary IPC messages to the main process, which becomes a powerful attack vector for malicious code.

### Setting Up the Handler in Main

**main.js:**

```javascript
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()
})
```

### Using the IPC Channel in the Renderer

**renderer.js:**

```javascript
const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // prints out 'pong'
}

func()
```

Once you have the sender and receiver set up, you can now send messages from the renderer to the main process through the `'ping'` channel you just defined.

## Summary

A preload script contains code that runs before your web page is loaded into the browser window. It has access to both DOM APIs and Node.js environment, and is often used to expose privileged APIs to the renderer via the `contextBridge` API.

Since the main and renderer processes have very different responsibilities, Electron apps often use the preload script to set up inter-process communication (IPC) interfaces to pass arbitrary messages between the two kinds of processes. Use `ipcMain.handle` in the main process and `ipcRenderer.invoke` in the preload, then expose the function to the renderer via `contextBridge`.
