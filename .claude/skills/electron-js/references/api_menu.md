---
title: Menu
source_url: https://www.electronjs.org/docs/latest/api/menu
---

# Class: Menu

> Create native application menus and context menus.

**Process:** Main

## Static Methods

### `Menu.setApplicationMenu(menu)`

- `menu` Menu | null

Sets `menu` as the application menu on macOS. On Windows and Linux, the `menu` will be set as each window's top menu.

Also on Windows and Linux, you can use a `&` in the top-level item name to indicate which letter should get a generated accelerator. For example, using `&File` for the file menu would result in a generated `Alt-F` accelerator that opens the associated menu. The indicated character in the button label then gets an underline, and the `&` character is not displayed on the button label.

In order to escape the `&` character in an item name, add a proceeding `&`. For example, `&&File` would result in `&File` displayed on the button label.

Passing `null` will suppress the default menu. On Windows and Linux, this has the additional effect of removing the menu bar from the window.

**Note:** The default menu will be created automatically if the app does not set one. It contains standard items such as `File`, `Edit`, `View`, `Window` and `Help`.

### `Menu.getApplicationMenu()`

**Returns:** `Menu | null` - The application menu, if set, or `null`, if not set.

**Note:** The returned `Menu` instance doesn't support dynamic addition or removal of menu items. Instance properties can still be dynamically modified.

### `Menu.buildFromTemplate(template)`

- `template` (MenuItemConstructorOptions | MenuItem)[]

**Returns:** `Menu`

Generally, the `template` is an array of `options` for constructing a MenuItem. The usage can be referenced above. You can also attach other fields to the element of the `template` and they will become properties of the constructed menu items.

### `Menu.sendActionToFirstResponder(action)` _macOS_

- `action` string

Sends the `action` to the first responder of application. This is used for emulating default macOS menu behaviors. Usually you would use the `role` property of a `MenuItem`.

## Instance Methods

### `menu.popup([options])`

- `options` Object (optional)
  - `window` BaseWindow (optional) - Default is the focused window
  - `x` number (optional) - Default is the current mouse cursor position. Must be declared if `y` is declared.
  - `y` number (optional) - Default is the current mouse cursor position. Must be declared if `x` is declared.
  - `positioningItem` number (optional) _macOS_ - The index of the menu item to be positioned under the mouse cursor at the specified coordinates. Default is -1.
  - `sourceType` string (optional) - Can be `none`, `mouse`, `keyboard`, `touch`, `touchMenu`, `longPress`, `longTap`, `touchHandle`, `stylus`, `adjustSelection`, or `adjustSelectionReset`. Default is `keyboard` when the menu is invoked using keyboard, `mouse` when invoked using mouse.
  - `callback` Function (optional) - Called when menu is closed.

Pops up this menu as a context menu in the `BaseWindow`.

### `menu.closePopup([window])`

- `window` BaseWindow (optional) - Default is the focused window.

Closes the context menu in the `window`.

### `menu.append(menuItem)`

- `menuItem` MenuItem

Appends the `menuItem` to the menu.

### `menu.getMenuItemById(id)`

- `id` string

**Returns:** `MenuItem | null` - The item with the specified `id`

### `menu.insert(pos, menuItem)`

- `pos` Integer
- `menuItem` MenuItem

Inserts the `menuItem` to the `pos` position of the menu.

## Instance Events

### Event: 'menu-will-show'

- `event` Event

Emitted when `menu.popup()` is called.

### Event: 'menu-will-close'

- `event` Event

Emitted when a popup is closed either manually or with `menu.closePopup()`.

## Instance Properties

### `menu.items`

A `MenuItem[]` array containing the menu's items.

Each `Menu` consists of multiple `MenuItem`s and each `MenuItem` can have a submenu.
