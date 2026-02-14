---
title: Keyboard Shortcuts
source_url: https://www.electronjs.org/docs/latest/tutorial/keyboard-shortcuts
---

# Keyboard Shortcuts

## Accelerators

Accelerators are strings that can contain multiple modifiers and a single key code, combined by the `+` character, and are used to define keyboard shortcuts throughout your application.

Accelerators are case insensitive.

Examples:

- `CommandOrControl+A`
- `CommandOrControl+Shift+Z`

### Platform notice

On Linux and Windows, the `Command` key does not have any effect so use `CommandOrControl` which represents `Command` on macOS and `Control` on Linux and Windows to define some accelerators.

Use `Alt` instead of `Option`. The `Option` key only exists on macOS, whereas the `Alt` key is available on all platforms.

The `Super` (or `Meta`) key is mapped to the `Windows` key on Windows and Linux and `Cmd` on macOS.

### Available modifiers

- `Command` (or `Cmd` for short)
- `Control` (or `Ctrl` for short)
- `CommandOrControl` (or `CmdOrCtrl` for short)
- `Alt`
- `Option`
- `AltGr`
- `Shift`
- `Super`
- `Meta`

### Available key codes

- `0` to `9`
- `A` to `Z`
- `F1` to `F24`
- Punctuation like `~`, `!`, `@`, `#`, `$`, etc.
- `Plus`
- `Space`
- `Tab`
- `Capslock`
- `Numlock`
- `Scrolllock`
- `Backspace`
- `Delete`
- `Insert`
- `Return` (or `Enter` as alias)
- `Up`, `Down`, `Left` and `Right`
- `Home` and `End`
- `PageUp` and `PageDown`
- `Escape` (or `Esc` for short)
- `VolumeUp`, `VolumeDown` and `VolumeMute`
- `MediaNextTrack`, `MediaPreviousTrack`, `MediaStop` and `MediaPlayPause`
- `PrintScreen`
- NumPad Keys
  - `num0` - `num9`
  - `numdec` - decimal key
  - `numadd` - numpad `+` key
  - `numsub` - numpad `-` key
  - `nummult` - numpad `*` key
  - `numdiv` - numpad `/` key

## Local Shortcuts

You can use the [Menu](/docs/latest/api/menu) module to configure keyboard shortcuts that will only be triggered when the app is focused. To do so, specify an [`accelerator`](/docs/latest/api/accelerator) property when creating a [MenuItem](/docs/latest/api/menu-item).

```javascript
const { Menu, MenuItem } = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
  label: 'Electron',
  submenu: [{
    role: 'help',
    accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
    click: () => { console.log('Electron rocks!') }
  }]
}))

Menu.setApplicationMenu(menu)
```

> **Note:** In the code above, you can see that the accelerator differs based on the user's operating system. For MacOS, it is `Alt+Cmd+I`, whereas for Linux and Windows, it is `Alt+Shift+I`.

You can also configure different key combinations based on the operating system.

## Global Shortcuts

You can use the [globalShortcut](/docs/latest/api/global-shortcut) module to detect keyboard events even when the application does not have keyboard focus.

```javascript
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('Alt+CommandOrControl+I', () => {
    console.log('Electron loves global shortcuts!')
  })
}).then(createWindow)
```

## Shortcuts Within a BrowserWindow

### Using web APIs

If you want to handle keyboard shortcuts within a [BrowserWindow](/docs/latest/api/browser-window), you can listen for the `keyup` and `keydown` DOM events inside the renderer process using the `addEventListener()` API.

```javascript
function handleKeyPress (event) {
  // You can put code here to handle the keypress.
  document.getElementById('last-keypress').innerText = event.key
  console.log(`You pressed ${event.key}`)
}

window.addEventListener('keyup', handleKeyPress, true)
```

> Note the third parameter `true` indicates that the listener will always receive key presses before other listeners so they can't have `stopPropagation()` called on them.

### Intercepting events in the main process

The [`before-input-event`](/docs/latest/api/web-contents#event-before-input-event) event is emitted before dispatching `keydown` and `keyup` events in the page. It can be used to catch and handle custom shortcuts that are not visible in the menu.

```javascript
const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600 })

  win.loadFile('index.html')
  win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLowerCase() === 'i') {
      console.log('Pressed Control+I')
      event.preventDefault()
    }
  })
})
```
