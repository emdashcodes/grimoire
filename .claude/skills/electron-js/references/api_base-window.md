---
title: BaseWindow
source_url: https://www.electronjs.org/docs/latest/api/base-window
---

# BaseWindow

> Create and control windows.

Process: [Main](/docs/latest/glossary#main-process)

note

`BaseWindow` provides a flexible way to compose multiple web views in a single window. For windows with only a single, full-size web view, the [`BrowserWindow`](/docs/latest/api/browser-window) class may be a simpler option.

This module cannot be used until the `ready` event of the `app` module is emitted.

```
// In the main process.
const { BaseWindow, WebContentsView } = require('electron')

const win = new BaseWindow({ width: 800, height: 600 })

const leftView = new WebContentsView()
leftView.webContents.loadURL('https://electronjs.org')
win.contentView.addChildView(leftView)

const rightView = new WebContentsView()
rightView.webContents.loadURL('https://github.com/electron/electron')
win.contentView.addChildView(rightView)

leftView.setBounds({ x: 0, y: 0, width: 400, height: 600 })
rightView.setBounds({ x: 400, y: 0, width: 400, height: 600 })
```

## Parent and child windows

By using `parent` option, you can create child windows:

```
const { BaseWindow } = require('electron')
const parent = new BaseWindow()
const child = new BaseWindow({ parent })
```

The `child` window will always show on top of the `parent` window.

## Modal windows

A modal window is a child window that disables parent window. To create a modal window, you have to set both the `parent` and `modal` options:

```
const { BaseWindow } = require('electron')
const parent = new BaseWindow()
const child = new BaseWindow({ parent, modal: true })
```

## Platform notices

*   On macOS modal windows will be displayed as sheets attached to the parent window.
*   On macOS the child windows will keep the relative position to parent window when parent window moves, while on Windows and Linux child windows will not move.
*   On Linux the type of modal windows will be changed to `dialog`.
*   On Linux many desktop environments do not support hiding a modal window.

## Resource management

When you add a [`WebContentsView`](/docs/latest/api/web-contents-view) to a `BaseWindow` and the `BaseWindow` is closed, the [`webContents`](/docs/latest/api/web-contents) of the `WebContentsView` are not destroyed automatically.

It is your responsibility to close the `webContents` when you no longer need them, e.g. when the `BaseWindow` is closed.

## Class: BaseWindow

> Create and control windows.

Process: [Main](/docs/latest/glossary#main-process)

`BaseWindow` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

It creates a new `BaseWindow` with native properties as set by the `options`.

### `new BaseWindow([options])`

*   `options` [BaseWindowConstructorOptions](/docs/latest/api/structures/base-window-options) (optional)
    *   `width` Integer (optional) - Window's width in pixels. Default is `800`.
    *   `height` Integer (optional) - Window's height in pixels. Default is `600`.
    *   `x` Integer (optional) - (**required** if y is used) Window's left offset from screen. Default is to center the window.
    *   `y` Integer (optional) - (**required** if x is used) Window's top offset from screen. Default is to center the window.
    *   `useContentSize` boolean (optional) - The `width` and `height` would be used as web page's size, which means the actual window's size will include window frame's size and be slightly larger. Default is `false`.
    *   `center` boolean (optional) - Show window in the center of the screen. Default is `false`.
    *   `minWidth` Integer (optional) - Window's minimum width. Default is `0`.
    *   `minHeight` Integer (optional) - Window's minimum height. Default is `0`.
    *   `maxWidth` Integer (optional) - Window's maximum width. Default is no limit.
    *   `maxHeight` Integer (optional) - Window's maximum height. Default is no limit.
    *   `resizable` boolean (optional) - Whether window is resizable. Default is `true`.
    *   `movable` boolean (optional) _macOS_ _Windows_ - Whether window is movable. Default is `true`.
    *   `minimizable` boolean (optional) _macOS_ _Windows_ - Whether window is minimizable. Default is `true`.
    *   `maximizable` boolean (optional) _macOS_ _Windows_ - Whether window is maximizable. Default is `true`.
    *   `closable` boolean (optional) _macOS_ _Windows_ - Whether window is closable. Default is `true`.
    *   `focusable` boolean (optional) - Whether the window can be focused. Default is `true`.
    *   `alwaysOnTop` boolean (optional) - Whether the window should always stay on top of other windows. Default is `false`.
    *   `fullscreen` boolean (optional) - Whether the window should show in fullscreen. Default is `false`.
    *   `fullscreenable` boolean (optional) - Whether the window can be put into fullscreen mode. Default is `true`.
    *   `simpleFullscreen` boolean (optional) _macOS_ - Use pre-Lion fullscreen on macOS. Default is `false`.
    *   `skipTaskbar` boolean (optional) _macOS_ _Windows_ - Whether to show the window in taskbar. Default is `false`.
    *   `hiddenInMissionControl` boolean (optional) _macOS_ - Whether window should be hidden when the user toggles into mission control.
    *   `kiosk` boolean (optional) - Whether the window is in kiosk mode. Default is `false`.
    *   `title` string (optional) - Default window title. Default is `"Electron"`.
    *   `icon` (NativeImage | string) (optional) - The window icon.
    *   `show` boolean (optional) - Whether window should be shown when created. Default is `true`.
    *   `frame` boolean (optional) - Specify `false` to create a frameless window. Default is `true`.
    *   `parent` BaseWindow (optional) - Specify parent window. Default is `null`.
    *   `modal` boolean (optional) - Whether this is a modal window. Default is `false`.
    *   `acceptFirstMouse` boolean (optional) _macOS_ - Whether clicking an inactive window will also click through to the web contents. Default is `false`.
    *   `disableAutoHideCursor` boolean (optional) - Whether to hide cursor when typing. Default is `false`.
    *   `autoHideMenuBar` boolean (optional) _Linux_ _Windows_ - Auto hide the menu bar unless the `Alt` key is pressed. Default is `false`.
    *   `enableLargerThanScreen` boolean (optional) _macOS_ - Enable the window to be resized larger than screen. Default is `false`.
    *   `backgroundColor` string (optional) - The window's background color. Default is `#FFF` (white).
    *   `hasShadow` boolean (optional) - Whether window should have a shadow. Default is `true`.
    *   `opacity` number (optional) _macOS_ _Windows_ - Set the initial opacity of the window, between 0.0 and 1.0.
    *   `darkTheme` boolean (optional) - Forces using dark theme for the window. Default is `false`.
    *   `transparent` boolean (optional) - Makes the window transparent. Default is `false`.
    *   `type` string (optional) - The type of window, default is normal window.
    *   `visualEffectState` string (optional) _macOS_ - Specify how the material appearance should reflect window activity state on macOS.
    *   `titleBarStyle` string (optional) - The style of window title bar. Default is `default`. Possible values are: `default`, `hidden`, `hiddenInset`, `customButtonsOnHover`.
    *   `titleBarOverlay` Object | Boolean (optional) - Enables the Window Controls Overlay.
    *   `trafficLightPosition` Point (optional) _macOS_ - Set a custom position for the traffic light buttons in frameless windows.
    *   `roundedCorners` boolean (optional) _macOS_ _Windows_ - Whether frameless window should have rounded corners. Default is `true`.
    *   `vibrancy` string (optional) _macOS_ - Add a type of vibrancy effect to the window.
    *   `backgroundMaterial` string (optional) _Windows_ - Set the window's system-drawn background material.
    *   `zoomToPageWidth` boolean (optional) _macOS_ - Controls the behavior on macOS when option-clicking the green stoplight button. Default is `false`.
    *   `tabbingIdentifier` string (optional) _macOS_ - Tab group name.

### Instance Events

#### Event: 'close'

Returns:

*   `event` Event

Emitted when the window is going to be closed. Calling `event.preventDefault()` will cancel the close.

#### Event: 'closed'

Emitted when the window is closed.

#### Event: 'query-session-end' _Windows_

Emitted when a session is about to end due to a shutdown, machine restart, or user log-off.

#### Event: 'session-end' _Windows_

Emitted when a session is about to end. Once this event fires, there is no way to prevent the session from ending.

#### Event: 'blur'

Emitted when the window loses focus.

#### Event: 'focus'

Emitted when the window gains focus.

#### Event: 'show'

Emitted when the window is shown.

#### Event: 'hide'

Emitted when the window is hidden.

#### Event: 'maximize'

Emitted when window is maximized.

#### Event: 'unmaximize'

Emitted when the window exits from a maximized state.

#### Event: 'minimize'

Emitted when the window is minimized.

#### Event: 'restore'

Emitted when the window is restored from a minimized state.

#### Event: 'will-resize' _macOS_ _Windows_

Returns:

*   `event` Event
*   `newBounds` Rectangle - Size the window is being resized to.
*   `details` Object
    *   `edge` (string) - The edge of the window being dragged for resizing.

Emitted before the window is resized. Calling `event.preventDefault()` will prevent the window from being resized.

#### Event: 'resize'

Emitted after the window has been resized.

#### Event: 'resized' _macOS_ _Windows_

Emitted once when the window has finished being resized.

#### Event: 'will-move' _macOS_ _Windows_

Returns:

*   `event` Event
*   `newBounds` Rectangle - Location the window is being moved to.

Emitted before the window is moved. On Windows, calling `event.preventDefault()` will prevent the window from being moved.

#### Event: 'move'

Emitted when the window is being moved to a new position.

#### Event: 'moved' _macOS_ _Windows_

Emitted once when the window is moved to a new position.

#### Event: 'enter-full-screen'

Emitted when the window enters a full-screen state.

#### Event: 'leave-full-screen'

Emitted when the window leaves a full-screen state.

#### Event: 'always-on-top-changed'

Returns:

*   `event` Event
*   `isAlwaysOnTop` boolean

Emitted when the window is set or unset to show always on top of other windows.

#### Event: 'app-command' _Windows_ _Linux_

Returns:

*   `event` Event
*   `command` string

Emitted when an App Command is invoked.

#### Event: 'swipe' _macOS_

Returns:

*   `event` Event
*   `direction` string

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

#### Event: 'rotate-gesture' _macOS_

Returns:

*   `event` Event
*   `rotation` Float

Emitted on trackpad rotation gesture.

#### Event: 'sheet-begin' _macOS_

Emitted when the window opens a sheet.

#### Event: 'sheet-end' _macOS_

Emitted when the window has closed a sheet.

#### Event: 'new-window-for-tab' _macOS_

Emitted when the native new tab button is clicked.

#### Event: 'system-context-menu' _Windows_ _Linux_

Returns:

*   `event` Event
*   `point` Point - The screen coordinates where the context menu was triggered.

Emitted when the system context menu is triggered on the window.

### Static Methods

#### `BaseWindow.getAllWindows()`

Returns `BaseWindow[]` - An array of all opened browser windows.

#### `BaseWindow.getFocusedWindow()`

Returns `BaseWindow | null` - The window that is focused in this application, otherwise returns `null`.

#### `BaseWindow.fromId(id)`

*   `id` Integer

Returns `BaseWindow | null` - The window with the given `id`.

### Instance Properties

#### `win.id` _Readonly_

A `Integer` property representing the unique ID of the window.

#### `win.contentView`

A `View` property for the content view of the window.

#### `win.tabbingIdentifier` _macOS_ _Readonly_

A `string` (optional) property that is equal to the `tabbingIdentifier` passed to the constructor.

#### `win.autoHideMenuBar` _Linux_ _Windows_

A `boolean` property that determines whether the window menu bar should hide itself automatically.

#### `win.simpleFullScreen`

A `boolean` property that determines whether the window is in simple (pre-Lion) fullscreen mode.

#### `win.fullScreen`

A `boolean` property that determines whether the window is in fullscreen mode.

#### `win.focusable` _Windows_ _macOS_

A `boolean` property that determines whether the window is focusable.

#### `win.visibleOnAllWorkspaces` _macOS_ _Linux_

A `boolean` property that determines whether the window is visible on all workspaces.

#### `win.shadow`

A `boolean` property that determines whether the window has a shadow.

#### `win.menuBarVisible` _Windows_ _Linux_

A `boolean` property that determines whether the menu bar should be visible.

#### `win.kiosk`

A `boolean` property that determines whether the window is in kiosk mode.

#### `win.documentEdited` _macOS_

A `boolean` property that specifies whether the window's document has been edited.

#### `win.representedFilename` _macOS_

A `string` property that determines the pathname of the file the window represents.

#### `win.title`

A `string` property that determines the title of the native window.

#### `win.minimizable` _macOS_ _Windows_

A `boolean` property that determines whether the window can be manually minimized by user.

#### `win.maximizable` _macOS_ _Windows_

A `boolean` property that determines whether the window can be manually maximized by user.

#### `win.fullScreenable`

A `boolean` property that determines whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.resizable`

A `boolean` property that determines whether the window can be manually resized by user.

#### `win.closable` _macOS_ _Windows_

A `boolean` property that determines whether the window can be manually closed by user.

#### `win.movable` _macOS_ _Windows_

A `boolean` property that determines Whether the window can be moved by user.

#### `win.excludedFromShownWindowsMenu` _macOS_

A `boolean` property that determines whether the window is excluded from the application's Windows menu.

#### `win.accessibleTitle`

A `string` property that defines an alternative title provided only to accessibility tools such as screen readers.

#### `win.snapped` _Windows_ _Readonly_

A `boolean` property that indicates whether the window is arranged via Snap.

### Instance Methods

#### `win.setContentView(view)`

Sets the content view of the window.

#### `win.getContentView()`

Returns `View` - The content view of the window.

#### `win.destroy()`

Force closing the window.

#### `win.close()`

Try to close the window.

#### `win.focus()`

Focuses on the window.

#### `win.blur()`

Removes focus from the window.

#### `win.isFocused()`

Returns `boolean` - Whether the window is focused.

#### `win.isDestroyed()`

Returns `boolean` - Whether the window is destroyed.

#### `win.show()`

Shows and gives focus to the window.

#### `win.showInactive()`

Shows the window but doesn't focus on it.

#### `win.hide()`

Hides the window.

#### `win.isVisible()`

Returns `boolean` - Whether the window is visible to the user.

#### `win.isModal()`

Returns `boolean` - Whether current window is a modal window.

#### `win.maximize()`

Maximizes the window.

#### `win.unmaximize()`

Unmaximizes the window.

#### `win.isMaximized()`

Returns `boolean` - Whether the window is maximized.

#### `win.minimize()`

Minimizes the window.

#### `win.restore()`

Restores the window from minimized state to its previous state.

#### `win.isMinimized()`

Returns `boolean` - Whether the window is minimized.

#### `win.setFullScreen(flag)`

*   `flag` boolean

Sets whether the window should be in fullscreen mode.

#### `win.isFullScreen()`

Returns `boolean` - Whether the window is in fullscreen mode.

#### `win.setSimpleFullScreen(flag)` _macOS_

*   `flag` boolean

Enters or leaves simple fullscreen mode.

#### `win.isSimpleFullScreen()` _macOS_

Returns `boolean` - Whether the window is in simple (pre-Lion) fullscreen mode.

#### `win.isNormal()`

Returns `boolean` - Whether the window is in normal state (not maximized, not minimized, not in fullscreen mode).

#### `win.setAspectRatio(aspectRatio[, extraSize])`

*   `aspectRatio` Float - The aspect ratio to maintain for some portion of the content view.
*   `extraSize` Size (optional) _macOS_ - The extra size not to be included while maintaining the aspect ratio.

This will make a window maintain an aspect ratio.

#### `win.setBackgroundColor(backgroundColor)`

*   `backgroundColor` string - Color in Hex, RGB, RGBA, HSL, HSLA or named CSS color format.

Sets the background color of the window.

#### `win.previewFile(path[, displayName])` _macOS_

Uses Quick Look to preview a file at a given path.

#### `win.closeFilePreview()` _macOS_

Closes the currently open Quick Look panel.

#### `win.setBounds(bounds[, animate])`

*   `bounds` Partial<Rectangle>
*   `animate` boolean (optional) _macOS_

Resizes and moves the window to the supplied bounds.

#### `win.getBounds()`

Returns `Rectangle` - The bounds of the window as Object.

#### `win.getBackgroundColor()`

Returns `string` - Gets the background color of the window in Hex (`#RRGGBB`) format.

#### `win.setContentBounds(bounds[, animate])`

Resizes and moves the window's client area to the supplied bounds.

#### `win.getContentBounds()`

Returns `Rectangle` - The bounds of the window's client area as Object.

#### `win.getNormalBounds()`

Returns `Rectangle` - Contains the window bounds of the normal state.

#### `win.setEnabled(enable)`

*   `enable` boolean

Disable or enable the window.

#### `win.isEnabled()`

Returns `boolean` - whether the window is enabled.

#### `win.setSize(width, height[, animate])`

Resizes the window to `width` and `height`.

#### `win.getSize()`

Returns `Integer[]` - Contains the window's width and height.

#### `win.setContentSize(width, height[, animate])`

Resizes the window's client area to `width` and `height`.

#### `win.getContentSize()`

Returns `Integer[]` - Contains the window's client area's width and height.

#### `win.setMinimumSize(width, height)`

Sets the minimum size of window to `width` and `height`.

#### `win.getMinimumSize()`

Returns `Integer[]` - Contains the window's minimum width and height.

#### `win.setMaximumSize(width, height)`

Sets the maximum size of window to `width` and `height`.

#### `win.getMaximumSize()`

Returns `Integer[]` - Contains the window's maximum width and height.

#### `win.setResizable(resizable)`

Sets whether the window can be manually resized by the user.

#### `win.isResizable()`

Returns `boolean` - Whether the window can be manually resized by the user.

#### `win.setMovable(movable)` _macOS_ _Windows_

Sets whether the window can be moved by user.

#### `win.isMovable()` _macOS_ _Windows_

Returns `boolean` - Whether the window can be moved by user.

#### `win.setMinimizable(minimizable)` _macOS_ _Windows_

Sets whether the window can be manually minimized by user.

#### `win.isMinimizable()` _macOS_ _Windows_

Returns `boolean` - Whether the window can be manually minimized by the user.

#### `win.setMaximizable(maximizable)` _macOS_ _Windows_

Sets whether the window can be manually maximized by user.

#### `win.isMaximizable()` _macOS_ _Windows_

Returns `boolean` - Whether the window can be manually maximized by user.

#### `win.setFullScreenable(fullscreenable)`

Sets whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.isFullScreenable()`

Returns `boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.setClosable(closable)` _macOS_ _Windows_

Sets whether the window can be manually closed by user.

#### `win.isClosable()` _macOS_ _Windows_

Returns `boolean` - Whether the window can be manually closed by user.

#### `win.setHiddenInMissionControl(hidden)` _macOS_

Sets whether the window will be hidden when the user toggles into mission control.

#### `win.isHiddenInMissionControl()` _macOS_

Returns `boolean` - Whether the window will be hidden when the user toggles into mission control.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

*   `flag` boolean
*   `level` string (optional) _macOS_ _Windows_ - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and `dock`.
*   `relativeLevel` Integer (optional) _macOS_

Sets whether the window should show always on top of other windows.

#### `win.isAlwaysOnTop()`

Returns `boolean` - Whether the window is always on top of other windows.

#### `win.moveAbove(mediaSourceId)`

Moves window above the source window in the sense of z-order.

#### `win.moveTop()`

Moves window to top(z-order) regardless of focus.

#### `win.center()`

Moves window to the center of the screen.

#### `win.setPosition(x, y[, animate])`

Moves window to `x` and `y`.

#### `win.getPosition()`

Returns `Integer[]` - Contains the window's current position.

#### `win.setTitle(title)`

Changes the title of native window to `title`.

#### `win.getTitle()`

Returns `string` - The title of the native window.

#### `win.setSheetOffset(offsetY[, offsetX])` _macOS_

Changes the attachment point for sheets on macOS.

#### `win.flashFrame(flag)`

*   `flag` boolean

Starts or stops flashing the window to attract user's attention.

#### `win.setSkipTaskbar(skip)` _macOS_ _Windows_

Makes the window not show in the taskbar.

#### `win.setKiosk(flag)`

Enters or leaves kiosk mode.

#### `win.isKiosk()`

Returns `boolean` - Whether the window is in kiosk mode.

#### `win.isTabletMode()` _Windows_

Returns `boolean` - Whether the window is in Windows 10 tablet mode.

#### `win.getMediaSourceId()`

Returns `string` - Window id in the format of DesktopCapturerSource's id.

#### `win.getNativeWindowHandle()`

Returns `Buffer` - The platform-specific handle of the window.

#### `win.hookWindowMessage(message, callback)` _Windows_

Hooks a windows message.

#### `win.isWindowMessageHooked(message)` _Windows_

Returns `boolean` - Whether the message is hooked.

#### `win.unhookWindowMessage(message)` _Windows_

Unhook the window message.

#### `win.unhookAllWindowMessages()` _Windows_

Unhooks all of the window messages.

#### `win.setRepresentedFilename(filename)` _macOS_

Sets the pathname of the file the window represents.

#### `win.getRepresentedFilename()` _macOS_

Returns `string` - The pathname of the file the window represents.

#### `win.setDocumentEdited(edited)` _macOS_

Specifies whether the window's document has been edited.

#### `win.isDocumentEdited()` _macOS_

Returns `boolean` - Whether the window's document has been edited.

#### `win.setMenu(menu)` _Linux_ _Windows_

Sets the `menu` as the window's menu bar.

#### `win.removeMenu()` _Linux_ _Windows_

Remove the window's menu bar.

#### `win.setProgressBar(progress[, options])`

Sets progress value in progress bar. Valid range is [0, 1.0].

#### `win.setOverlayIcon(overlay, description)` _Windows_

Sets a 16 x 16 pixel overlay onto the current taskbar icon.

#### `win.invalidateShadow()` _macOS_

Invalidates the window shadow so that it is recomputed based on the current window shape.

#### `win.setHasShadow(hasShadow)`

Sets whether the window should have a shadow.

#### `win.hasShadow()`

Returns `boolean` - Whether the window has a shadow.

#### `win.setOpacity(opacity)` _Windows_ _macOS_

*   `opacity` number - between 0.0 (fully transparent) and 1.0 (fully opaque)

Sets the opacity of the window.

#### `win.getOpacity()`

Returns `number` - between 0.0 and 1.0.

#### `win.setShape(rects)` _Windows_ _Linux_ _Experimental_

Sets a shape on the window.

#### `win.setThumbarButtons(buttons)` _Windows_

Add a thumbnail toolbar with a specified set of buttons.

#### `win.setThumbnailClip(region)` _Windows_

Sets the region of the window to show as the thumbnail image.

#### `win.setThumbnailToolTip(toolTip)` _Windows_

Sets the toolTip that is displayed when hovering over the window thumbnail in the taskbar.

#### `win.setAppDetails(options)` _Windows_

Sets the properties for the window's taskbar button.

#### `win.setAccentColor(accentColor)` _Windows_

Sets the system accent color and highlighting of active window border.

#### `win.getAccentColor()` _Windows_

Returns `string | boolean` - the system accent color.

#### `win.setIcon(icon)` _Windows_ _Linux_

Changes window icon.

#### `win.setWindowButtonVisibility(visible)` _macOS_

Sets whether the window traffic light buttons should be visible.

#### `win.setAutoHideMenuBar(hide)` _Windows_ _Linux_

Sets whether the window menu bar should hide itself automatically.

#### `win.isMenuBarAutoHide()` _Windows_ _Linux_

Returns `boolean` - Whether menu bar automatically hides itself.

#### `win.setMenuBarVisibility(visible)` _Windows_ _Linux_

Sets whether the menu bar should be visible.

#### `win.isMenuBarVisible()` _Windows_ _Linux_

Returns `boolean` - Whether the menu bar is visible.

#### `win.isSnapped()` _Windows_

Returns `boolean` - whether the window is arranged via Snap.

#### `win.setVisibleOnAllWorkspaces(visible[, options])` _macOS_ _Linux_

Sets whether the window should be visible on all workspaces.

#### `win.isVisibleOnAllWorkspaces()` _macOS_ _Linux_

Returns `boolean` - Whether the window is visible on all workspaces.

#### `win.setIgnoreMouseEvents(ignore[, options])`

Makes the window ignore all mouse events.

#### `win.setContentProtection(enable)` _macOS_ _Windows_

Prevents the window contents from being captured by other apps.

#### `win.isContentProtected()` _macOS_ _Windows_

Returns `boolean` - whether or not content protection is currently enabled.

#### `win.setFocusable(focusable)` _macOS_ _Windows_

Changes whether the window can be focused.

#### `win.isFocusable()` _macOS_ _Windows_

Returns `boolean` - Whether the window can be focused.

#### `win.setParentWindow(parent)`

Sets `parent` as current window's parent window.

#### `win.getParentWindow()`

Returns `BaseWindow | null` - The parent window or `null` if there is no parent.

#### `win.getChildWindows()`

Returns `BaseWindow[]` - All child windows.

#### `win.setAutoHideCursor(autoHide)` _macOS_

Controls whether to hide cursor when typing.

#### `win.selectPreviousTab()` _macOS_

Selects the previous tab when native tabs are enabled.

#### `win.selectNextTab()` _macOS_

Selects the next tab when native tabs are enabled.

#### `win.showAllTabs()` _macOS_

Shows or hides the tab overview when native tabs are enabled.

#### `win.mergeAllWindows()` _macOS_

Merges all windows into one window with multiple tabs.

#### `win.moveTabToNewWindow()` _macOS_

Moves the current tab into a new window.

#### `win.toggleTabBar()` _macOS_

Toggles the visibility of the tab bar.

#### `win.addTabbedWindow(baseWindow)` _macOS_

Adds a window as a tab on this window.

#### `win.setVibrancy(type)` _macOS_

Adds a vibrancy effect to the window. Passing `null` or an empty string will remove the vibrancy effect.

#### `win.setBackgroundMaterial(material)` _Windows_

Sets the browser window's system-drawn background material. Values: `auto`, `none`, `mica`, `acrylic`, `tabbed`.

#### `win.setWindowButtonPosition(position)` _macOS_

Set a custom position for the traffic light buttons in frameless window.

#### `win.getWindowButtonPosition()` _macOS_

Returns `Point | null` - The custom position for the traffic light buttons.

#### `win.setTouchBar(touchBar)` _macOS_

Sets the touchBar layout for the current window.

#### `win.setTitleBarOverlay(options)` _Windows_ _Linux_

Updates the style of the title bar overlay.