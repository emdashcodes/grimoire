---
title: Process Sandboxing
source_url: https://www.electronjs.org/docs/latest/tutorial/sandbox
---

# Process Sandboxing

## Overview

One key security feature in Chromium is that processes can be executed within a sandbox. The sandbox limits the harm that malicious code can cause by limiting access to most system resources -- sandboxed processes can only freely use CPU cycles and memory. In order to perform operations requiring additional privilege, sandboxed processes use dedicated communication channels to delegate tasks to more privileged processes.

In Chromium, sandboxing is applied to most processes other than the main process. This includes renderer processes, as well as utility processes such as the audio service, the GPU service and the network service.

Starting from Electron 20, the sandbox is enabled for renderer processes without any further configuration.

Sandboxing is tied to Node.js integration. Enabling Node.js integration for a renderer process by setting `nodeIntegration: true` disables the sandbox for the process.

## Sandbox behavior in Electron

Sandboxed processes in Electron behave mostly in the same way as Chromium's do, but Electron has a few additional concepts to consider because it interfaces with Node.js.

### Renderer processes

When renderer processes in Electron are sandboxed, they behave in the same way as a regular Chrome renderer would. A sandboxed renderer won't have a Node.js environment initialized.

Therefore, when the sandbox is enabled, renderer processes can only perform privileged tasks (such as interacting with the filesystem, making changes to the system, or spawning subprocesses) by delegating these tasks to the main process via inter-process communication (IPC).

### Preload scripts

In order to allow renderer processes to communicate with the main process, preload scripts attached to sandboxed renderers will still have a polyfilled subset of Node.js APIs available. A `require` function similar to Node's `require` module is exposed, but can only import a subset of Electron and Node's built-in modules:

**Supported modules:**
- `electron` (following renderer process modules: `contextBridge`, `crashReporter`, `ipcRenderer`, `nativeImage`, `webFrame`, `webUtils`)
- `events`
- `timers`
- `url`

**Node imports** are supported as well:
- `node:events`
- `node:timers`
- `node:url`

In addition, the preload script also polyfills certain Node.js primitives as globals:

- `Buffer`
- `process`
- `clearImmediate`
- `setImmediate`

Because the `require` function is a polyfill with limited functionality, you will not be able to use CommonJS modules to separate your preload script into multiple files. If you need to split your preload code, use a bundler such as webpack or Parcel.

Note that because the environment presented to the `preload` script is substantially more privileged than that of a sandboxed renderer, it is still possible to leak privileged APIs to untrusted code running in the renderer process unless `contextIsolation` is enabled.

## Configuring the sandbox

For most apps, sandboxing is the best choice. In certain use cases that are incompatible with the sandbox (for instance, when using native node modules in the renderer), it is possible to disable the sandbox for specific processes. This comes with security risks, especially if any untrusted code or content is present in the unsandboxed process.

### Disabling the sandbox for a single process

In Electron, renderer sandboxing can be disabled on a per-process basis with the `sandbox: false` preference in the `BrowserWindow` constructor.

```javascript
// main.js
app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      sandbox: false
    }
  })
  win.loadURL('https://google.com')
})
```

Sandboxing is also disabled whenever Node.js integration is enabled in the renderer. This can be done through the BrowserWindow constructor with the `nodeIntegration: true` flag.

```javascript
// main.js
app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadURL('https://google.com')
})
```

### Enabling the sandbox globally

If you want to force sandboxing for all renderers, you can also use the `app.enableSandbox` API. Note that this API has to be called before the app's `ready` event.

```javascript
// main.js
app.enableSandbox()
app.whenReady().then(() => {
  // any sandbox:false calls are overridden since `app.enableSandbox()` was called.
  const win = new BrowserWindow()
  win.loadURL('https://google.com')
})
```

### Disabling Chromium's sandbox (testing only)

You can also disable Chromium's sandbox entirely with the `--no-sandbox` CLI flag, which will disable the sandbox for all processes (including utility processes). It is highly recommended that you only use this flag for testing purposes, and **never** in production.

Note that the `sandbox: true` option will still disable the renderer's Node.js environment.

## A note on rendering untrusted content

Rendering untrusted content in Electron is still somewhat uncharted territory, though some apps are finding success. Electron aims to achieve security parity with Chrome regarding sandboxed content, but faces limitations:

1. Electron lacks the dedicated resources and expertise that Chromium dedicates to security.
2. Some Chrome security features (such as Safe Browsing and Certificate Transparency) require centralized infrastructure that conflicts with Electron's project goals.
3. The single Chromium codebase contrasts with thousands of distinct Electron applications, each behaving differently.
4. Security updates cannot be pushed directly to users; app vendors must upgrade their Electron version for patches to reach end users.

The most effective security approach is maintaining the latest stable Electron version.
