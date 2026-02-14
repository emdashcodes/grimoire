---
title: Breaking Changes
source_url: https://www.electronjs.org/docs/latest/breaking-changes
---

# Breaking Changes

This document catalogs breaking changes across Electron versions, organized by version number from newest to oldest.

## Planned Breaking Changes (40.0)

### Deprecated: Clipboard API in Renderer
Using the `clipboard` API directly in the renderer process is deprecated. Use a preload script with contextBridge instead.

### Behavior Changed: macOS dSYM Compression
Debug symbols now use tar.xz compression instead of zip format, requiring users to update extraction utilities.

## Planned Breaking Changes (39.0)

### Command Line Switch Updates
- `--host-rules` deprecated; use `--host-resolver-rules` instead
- `window.open` popups now always resizable per WHATWG spec

### Shared Texture OSR Changes
The `paint` event data structure reorganizes texture properties into a unified `handle` object.

## Planned Breaking Changes (38.0)

### Platform Support Removals
- macOS 11 (Big Sur) no longer supported; requires macOS 12+
- `ELECTRON_OZONE_PLATFORM_HINT` and `ORIGINAL_XDG_CURRENT_DESKTOP` environment variables removed

### API Removals
- `plugin-crashed` event removed from webContents
- `webFrame.routingId` and `webFrame.findFrameByRoutingId()` deprecated in favor of token-based methods

## Planned Breaking Changes (37.0)

### Utility Process Changes
- Unhandled rejections now warn instead of crashing
- `process.exit()` now kills synchronously (aligns with Node.js)

### WebUSB/WebSerial Blocklist Support
These APIs now enforce blocklists; use `disable-usb-blocklist` and `disable-serial-blocklist` flags to disable.

### ProtocolResponse Session Property
The `null` value for `session` property is no longer supported.

## Planned Breaking Changes (36.0)

### Command Line Handling
`app.commandLine` will convert upper-case switches and arguments to lowercase.

### API Deprecations and Removals
- `NativeImage.getBitmap()` deprecated; use `toBitmap()`
- `PrinterInfo` properties `isDefault` and `status` removed
- `Session.clearStorageData()` quota type `syncable` removed
- Extension methods/events moved to `session.extensions` class
- `systemPreferences.isAeroGlassEnabled()` removed

### GTK Version Changes
GTK 4 now default on GNOME; use `--gtk-version` flag if needed.

## Planned Breaking Changes (35.0)

### Dialog API on Linux
Portal file chooser support for `defaultPath` requires version 4+.

### Service Worker APIs
- `session.serviceWorkers.fromVersionID()` deprecated; use `getInfoFromVersionID()`
- Preload script methods refactored: `registerPreloadScript()`, `unregisterPreloadScript()`, `getPreloadScripts()`

### Console Message Event
Event structure updated to provide details on the `Event` argument; `level` now returns string values.

### WebRequestFilter URLs
Empty `urls` array no longer matches all URLs; use `<all_urls>` pattern instead.

## Planned Breaking Changes (34.0)

Menu bar now hidden during fullscreen on Windows (parity with Linux).

## Planned Breaking Changes (33.0)

### Clipboard and Frame Changes
- `document.execCommand("paste")` deprecated in favor of async clipboard API
- `WebFrameMain` instances may be detached or null on late access
- Custom protocol URLs with Windows file paths no longer work with deprecated APIs
- `login` event webContents may be null for utility process requests

### BrowserWindow Type Option
The `textured` option for `type` deprecated; relies on deprecated macOS API.

### OS Support
macOS 10.15 (Catalina) support removed; requires macOS 11+.

### Native Modules
Native modules now require C++20 standard.

### Accessibility
`systemPreferences.accessibilityDisplayShouldReduceTransparency` deprecated in favor of `nativeTheme.prefersReducedTransparency`.

## Planned Breaking Changes (32.0)

### File Object Changes
The nonstandard `path` property of the Web `File` object was added in an early version of Electron and is now removed; use `webUtils.getPathForFile()`.

### Navigation History Refactoring
Methods like `clearHistory()`, `canGoBack()`, `goBack()` moved to `webContents.navigationHistory` property.

### WebSQL Removal
The `databases` directory will be deleted on first run of Electron 32.

## Planned Breaking Changes (31.0)

### WebSQL Support Removed
Chromium has removed support for WebSQL upstream, transitioning it to Android only.

### Image Processing
`nativeImage.toDataURL` now preserves PNG colorspace data.

### Window Flashing on macOS
`window.flashFrame(bool)` now flashes dock continuously; use `dock.bounce()` for single bounce.

## Planned Breaking Changes (30.0)

### Cross-Origin iframe Permissions
Cross-origin iframes must specify features via the `allow` attribute.

### BrowserView Deprecation
The `BrowserView` class has been deprecated and replaced by the new `WebContentsView` API.

### Context Menu Changes
`inputFormType` property replaced by `formControlType`.

### API Removals
- `process.getIOCounters()` removed
- `--disable-color-correct-rendering` switch removed

## Planned Breaking Changes (29.0)

### IPC and Process Changes
- `ipcRenderer` cannot be sent over contextBridge (security measure)
- `renderer-process-crashed` event replaced by `render-process-gone`
- `crashed` event on WebContents replaced by `render-process-gone`
- `gpu-process-crashed` replaced by `child-process-gone`

## Planned Breaking Changes (28.0)

### BrowserView and Window Controls
- `setTrafficLightPosition()` replaced by `setWindowButtonPosition()`
- `getTrafficLightPosition()` replaced by `getWindowButtonPosition()`
- `ipcRenderer.sendTo()` removed; use MessageChannel instead
- `app.runningUnderRosettaTranslation` replaced by `app.runningUnderARM64Translation`

### Background Throttling Scope
`WebContents.backgroundThrottling` set to false affects all WebContents in the BrowserWindow.

## Planned Breaking Changes (27.0)

### OS Support
macOS 10.13-10.14 support removed; requires macOS 10.15+.

### IPC Deprecations
`ipcRenderer.sendTo()` deprecated in favor of MessageChannel setup.

### Color Scheme Events
`systemPreferences` color scheme events removed; use `nativeTheme.on('updated')` instead.

### Vibrancy and Appearance APIs
Several vibrancy options removed; appearance-related methods moved to `nativeTheme` module.

### Printer and Theme Methods
- `webContents.getPrinters()` replaced by `getPrintersAsync()`
- `systemPreferences` appearance methods consolidated to `nativeTheme`

## Planned Breaking Changes (26.0)

Deprecations mirror 27.0 removals for printer and appearance APIs.

## Planned Breaking Changes (25.0)

### Protocol API Consolidation
`protocol.register*Protocol` and `protocol.intercept*Protocol` methods have been replaced with `protocol.handle`.

### Window Button Positioning
Traffic light position methods replaced by `setWindowButtonPosition()` and `getWindowButtonPosition()`.

## Planned Breaking Changes (24.0)

### Image Thumbnail API
`nativeImage.createThumbnailFromPath()` parameter renamed from `maxSize` to `size`; now scales uniformly across platforms.

## Planned Breaking Changes (23.0)

### Draggable Regions on macOS
Behavior changed; overlapping `-webkit-app-region` now respects CSS layering consistently.

### OS Support
Windows 7, 8, 8.1 support removed; requires Windows 10+.

### Event Removals
- `scroll-touch-*` events on BrowserWindow removed; use `input-event` on WebContents
- `webContents.incrementCapturerCount()` and `decrementCapturerCount()` removed
- WebContents `new-window` event removed; use `setWindowOpenHandler()`

## Planned Breaking Changes (22.0)

### Capturer Count Methods Deprecated
Methods are now automatically handled by `capturePage()`.

### New Window Event Removal
The `new-window` event replaced by `setWindowOpenHandler()`.

## Planned Breaking Changes (21.0)

### V8 Memory Cage
Memory cage enabled, affecting native modules wrapping non-V8 memory with ArrayBuffer/Buffer.

### Print to PDF API
`webContents.printToPDF()` has been modified to conform to `Page.printToPDF` in Chrome DevTools Protocol, with parameter changes.

## Planned Breaking Changes (20.0)

### OS Support
macOS 10.11-10.12 support removed; requires macOS 10.13+.

### Sandbox Default
Renderers now sandboxed by default unless `nodeIntegration: true` or `sandbox: false` specified.

### Platform Features
- `skipTaskbar` on Linux removed (no Wayland equivalent)
- `session.setDevicePermissionHandler()` now receives `origin` instead of WebFrameMain

## Planned Breaking Changes (19.0)

IA32 Linux binaries removed following Chromium 102 deprecation.

## Planned Breaking Changes (18.0)

### BrowserWindowProxy Removal
`nativeWindowOpen` now enabled by default; `window.open` no longer shimmed.

## Planned Breaking Changes (17.0)

### Desktop Capturer Security
`desktopCapturer.getSources` API is now only available in the main process for security.

## Planned Breaking Changes (16.0)

Crash reporter switched from Breakpad to Crashpad on Linux; child processes now automatically monitored.

## Planned Breaking Changes (15.0)

### Native Window Open Default
`nativeWindowOpen` is no longer experimental, and is now the default.

`app.runningUnderRosettaTranslation` replaced by `app.runningUnderARM64Translation`.

## Planned Breaking Changes (14.0)

### Remote Module Removal
`remote` module was deprecated in Electron 12, and removed in Electron 14. Use `@electron/remote` instead.

### Process Model Changes
- `app.allowRendererProcessReuse` removed
- BrowserWindow affinity option removed
- `window.open()` frameName parameter no longer sets title
- `worldSafeExecuteJavaScript` removed
- BrowserWindowConstructorOptions no longer inherit from parents
- `additionalFeatures` property removed

## Planned Breaking Changes (13.0)

### Permission Checks
`session.setPermissionCheckHandler()` handler first parameter may be null; use `requestingOrigin` instead.

### Shell and Extension APIs
- `shell.moveItemToTrash()` replaced by async `shell.trashItem()`
- BrowserWindow extension APIs removed; use session APIs instead
- `systemPreferences` methods moved to `nativeTheme` module

### New Window Event Deprecation
Replaced by `setWindowOpenHandler()`.

## Planned Breaking Changes (12.0)

### Flash and Sandbox Defaults
- Pepper Flash support removed
- `worldSafeExecuteJavaScript` defaults to true
- `contextIsolation` defaults to true
- `enableRemoteModule` defaults to false

### Crash Reporter Changes
- `getCrashesDirectory()` replaced by `app.getPath('crashDumps')`
- Renderer process methods removed (non-deprecated only in main)
- `compress` option defaults to true
- `remote` module deprecated

### Protocol APIs
Protocol registration methods now synchronous; callbacks no longer needed.

## Planned Breaking Changes (11.0)

BrowserView experimental APIs removed: `destroy()`, `fromId()`, `fromWebContents()`, `getAllViews()`, and `id` property.

## Planned Breaking Changes (10.0)

### Crash Reporter Deprecations
- `companyName` argument to `start()` deprecated (use `globalExtra`)
- `getCrashesDirectory()` deprecated
- Renderer process methods deprecated
- `compress: false` setting deprecated

### Module Default Changes
`enableRemoteModule` defaults to false.

### Protocol APIs Synchronized
`unregisterProtocol()`, `uninterceptProtocol()`, and related methods now synchronous.

## Planned Breaking Changes (9.0)

### Native Module Loading
Non-context-aware native modules in renderer disabled by default.

### Extension and Frame APIs
- BrowserWindow extension APIs deprecated (use session)
- `webview.getWebContents()` removed
- `webFrame.setLayoutZoomLevelLimits()` removed

### IPC Serialization
Sending non-JS objects over IPC now throws an exception (no longer silently converts).

### Shell API Naming
`shell.openItem` replaced by async `shell.openPath`.

## Planned Breaking Changes (8.0)

### IPC Serialization Algorithm
The algorithm used to serialize objects sent over IPC has been switched from a custom algorithm to V8's built-in Structured Clone Algorithm.

This breaks sending Functions, Promises, WeakMaps, and similar objects; `NaN`/`Infinity` now handled correctly.
