---
name: electron-js
description: Use this skill when building Electron desktop applications, working with Electron APIs (BrowserWindow, IPC, dialog, menu, tray, etc.), configuring Electron app packaging/distribution, or answering questions about Electron's process model, security, and architecture.
allowed-tools: Read
---

# Electron.js

## Overview

Comprehensive reference for building cross-platform desktop applications with Electron. Covers the full Electron API surface (main process, renderer process, and utility process modules), core architectural concepts (process model, IPC, context isolation), and practical guides for packaging, distribution, and security.

## When to Use This Skill

Activate this skill when:

- Building or modifying an Electron desktop application
- Working with Electron APIs (BrowserWindow, ipcMain/ipcRenderer, dialog, menu, tray, session, etc.)
- Configuring Electron app packaging, code signing, or distribution
- Implementing IPC communication between main and renderer processes
- Debugging Electron-specific issues (context isolation, preload scripts, sandboxing)
- Working with Electron Forge or other Electron build tools

## Quick Reference

**Create a new Electron app:**
```bash
npm init electron-app@latest my-app
```

**Core imports (main process):**
```js
const { app, BrowserWindow, ipcMain, dialog, Menu, Tray } = require('electron')
```

**Core imports (renderer/preload):**
```js
const { contextBridge, ipcRenderer } = require('electron')
```

**Basic app structure:**
- `main.js` — Main process entry point
- `preload.js` — Preload script (bridge between main and renderer)
- `index.html` — Renderer process UI

**Expose API to renderer via preload:**
```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (msg) => ipcRenderer.send('message', msg),
  onReply: (callback) => ipcRenderer.on('reply', (_event, value) => callback(value))
})
```

**Key conventions:**
- Main process manages windows, system APIs, and app lifecycle
- Renderer processes run web content in sandboxed BrowserWindows
- Use `contextBridge` + preload scripts for secure main↔renderer communication
- Never expose full `ipcRenderer` to renderer — only expose specific channels

## Getting Started

### What is Electron?

Overview of Electron's architecture and capabilities.

**Reference**: `references/overview.md`

**When to reference**: When explaining Electron to someone new or reviewing its high-level architecture.

### Prerequisites

System requirements and tooling needed before starting.

**Reference**: `references/tutorial_tutorial-prerequisites.md`

**When to reference**: When setting up a new development environment for Electron.

### Building Your First App

Step-by-step tutorial for creating a basic Electron application.

**Reference**: `references/tutorial_tutorial-first-app.md`

**When to reference**: When creating a new Electron project from scratch.

### Using Preload Scripts

How to use preload scripts to safely expose Node.js APIs to the renderer.

**Reference**: `references/tutorial_tutorial-preload.md`

**When to reference**: When setting up the bridge between main and renderer processes.

### Adding Features

Guide to extending your Electron app with additional capabilities.

**Reference**: `references/tutorial_tutorial-adding-features.md`

**When to reference**: When adding new functionality to an existing Electron app.

### Installation

Advanced installation options, mirrors, proxies, and custom builds.

**Reference**: `references/tutorial_installation.md`

**When to reference**: When dealing with installation issues, custom Electron builds, or proxy configurations.

### ES Modules (ESM)

Using ES modules in Electron applications.

**Reference**: `references/tutorial_esm.md`

**When to reference**: When configuring ESM support or migrating from CommonJS to ESM in an Electron app.

## Core Concepts

### Process Model

How Electron's multi-process architecture works — main, renderer, and utility processes.

**Reference**: `references/tutorial_process-model.md`

**When to reference**: When understanding or explaining Electron's process architecture, or when deciding where to place functionality.

### Inter-Process Communication (IPC)

Patterns for communicating between main and renderer processes.

**Reference**: `references/tutorial_ipc.md`

**When to reference**: When implementing any communication between main and renderer processes.

### Context Isolation

How context isolation protects your app by separating preload scripts from renderer code.

**Reference**: `references/tutorial_context-isolation.md`

**When to reference**: When configuring preload scripts or troubleshooting `contextBridge` issues.

### Process Sandboxing

Chromium's sandbox and how it applies to Electron renderer processes.

**Reference**: `references/tutorial_sandbox.md`

**When to reference**: When configuring sandbox settings or understanding renderer process restrictions.

### Security

Security best practices and checklist for Electron applications.

**Reference**: `references/tutorial_security.md`

**When to reference**: When reviewing security posture, configuring CSP, or hardening an Electron app.

### Message Ports

Using MessagePort API for direct communication between processes.

**Reference**: `references/tutorial_message-ports.md`

**When to reference**: When implementing direct communication channels between renderer processes or between renderer and utility processes.

### Multithreading

Using Web Workers and utility processes for parallel work.

**Reference**: `references/tutorial_multithreading.md`

**When to reference**: When offloading CPU-intensive work from the main process.

## Application Lifecycle & System

### app

Control your application's event lifecycle — the central module for managing app startup, shutdown, and system integration.

**Reference**: `references/api_app.md`

**When to reference**: When handling app lifecycle events (ready, activate, quit), setting app metadata, or managing app-level behavior.

### process

Electron's extended process object with additional properties and methods.

**Reference**: `references/api_process.md`

**When to reference**: When checking process type, memory info, CPU usage, or system version.

### Environment Variables

Electron-specific environment variables that control behavior.

**Reference**: `references/api_environment-variables.md`

**When to reference**: When configuring Electron behavior via environment variables (e.g., `ELECTRON_ENABLE_LOGGING`).

### Command Line Switches

Supported Chromium and Electron command line flags.

**Reference**: `references/api_command-line-switches.md`

**When to reference**: When needing to pass flags to Electron (e.g., `--remote-debugging-port`, `--disable-gpu`).

### CommandLine

Manipulate the command line arguments for your app.

**Reference**: `references/api_command-line.md`

**When to reference**: When programmatically appending or checking command line switches.

## Windows

### BrowserWindow

Create and control browser windows — the primary window class.

**Reference**: `references/api_browser-window.md`

**When to reference**: When creating, configuring, or managing application windows.

### BaseWindow

Base class for windows without a web content view.

**Reference**: `references/api_base-window.md`

**When to reference**: When building custom window layouts using multiple WebContentsViews, or when you need a window without a default web view.

### Window Customization

Frameless windows, title bar customization, transparency, and more.

**Reference**: `references/tutorial_window-customization.md`

**When to reference**: When customizing window appearance — frameless, transparent, custom title bars, traffic light positioning.

### window.open Behavior

How `window.open()` works in Electron and how to customize it.

**Reference**: `references/api_window-open.md`

**When to reference**: When handling popup windows or customizing `window.open` behavior via `setWindowOpenHandler`.

## Views

### View

Base class for creating visual layouts with child views.

**Reference**: `references/api_view.md`

**When to reference**: When working with Electron's view hierarchy or building custom view layouts.

### WebContentsView

A view that displays web content — the modern replacement for BrowserView.

**Reference**: `references/api_web-contents-view.md`

**When to reference**: When embedding web content views within a BaseWindow or composing multi-view layouts.

### webContents

Render and control web page content — the core module for all web content interaction.

**Reference**: `references/api_web-contents.md`

**When to reference**: When loading URLs, executing JS, handling navigation, printing, capturing, or any web content manipulation.

### webview Tag

Embed external web content using the `<webview>` tag (use WebContentsView when possible).

**Reference**: `references/api_webview-tag.md`

**When to reference**: When embedding third-party content in a renderer process.

### webFrame

Customize the rendering of the current web page from the renderer process.

**Reference**: `references/api_web-frame.md`

**When to reference**: When setting zoom levels, spell checker, or executing JS in isolated worlds.

### webFrameMain

Control web frames from the main process.

**Reference**: `references/api_web-frame-main.md`

**When to reference**: When accessing or manipulating frames from the main process (e.g., sending messages to specific frames).

## IPC

### ipcMain

Handle messages from renderer processes in the main process.

**Reference**: `references/api_ipc-main.md`

**When to reference**: When setting up main process handlers for IPC messages.

### ipcRenderer

Send messages from renderer to main process.

**Reference**: `references/api_ipc-renderer.md`

**When to reference**: When sending messages or invoking handlers from the renderer process.

### contextBridge

Safely expose APIs from preload scripts to renderer content.

**Reference**: `references/api_context-bridge.md`

**When to reference**: When creating the API surface exposed to renderer processes via preload scripts.

## Menus & Shortcuts

### Menu

Create native application menus and context menus.

**Reference**: `references/api_menu.md`

**When to reference**: When building app menus, context menus, or dock menus.

### MenuItem

Add items to native menus.

**Reference**: `references/api_menu-item.md`

**When to reference**: When configuring individual menu items — roles, accelerators, types, click handlers.

### Keyboard Shortcuts

Configuring local and global keyboard shortcuts.

**Reference**: `references/tutorial_keyboard-shortcuts.md`

**When to reference**: When adding keyboard shortcuts to an Electron app.

### globalShortcut

Register/unregister global keyboard shortcuts (system-wide).

**Reference**: `references/api_global-shortcut.md`

**When to reference**: When registering shortcuts that work even when the app is not focused.

## Dialogs & UI

### dialog

Show native system dialogs — open file, save file, message box, error box.

**Reference**: `references/api_dialog.md`

**When to reference**: When showing file pickers, save dialogs, or message boxes.

### Tray

Add icons and context menus to the system notification area.

**Reference**: `references/api_tray.md`

**When to reference**: When adding a system tray icon with menu.

### Notifications

Send native OS notifications.

**Reference**: `references/tutorial_notifications.md`

**When to reference**: When implementing desktop notifications.

### Notification API

The Notification class for creating OS-level notifications.

**Reference**: `references/api_notification.md`

**When to reference**: When configuring notification options — actions, sounds, urgency, custom content.

### Dock (macOS)

Control the macOS dock icon — bouncing, badges, menu.

**Reference**: `references/api_dock.md`

**When to reference**: When customizing macOS dock behavior.

### Dark Mode

Respecting the system dark mode preference.

**Reference**: `references/tutorial_dark-mode.md`

**When to reference**: When implementing dark/light theme switching.

### nativeTheme

Read and respond to Chromium/OS theme changes.

**Reference**: `references/api_native-theme.md`

**When to reference**: When detecting or overriding dark mode, accent colors, or high contrast settings.

### Accessibility

Accessibility features and best practices.

**Reference**: `references/tutorial_accessibility.md`

**When to reference**: When improving app accessibility or working with screen readers.

## Networking

### net

Issue HTTP/HTTPS requests from the main process using Chromium's networking stack.

**Reference**: `references/api_net.md`

**When to reference**: When making HTTP requests from the main process (supports proxy, authentication).

### ClientRequest

Make HTTP/HTTPS requests with streaming support.

**Reference**: `references/api_client-request.md`

**When to reference**: When you need fine-grained control over HTTP requests (streaming, progress events).

### session

Manage browser sessions, cookies, cache, proxy settings.

**Reference**: `references/api_session.md`

**When to reference**: When configuring sessions, proxies, download handlers, permissions, or protocol handlers.

### Cookies

Query and modify cookies.

**Reference**: `references/api_cookies.md`

**When to reference**: When getting, setting, or removing cookies.

### WebRequest

Intercept and modify web requests at various stages.

**Reference**: `references/api_web-request.md`

**When to reference**: When intercepting, modifying, or blocking network requests (content filtering, header modification).

### protocol

Register custom protocol handlers and intercept existing protocols.

**Reference**: `references/api_protocol.md`

**When to reference**: When implementing custom URL schemes (e.g., `app://`) or intercepting built-in protocols.

## System Integration

### shell

Manage files and URLs using their default applications.

**Reference**: `references/api_shell.md`

**When to reference**: When opening files, URLs, or paths in the default system application.

### clipboard

Perform copy/paste operations on the system clipboard.

**Reference**: `references/api_clipboard.md`

**When to reference**: When reading from or writing to the system clipboard.

### screen

Retrieve information about screen size, displays, cursor position.

**Reference**: `references/api_screen.md`

**When to reference**: When working with multiple displays or screen geometry.

### powerMonitor

Monitor power state changes — suspend, resume, battery, thermal.

**Reference**: `references/api_power-monitor.md`

**When to reference**: When responding to system sleep/wake events or power status changes.

### powerSaveBlocker

Prevent the system from entering sleep mode.

**Reference**: `references/api_power-save-blocker.md`

**When to reference**: When preventing screen dimming or system sleep during long operations.

### systemPreferences

Get system preferences and settings (macOS/Windows).

**Reference**: `references/api_system-preferences.md`

**When to reference**: When accessing OS-level preferences, colors, media permissions, or system settings.

### nativeImage

Create tray, dock, and application icons using PNG or JPG files.

**Reference**: `references/api_native-image.md`

**When to reference**: When creating or manipulating images for tray icons, window icons, or thumbnails.

### NavigationHistory

Manage page navigation history.

**Reference**: `references/api_navigation-history.md`

**When to reference**: When implementing back/forward navigation or inspecting navigation history.

### Native File Drag & Drop

Use native file drag and drop in your Electron app.

**Reference**: `references/tutorial_native-file-drag-drop.md`

**When to reference**: When implementing file drag and drop between Electron and native apps.

### safeStorage

Encrypt and decrypt strings using OS-provided cryptography.

**Reference**: `references/api_safe-storage.md`

**When to reference**: When storing sensitive data locally (tokens, passwords).

### DownloadItem

Control file downloads.

**Reference**: `references/api_download-item.md`

**When to reference**: When managing file downloads — tracking progress, pausing, resuming, saving.

### webUtils

Utility functions for working with web content.

**Reference**: `references/api_web-utils.md`

**When to reference**: When converting file objects to paths or working with web-related utilities.

## Processes

### utilityProcess

Create child processes with Node.js integration from the main process.

**Reference**: `references/api_utility-process.md`

**When to reference**: When spawning utility processes for CPU-intensive work or native module isolation.

### autoUpdater

Enable auto-updating your application.

**Reference**: `references/api_auto-updater.md`

**When to reference**: When implementing automatic updates using Squirrel (macOS/Windows).

## Packaging & Distribution

### Packaging Your Application

How to package an Electron app for distribution.

**Reference**: `references/tutorial_tutorial-packaging.md`

**When to reference**: When preparing an app for distribution.

### Distribution Overview

Overview of distribution strategies.

**Reference**: `references/tutorial_distribution-overview.md`

**When to reference**: When choosing a distribution approach for your Electron app.

### Electron Forge

Using Electron Forge for building, packaging, and publishing.

**Reference**: `references/tutorial_forge-overview.md`

**When to reference**: When using Electron Forge as the build tool.

### Publishing and Updating

How to publish your app and set up auto-updates.

**Reference**: `references/tutorial_tutorial-publishing-updating.md`

**When to reference**: When publishing to update servers or configuring auto-update feeds.

### Code Signing

Code signing your app for macOS and Windows.

**Reference**: `references/tutorial_code-signing.md`

**When to reference**: When signing your app for distribution (notarization, certificates).

### Using Native Node Modules

Compiling and using native Node.js addons with Electron.

**Reference**: `references/tutorial_using-native-node-modules.md`

**When to reference**: When using native C++ addons or rebuilding modules for Electron's Node.js version.

## Testing & Debugging

### Automated Testing

Testing strategies for Electron apps — unit, integration, E2E.

**Reference**: `references/tutorial_automated-testing.md`

**When to reference**: When setting up tests for an Electron application.

### Application Debugging

Debugging techniques for Electron apps.

**Reference**: `references/tutorial_application-debugging.md`

**When to reference**: When debugging main or renderer process issues.

### Performance

Performance best practices for Electron apps.

**Reference**: `references/tutorial_performance.md`

**When to reference**: When optimizing app startup time, memory usage, or rendering performance.

## Reference

### FAQ

Frequently asked questions about Electron.

**Reference**: `references/faq.md`

**When to reference**: When troubleshooting common Electron issues or answering recurring questions.

### Glossary

Key Electron terms and concepts defined.

**Reference**: `references/glossary.md`

**When to reference**: When clarifying Electron-specific terminology (main process, renderer process, preload, etc.).

### Breaking Changes

Notable breaking changes across Electron versions.

**Reference**: `references/breaking-changes.md`

**When to reference**: When upgrading Electron versions or troubleshooting post-upgrade issues.

## Reference Documentation Index

All documentation is available in the `references/` directory:

**Getting Started & Overview**:
- `overview.md` - What is Electron?
- `tutorial_tutorial-prerequisites.md` - Prerequisites for development
- `tutorial_tutorial-first-app.md` - Building your first app
- `tutorial_tutorial-preload.md` - Using preload scripts
- `tutorial_tutorial-adding-features.md` - Adding features to your app
- `tutorial_installation.md` - Advanced installation instructions
- `tutorial_esm.md` - ES Modules in Electron

**Core Concepts**:
- `tutorial_process-model.md` - Process model architecture
- `tutorial_ipc.md` - Inter-process communication
- `tutorial_context-isolation.md` - Context isolation
- `tutorial_sandbox.md` - Process sandboxing
- `tutorial_security.md` - Security best practices
- `tutorial_message-ports.md` - MessagePorts
- `tutorial_multithreading.md` - Multithreading

**App Lifecycle & System**:
- `api_app.md` - App lifecycle and events
- `api_process.md` - Process object extensions
- `api_environment-variables.md` - Environment variables
- `api_command-line-switches.md` - Command line switches
- `api_command-line.md` - CommandLine class

**Windows & Views**:
- `api_browser-window.md` - BrowserWindow
- `api_base-window.md` - BaseWindow
- `api_view.md` - View base class
- `api_web-contents-view.md` - WebContentsView
- `api_web-contents.md` - webContents
- `api_webview-tag.md` - webview tag
- `api_web-frame.md` - webFrame (renderer)
- `api_web-frame-main.md` - webFrameMain (main)
- `api_window-open.md` - window.open behavior
- `tutorial_window-customization.md` - Window customization

**IPC & Communication**:
- `api_ipc-main.md` - ipcMain
- `api_ipc-renderer.md` - ipcRenderer
- `api_context-bridge.md` - contextBridge

**Menus & Shortcuts**:
- `api_menu.md` - Menu
- `api_menu-item.md` - MenuItem
- `api_global-shortcut.md` - globalShortcut
- `tutorial_keyboard-shortcuts.md` - Keyboard shortcuts guide

**Dialogs & UI**:
- `api_dialog.md` - Dialog (file pickers, message boxes)
- `api_tray.md` - System tray
- `api_notification.md` - Notification class
- `api_dock.md` - macOS Dock
- `api_native-theme.md` - nativeTheme
- `api_native-image.md` - nativeImage
- `tutorial_notifications.md` - Notifications guide
- `tutorial_dark-mode.md` - Dark mode guide
- `tutorial_accessibility.md` - Accessibility

**Networking**:
- `api_net.md` - net module
- `api_client-request.md` - ClientRequest
- `api_session.md` - Session management
- `api_cookies.md` - Cookies
- `api_web-request.md` - WebRequest (interceptors)
- `api_protocol.md` - Custom protocols

**System Integration**:
- `api_shell.md` - Shell (open files/URLs)
- `api_clipboard.md` - Clipboard
- `api_screen.md` - Screen/display info
- `api_power-monitor.md` - Power state monitoring
- `api_power-save-blocker.md` - Prevent sleep
- `api_system-preferences.md` - OS preferences
- `api_navigation-history.md` - Navigation history
- `api_safe-storage.md` - Encrypted storage
- `api_download-item.md` - Download management
- `api_web-utils.md` - Web utilities
- `tutorial_native-file-drag-drop.md` - Native drag & drop

**Processes**:
- `api_utility-process.md` - Utility processes
- `api_auto-updater.md` - Auto-updater

**Packaging & Distribution**:
- `tutorial_tutorial-packaging.md` - Packaging guide
- `tutorial_distribution-overview.md` - Distribution overview
- `tutorial_forge-overview.md` - Electron Forge
- `tutorial_tutorial-publishing-updating.md` - Publishing and updating
- `tutorial_code-signing.md` - Code signing
- `tutorial_using-native-node-modules.md` - Native Node modules

**Testing & Debugging**:
- `tutorial_automated-testing.md` - Automated testing
- `tutorial_application-debugging.md` - Debugging guide
- `tutorial_performance.md` - Performance optimization

**Reference**:
- `faq.md` - Frequently asked questions
- `glossary.md` - Electron glossary
- `breaking-changes.md` - Breaking changes across versions
