---
title: Window Customization
source_url: https://www.electronjs.org/docs/latest/tutorial/window-customization
---

# Window Customization

The `BrowserWindow` module is the foundation of your Electron application, and it exposes many APIs that can change the look and behavior of your app's windows. In this tutorial, we will be going over the various use-cases for window customization on macOS, Windows, and Linux.

> **Note:** `BrowserWindow` is a subclass of the `BaseWindow` module. Both modules allow you to create and manage application windows in Electron, with the main difference being that `BrowserWindow` supports a single, full size web view while `BaseWindow` supports composing many web views.

## Custom title bar

Application windows have a default chrome applied by the OS. Not to be confused with the Google Chrome browser, window chrome refers to the parts of the window (e.g. title bar, toolbars, controls) that are not a part of the main web content. While the default title bar provided by the OS works well for simple use cases, many applications opt to remove it. Implementing a custom title bar can help your application feel more modern and consistent across platforms.

There are several ways to implement a custom title bar in Electron. For details, see the [Custom Title Bar](/docs/latest/tutorial/custom-title-bar) tutorial.

## Custom window interactions

### Draggable regions

Normally, you click and drag on the OS-provided title bar to move the window. For applications without a default title bar, Electron exposes the `app-region` CSS property to define draggable regions.

Setting `app-region: drag` on a rectangular area marks it as draggable. You can use `app-region: no-drag` on elements within a draggable region to exclude them from being draggable.

Note that only rectangular areas are currently supported for draggable regions.

To make the whole window draggable, you can add `app-region: drag` as `body`'s style:

```css
body {
  -webkit-app-region: drag;
  app-region: drag;
}
```

And note that if you have made the whole window draggable, you must also mark buttons as non-draggable, otherwise it would be impossible for users to click on them:

```css
button {
  -webkit-app-region: no-drag;
  app-region: no-drag;
}
```

If you're only setting a custom title bar as draggable, you also need to make all buttons in the title bar non-draggable.

> **Tip:** For some platforms, the draggable area will be treated as a non-client frame, and when you right-click on it, a system menu will pop up. To make the context menu behave correctly on all platforms, you should never use a custom context menu on draggable areas.

### Text selection

In a draggable region, the dragging behavior will conflict with text selection. For example, when you drag the title bar, you may accidentally select its text. To prevent this, you need to disable text selection within a draggable area like this:

```css
.titlebar {
  -webkit-user-select: none;
  user-select: none;
  -webkit-app-region: drag;
  app-region: drag;
}
```

### Transparent windows

By setting the `transparent` option to `true`, you can make a frameless window transparent:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ transparent: true, frame: false })
```

### Limitations

- You can not click through the transparent area. We are going to introduce an API to set window shape to solve this, see our issue for details.
- Transparent windows are not resizable. Setting `resizable` to `true` may make a transparent window stop working on some platforms.
- The CSS `blur()` filter only applies to the window's web contents, so there is no way to apply blur effect to the content below the window (i.e. other applications open on the user's system).
- The window will not be transparent when DevTools is opened.
- On Windows:
  - Transparent windows will not work when DWM is disabled.
  - Transparent windows can not be maximized using the Windows system menu or by double clicking the title bar. The reasoning behind this can be seen on this pull request.
- On macOS:
  - The native window shadow will not be shown on a transparent window.

## Custom window styles

### Frameless windows

A frameless window is a window that has no chrome. Not to be confused with the Google Chrome browser, window chrome refers to the parts of the window (e.g. title bar, toolbars, controls) that are not a part of the main web content.

To create a frameless window, set `frame` to `false` in `BrowserWindow`'s options:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ frame: false })
```

### Window Controls Overlay

On macOS, you can have a frameless window while still having access to the native traffic light window controls by setting the `titleBarStyle` option to `hidden`:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ titleBarStyle: 'hidden' })
```

The Window Controls Overlay API is a web standard that gives web apps the ability to customize the title bar region when installed as a desktop app. Electron exposes this API through the `BrowserWindow` constructor option `titleBarOverlay`.

This option only takes effect when a custom `titleBarStyle` is applied on a `BrowserWindow`. When `titleBarOverlay` is enabled, the window controls become exposed in their default position, and DOM elements can no longer use the area underneath.

The `titleBarOverlay` option accepts several sub-options:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  titleBarStyle: 'hidden',
  titleBarOverlay: {
    color: '#2f3241',
    symbolColor: '#74b1be',
    height: 60
  }
})
```

> **Note:** Once your title bar style is configured, there are CSS environment variables available for you to position your content: `titlebar-area-x`, `titlebar-area-y`, `titlebar-area-width`, and `titlebar-area-height`.
