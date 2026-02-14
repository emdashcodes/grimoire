---
title: "Class: Dock"
source_url: https://www.electronjs.org/docs/latest/api/dock
---

# Class: Dock

> Control your app in the macOS dock

**Process:** Main

_This class is not exported from the `'electron'` module. It is only available as a return value of other methods in the Electron API._

## Instance Methods

### `dock.bounce([type])` _macOS_

- `type` string (optional) - Can be `critical` or `informational`. Default is `informational`

**Returns:** `Integer` - an ID representing the request

When `critical` is passed, the dock icon bounces until the application becomes active or the request is canceled. When `informational` is passed, the icon bounces for one second, but the request remains active until the application becomes active or canceled.

**Note:** This method only works while the app is not focused; it returns -1 when focused.

### `dock.cancelBounce(id)` _macOS_

- `id` Integer

Cancels the bounce animation identified by `id`.

### `dock.downloadFinished(filePath)` _macOS_

- `filePath` string

Bounces the Downloads stack if the file path is inside the Downloads folder.

### `dock.setBadge(text)` _macOS_

- `text` string

Sets the string displayed in the dock's badging area.

**Info:** The application must have notification display permissions for this to work.

### `dock.getBadge()` _macOS_

**Returns:** `string` - The badge string of the dock

### `dock.hide()` _macOS_

Hides the dock icon.

### `dock.show()` _macOS_

**Returns:** `Promise<void>` - Resolves when the dock icon is shown

### `dock.isVisible()` _macOS_

**Returns:** `boolean` - Whether the dock icon is visible

### `dock.setMenu(menu)` _macOS_

- `menu` Menu

Sets the application's dock menu.

### `dock.getMenu()` _macOS_

**Returns:** `Menu | null` - The application's dock menu

### `dock.setIcon(image)` _macOS_

- `image` (NativeImage | string)

Sets the image associated with this dock icon.
