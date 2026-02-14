---
title: globalShortcut
source_url: https://www.electronjs.org/docs/latest/api/global-shortcut
---

# globalShortcut

> Detect keyboard events when the application does not have keyboard focus.

**Process:** Main

The `globalShortcut` module enables registration and unregistration of global keyboard shortcuts with the operating system, allowing customization of operations for various shortcuts.

## Important Notes

- Shortcuts are global and function even when the app lacks keyboard focus
- Cannot be used before the app module's `ready` event is emitted
- Chromium's `GlobalShortcutsPortal` implementation is available for Wayland sessions

## Example Usage

```javascript
const { app, globalShortcut } = require('electron')

app.commandLine.appendSwitch('enable-features', 'GlobalShortcutsPortal')

app.whenReady().then(() => {
  const ret = globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
  if (!ret) {
    console.log('registration failed')
  }
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})

app.on('will-quit', () => {
  globalShortcut.unregister('CommandOrControl+X')
  globalShortcut.unregisterAll()
})
```

## Methods

### `globalShortcut.register(accelerator, callback)`

- `accelerator` string - An accelerator shortcut
- `callback` Function - Called when the shortcut is pressed

**Returns:** `boolean` - Success status

Registers a global shortcut. Silent failure occurs if the accelerator is already claimed by another application.

**macOS 10.14+ Restrictions:** These shortcuts require trusted accessibility client authorization:
- "Media Play/Pause"
- "Media Next Track"
- "Media Previous Track"
- "Media Stop"

### `globalShortcut.registerAll(accelerators, callback)`

- `accelerators` string[] - Array of accelerator shortcuts
- `callback` Function - Called when any registered shortcut is pressed

Registers multiple global shortcuts simultaneously. Same OS restrictions apply.

### `globalShortcut.isRegistered(accelerator)`

- `accelerator` string - An accelerator shortcut

**Returns:** `boolean` - Whether this app has registered the accelerator

Returns false if the accelerator is claimed by other applications.

### `globalShortcut.unregister(accelerator)`

- `accelerator` string - An accelerator shortcut

Unregisters a specific global shortcut.

### `globalShortcut.unregisterAll()`

Unregisters all global shortcuts at once.
