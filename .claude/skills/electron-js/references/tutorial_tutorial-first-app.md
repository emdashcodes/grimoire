---
title: Building your First App
source_url: https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app
---

# Building your First App

## Learning Goals

In this part of the tutorial, you will learn how to set up your Electron project and write a minimal starter application. By the end of this section, you should be able to run a working Electron app from your terminal in development mode.

## Setting Up Your Project

### Initialize npm Package

Create a project folder and initialize npm:

```bash
mkdir my-electron-app && cd my-electron-app
npm init
```

**Configuration requirements:**
- `entry point` should be `main.js`
- `author`, `license`, and `description` can be any value but are necessary for packaging later

Your `package.json` should look something like this:

```json
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "description": "Hello World!",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Jane Doe",
  "license": "MIT"
}
```

### Install Electron as Dev Dependency

```bash
npm install electron --save-dev
```

**Important:** Electron is a development-only dependency. Because Electron apps bundle their own Electron binary in production, it should not be installed as a production dependency.

**Note on package managers:** Electron's packaging toolchain requires the `node_modules` folder to be physically on disk in the way that npm installs Node dependencies. If using Yarn, configure `nodeLinker: node-modules` in your `.yarnrc.yml`. If using pnpm, configure `nodeLinker: hoisted` in your `.npmrc`.

### Add a .gitignore

Use GitHub's Node.js gitignore template to avoid committing `node_modules` into version control.

## Running an Electron App

### Create main.js Entry Point

The `main` script is the entry point of your Electron app. It runs the **main process**, which controls your app's lifecycle, displays the native interface, performs privileged operations, and manages renderer processes.

Create a `main.js` file in the root folder:

```javascript
console.log('Hello from Electron!')
```

### Add Start Script

Update `package.json` to add a `start` script:

```json
{
  "scripts": {
    "start": "electron ."
  }
}
```

Run the app:

```bash
npm run start
```

Since you have only logged a message, the app will display in your terminal and then exit.

## Loading a Web Page into a BrowserWindow

In Electron, each window displays a web page that can be loaded either from a local HTML file or a remote web address. The `BrowserWindow` module is used to create app windows.

### Create index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <meta
      http-equiv="X-Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <title>Hello from Electron renderer!</title>
  </head>
  <body>
    <h1>Hello from Electron renderer!</h1>
    <p>👋</p>
  </body>
</html>
```

### Update main.js to Display a Window

```javascript
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})
```

**Key components:**
- `app` module: Controls your application's event lifecycle.
- `BrowserWindow` module: Creates and manages app windows.
- `app.whenReady()`: Returns a Promise that resolves when Electron is fully initialized. Windows cannot be created before this event.

## Managing Your App's Window Lifecycle

Application windows behave differently on each operating system. Electron lets you implement these conventions in your app code through the `app` and `BrowserWindow` modules.

### Quit the app when all windows are closed (Windows & Linux)

On Windows and Linux, closing all windows should generally quit the application entirely:

```javascript
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```

### Open a window if none are open (macOS)

macOS apps generally continue running even without any windows open. Activating the app when no windows are available should open a new one:

```javascript
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
```

## Complete main.js

```javascript
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```

## Optional: Debugging from VS Code

If you want to debug your app with VS Code, you need to attach VS Code to both the main and renderer processes. Create a `.vscode/launch.json` file with configurations for:

1. **Main Process** - Launches `electron .` with remote debugging enabled
2. **Renderer Process** - Attaches to the running renderer's Chrome DevTools
3. **Compound Task** - Runs both configurations simultaneously

## Summary

Electron applications are set up using npm packages. The Electron executable should be installed in your project's `devDependencies` and can be run in development mode using a script in your package.json file.

The executable runs the main entry point found in the `main` property of your package.json. This entry file controls Electron's **main process**, which runs an instance of Node.js and is responsible for your app's lifecycle, displaying native interfaces, performing privileged operations, and managing renderer processes.

**Renderer processes** (or renderers) are responsible for displaying graphical content. You can load a web page into a renderer by pointing it at either a web address or a local HTML file. Renderers behave very similarly to normal web pages and have access to the same web APIs.
