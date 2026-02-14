---
title: Security
source_url: https://www.electronjs.org/docs/latest/tutorial/security
---

# Security

## Overview

Electron enables developers to build feature-rich desktop applications using web technologies. However, this power comes with significant security responsibilities that differ from traditional web development.

## Key Security Principle

Displaying arbitrary content from untrusted sources poses a severe security risk that Electron is not intended to handle.

## Security Checklist

### 1. Only Load Secure Content

Use HTTPS, WSS, and FTPS protocols instead of their insecure counterparts (HTTP, WS, FTP). This ensures data integrity and encrypts traffic between your application and destination hosts.

```javascript
// Bad
browserWindow.loadURL('http://example.com')

// Good
browserWindow.loadURL('https://example.com')
```

### 2. Do Not Enable Node.js Integration for Remote Content

Disabling Node.js integration prevents XSS attacks from escalating into Remote Code Execution attacks. This is the default behavior since Electron 5.0.0.

```javascript
// Good
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})
```

### 3. Enable Context Isolation

Context isolation prevents scripts in the renderer process from modifying global objects. This is default since Electron 12.0.0 and must be used alongside `nodeIntegration: false`.

### 4. Enable Process Sandboxing

Sandboxing uses operating system features to limit renderer process access. This is default since Electron 20.0.0.

### 5. Handle Session Permission Requests

Use `ses.setPermissionRequestHandler()` to control permissions for features like notifications rather than automatically approving requests.

```javascript
session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
  const parsedUrl = new URL(webContents.getURL())
  if (parsedUrl.protocol !== 'https:' || parsedUrl.host !== 'example.com') {
    return callback(false)
  }
})
```

### 6. Do Not Disable Web Security

Disabling `webSecurity` removes same-origin policy protections and enables insecure content execution across domains.

### 7. Define Content Security Policy

CSP restricts which resources can load, preventing injection attacks:

```
Content-Security-Policy: script-src 'self' https://apis.example.com
```

### 8. Do Not Enable `allowRunningInsecureContent`

Prevent loading insecure resources on HTTPS pages.

### 9. Do Not Enable Experimental Features

Avoid `experimentalFeatures` property as these features lack thorough testing.

### 10. Do Not Use `enableBlinkFeatures`

Features disabled by default typically have security reasons; enable only when necessary.

### 11. Do Not Use `allowpopups` for WebViews

Restrict popup creation to prevent attackers from opening new windows:

```html
<!-- Good -->
<webview src="page.html"></webview>
```

### 12. Verify WebView Options Before Creation

Monitor WebView creation using the `will-attach-webview` event and validate security settings.

```javascript
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    delete webPreferences.preload
    webPreferences.nodeIntegration = false
    if (!params.src.startsWith('https://example.com/')) {
      event.preventDefault()
    }
  })
})
```

### 13. Disable or Limit Navigation

Use the `will-navigate` handler to restrict navigation to known, trusted URLs:

```javascript
contents.on('will-navigate', (event, navigationUrl) => {
  const parsedUrl = new URL(navigationUrl)
  if (parsedUrl.origin !== 'https://example.com') {
    event.preventDefault()
  }
})
```

### 14. Disable or Limit Window Creation

Use `setWindowOpenHandler` to control new window creation and deny unexpected requests.

### 15. Do Not Use `shell.openExternal` with Untrusted Content

Improper usage can execute arbitrary commands. Only open URLs you have validated.

### 16. Use Current Electron Version

Maintain up-to-date versions of Electron, Chromium, and Node.js to patch known vulnerabilities.

### 17. Validate IPC Message Senders

Always validate the `sender` property to prevent third-party frames from sending privileged messages.

```javascript
ipcMain.handle('get-secrets', (e) => {
  if (!validateSender(e.senderFrame)) return null
  return getSecrets()
})
```

### 18. Avoid `file://` Protocol

Use custom protocols instead for better access control and XSS prevention.

### 19. Check Electron Fuses

Review available fuses to disable unnecessary features like `runAsNode` that could enable command execution.

### 20. Do Not Expose Electron APIs to Untrusted Content

Filter exposed APIs through `contextBridge` to prevent direct access to IPC system:

```javascript
// Good
contextBridge.exposeInMainWorld('electronAPI', {
  onUpdateCounter: (callback) =>
    ipcRenderer.on('update-counter', (_event, value) => callback(value))
})
```

## General Guidelines

Security is everyone's responsibility. Protect your application by:

- Maintaining current framework versions
- Evaluating third-party dependencies carefully
- Adopting secure coding practices and security testing

Isolate untrusted content by disabling Node.js integration and enabling context isolation for any renderer loading remote content.
