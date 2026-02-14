---
title: BrowserWindow
source_url: https://www.electronjs.org/docs/latest/api/browser-window
---

# BrowserWindow

> Create and control browser windows.

Process: [Main](/docs/latest/glossary#main-process)

This module cannot be used until the `ready` event of the `app` module is emitted.

```
// In the main process.
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

// Load a remote URL
win.loadURL('https://github.com')

// Or load a local HTML file
win.loadFile('index.html')
```

## Window customization

The `BrowserWindow` class exposes various ways to modify the look and behavior of your app's windows. For more details, see the [Window Customization](/docs/latest/tutorial/window-customization) tutorial.

## Showing the window gracefully

When loading a page in the window directly, users may see the page load incrementally, which is not a good experience for a native app. To make the window display without a visual flash, there are two solutions for different situations.

### Using the `ready-to-show` event

While loading the page, the `ready-to-show` event will be emitted when the renderer process has rendered the page for the first time if the window has not been shown yet. Showing the window after this event will have no visual flash.

### Setting the `backgroundColor` property

For a complex app, the `ready-to-show` event could be emitted too late, making the app feel slow. In this case, it is recommended to show the window immediately, and use a `backgroundColor` close to your app's background.

## Class: BrowserWindow extends `BaseWindow`

> Create and control browser windows.

Process: [Main](/docs/latest/glossary#main-process)

`BrowserWindow` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### `new BrowserWindow([options])`

*   `options` [BrowserWindowConstructorOptions](/docs/latest/api/structures/browser-window-options) (optional)
    *   `webPreferences` [WebPreferences](/docs/latest/api/structures/web-preferences) (optional) - Settings of web page's features.
        *   `devTools` boolean (optional) - Whether to enable DevTools. Default is `true`.
        *   `nodeIntegration` boolean (optional) - Whether node integration is enabled. Default is `false`.
        *   `nodeIntegrationInWorker` boolean (optional) - Whether node integration is enabled in web workers. Default is `false`.
        *   `nodeIntegrationInSubFrames` boolean (optional) - Experimental option for enabling Node.js support in sub-frames.
        *   `preload` string (optional) - Specifies a script that will be loaded before other scripts run in the page.
        *   `sandbox` boolean (optional) - If set, this will sandbox the renderer. Default is `true` since Electron 20.
        *   `session` Session (optional) - Sets the session used by the page.
        *   `partition` string (optional) - Sets the session used by the page according to the session's partition string.
        *   `zoomFactor` number (optional) - The default zoom factor of the page. Default is `1.0`.
        *   `javascript` boolean (optional) - Enables JavaScript support. Default is `true`.
        *   `webSecurity` boolean (optional) - When `false`, it will disable the same-origin policy. Default is `true`.
        *   `allowRunningInsecureContent` boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Default is `false`.
        *   `images` boolean (optional) - Enables image support. Default is `true`.
        *   `imageAnimationPolicy` string (optional) - Specifies how to run image animations. Default is `animate`.
        *   `textAreasAreResizable` boolean (optional) - Make TextArea elements resizable. Default is `true`.
        *   `webgl` boolean (optional) - Enables WebGL support. Default is `true`.
        *   `plugins` boolean (optional) - Whether plugins should be enabled. Default is `false`.
        *   `experimentalFeatures` boolean (optional) - Enables Chromium's experimental features. Default is `false`.
        *   `scrollBounce` boolean (optional) _macOS_ - Enables scroll bounce effect on macOS. Default is `false`.
        *   `enableBlinkFeatures` string (optional) - A list of feature strings separated by `,` to enable.
        *   `disableBlinkFeatures` string (optional) - A list of feature strings separated by `,` to disable.
        *   `defaultFontFamily` Object (optional) - Sets the default font for the font-family.
        *   `defaultFontSize` Integer (optional) - Defaults to `16`.
        *   `defaultMonospaceFontSize` Integer (optional) - Defaults to `13`.
        *   `minimumFontSize` Integer (optional) - Defaults to `0`.
        *   `defaultEncoding` string (optional) - Defaults to `ISO-8859-1`.
        *   `backgroundThrottling` boolean (optional) - Whether to throttle animations and timers when the page becomes background. Defaults to `true`.
        *   `offscreen` Object | boolean (optional) - Whether to enable offscreen rendering. Defaults to `false`.
        *   `contextIsolation` boolean (optional) - Whether to run Electron APIs and the specified `preload` script in a separate JavaScript context. Defaults to `true`.
        *   `webviewTag` boolean (optional) - Whether to enable the `<webview>` tag. Defaults to `false`.
        *   `additionalArguments` string[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process.
        *   `safeDialogs` boolean (optional) - Whether to enable browser style consecutive dialog protection. Default is `false`.
        *   `safeDialogsMessage` string (optional) - The message to display when consecutive dialog protection is triggered.
        *   `disableDialogs` boolean (optional) - Whether to disable dialogs completely. Default is `false`.
        *   `navigateOnDragDrop` boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. Default is `false`.
        *   `autoplayPolicy` string (optional) - Autoplay policy. Defaults to `no-user-gesture-required`.
        *   `disableHtmlFullscreenWindowResize` boolean (optional) - Whether to prevent the window from resizing when entering HTML Fullscreen. Default is `false`.
        *   `spellcheck` boolean (optional) - Whether to enable the builtin spellchecker. Default is `true`.
        *   `enableWebSQL` boolean (optional) - Whether to enable the WebSQL api. Default is `true`.
        *   `v8CacheOptions` string (optional) - Enforces the v8 code caching policy. Default policy is `code`.
        *   `enablePreferredSizeMode` boolean (optional) - Whether to enable preferred size mode. Default is `false`.
    *   `paintWhenInitiallyHidden` boolean (optional) - Whether the renderer should be active when `show` is `false`. Default is `true`.

### Instance Events

#### Event: 'page-title-updated'

Returns:

*   `event` Event
*   `title` string
*   `explicitSet` boolean

Emitted when the document changed its title.

#### Event: 'close'

Emitted when the window is going to be closed. Calling `event.preventDefault()` will cancel the close.

#### Event: 'closed'

Emitted when the window is closed.

#### Event: 'unresponsive'

Emitted when the web page becomes unresponsive.

#### Event: 'responsive'

Emitted when the unresponsive web page becomes responsive again.

#### Event: 'blur'

Emitted when the window loses focus.

#### Event: 'focus'

Emitted when the window gains focus.

#### Event: 'show'

Emitted when the window is shown.

#### Event: 'hide'

Emitted when the window is hidden.

#### Event: 'ready-to-show'

Emitted when the web page has been rendered (while not being shown) and window can be displayed without a visual flash.

#### Event: 'maximize'

Emitted when window is maximized.

#### Event: 'unmaximize'

Emitted when the window exits from a maximized state.

#### Event: 'minimize'

Emitted when the window is minimized.

#### Event: 'restore'

Emitted when the window is restored from a minimized state.

#### Event: 'will-resize' _macOS_ _Windows_

Emitted before the window is resized. Calling `event.preventDefault()` will prevent the window from being resized.

#### Event: 'resize'

Emitted after the window has been resized.

#### Event: 'resized' _macOS_ _Windows_

Emitted once when the window has finished being resized.

#### Event: 'will-move' _macOS_ _Windows_

Emitted before the window is moved.

#### Event: 'move'

Emitted when the window is being moved to a new position.

#### Event: 'moved' _macOS_ _Windows_

Emitted once when the window is moved to a new position.

#### Event: 'enter-full-screen'

Emitted when the window enters a full-screen state.

#### Event: 'leave-full-screen'

Emitted when the window leaves a full-screen state.

#### Event: 'enter-html-full-screen'

Emitted when the window enters a full-screen state triggered by HTML API.

#### Event: 'leave-html-full-screen'

Emitted when the window leaves a full-screen state triggered by HTML API.

#### Event: 'always-on-top-changed'

Emitted when the window is set or unset to show always on top of other windows.

#### Event: 'app-command' _Windows_ _Linux_

Emitted when an App Command is invoked.

#### Event: 'swipe' _macOS_

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

#### Event: 'rotate-gesture' _macOS_

Emitted on trackpad rotation gesture.

#### Event: 'sheet-begin' _macOS_

Emitted when the window opens a sheet.

#### Event: 'sheet-end' _macOS_

Emitted when the window has closed a sheet.

#### Event: 'new-window-for-tab' _macOS_

Emitted when the native new tab button is clicked.

#### Event: 'system-context-menu' _Windows_ _Linux_

Emitted when the system context menu is triggered on the window.

### Static Methods

#### `BrowserWindow.getAllWindows()`

Returns `BrowserWindow[]` - An array of all opened browser windows.

#### `BrowserWindow.getFocusedWindow()`

Returns `BrowserWindow | null` - The window that is focused in this application.

#### `BrowserWindow.fromWebContents(webContents)`

Returns `BrowserWindow | null` - The window that owns the given `webContents`.

#### `BrowserWindow.fromId(id)`

Returns `BrowserWindow | null` - The window with the given `id`.

### Instance Properties

#### `win.webContents` _Readonly_

A `WebContents` object this window owns. All web page related events and operations will be done via it.

#### `win.id` _Readonly_

A `Integer` property representing the unique ID of the window.

### Instance Methods

BrowserWindow inherits all instance methods from BaseWindow and adds:

#### `win.loadURL(url[, options])`

*   `url` string
*   `options` Object (optional)
    *   `httpReferrer` (string | Referrer) (optional) - An HTTP Referrer URL.
    *   `userAgent` string (optional) - A user agent originating the request.
    *   `extraHeaders` string (optional) - Extra headers separated by "\\n"
    *   `postData` (UploadRawData | UploadFile)[] (optional)
    *   `baseURLForDataURL` string (optional) - Base URL for files to be loaded by the data URL.

Returns `Promise<void>` - the promise will resolve when the page has finished loading.

Same as `webContents.loadURL(url[, options])`.

#### `win.loadFile(filePath[, options])`

*   `filePath` string
*   `options` Object (optional)
    *   `query` Record<string, string> (optional)
    *   `search` string (optional)
    *   `hash` string (optional)

Returns `Promise<void>` - the promise will resolve when the page has finished loading.

Same as `webContents.loadFile`.

#### `win.reload()`

Same as `webContents.reload`.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect, opts])`

*   `rect` Rectangle (optional) - The bounds to capture
*   `opts` Object (optional)
    *   `stayHidden` boolean (optional) - Keep the page hidden instead of visible. Default is `false`.
    *   `stayAwake` boolean (optional) - Keep the system awake instead of allowing it to sleep. Default is `false`.

Returns `Promise<NativeImage>` - Resolves with a NativeImage.

Captures a snapshot of the page within `rect`.

#### `win.showDefinitionForSelection()` _macOS_

Same as `webContents.showDefinitionForSelection()`.

#### `win.setBrowserView(browserView)` _Deprecated_

Attach `browserView` to `win`. The `BrowserView` class is deprecated, replaced by `WebContentsView`.

#### `win.getBrowserView()` _Deprecated_

Returns `BrowserView | null` - The `BrowserView` attached to `win`.

#### `win.addBrowserView(browserView)` _Deprecated_

Replacement API for setBrowserView supporting work with multi browser views.

#### `win.removeBrowserView(browserView)` _Deprecated_

#### `win.setTopBrowserView(browserView)` _Deprecated_

Raises `browserView` above other `BrowserView`s attached to `win`.

#### `win.getBrowserViews()` _Deprecated_

Returns `BrowserView[]` - a sorted by z-index array of all BrowserViews.