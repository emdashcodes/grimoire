---
title: MenuItem
source_url: https://www.electronjs.org/docs/latest/api/menu-item
---

# Class: MenuItem

> Add items to native application menus and context menus.

**Process:** Main

## Constructor

### `new MenuItem(options)`

- `options` Object
  - `click` Function (optional) - Will be called with `click(menuItem, window, keyboardEvent)` when the menu item is clicked.
    - `menuItem` MenuItem
    - `window` BaseWindow | undefined - This will not be defined if no window is open.
    - `keyboardEvent` KeyboardEvent
  - `role` string (optional) - Can be `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `toggleSpellChecker`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `showSubstitutions`, `toggleSmartQuotes`, `toggleSmartDashes`, `toggleTextReplacement`, `startSpeaking`, `stopSpeaking`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `shareMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `showAllTabs`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow`, or `windowMenu`
  - `type` string (optional) - Can be `normal`, `separator`, `submenu`, `checkbox`, `radio`, `header`, or `palette`.
  - `label` string (optional)
  - `sublabel` string (optional)
  - `toolTip` string (optional) _macOS_ - Hover text for this menu item.
  - `accelerator` Accelerator (optional)
  - `icon` (NativeImage | string) (optional)
  - `enabled` boolean (optional) - If false, the menu item will be greyed out and unclickable.
  - `acceleratorWorksWhenHidden` boolean (optional) _macOS_ - default is `true`, and when `false` will prevent the accelerator from triggering the item if the item is not visible.
  - `visible` boolean (optional) - If false, the menu item will be entirely hidden.
  - `checked` boolean (optional) - Should only be specified for `checkbox` or `radio` type menu items.
  - `registerAccelerator` boolean (optional) - If false, the accelerator won't be registered with the system, but it will still be displayed. Defaults to `true`.
  - `sharingItem` SharingItem (optional) _macOS_ - The item to share when the `role` is `shareMenu`.
  - `submenu` (MenuItemConstructorOptions[] | Menu) (optional) - Should be specified for `submenu` type menu items. If `submenu` is specified, the `type: 'submenu'` can be omitted. If the value is not a `Menu` then it will be automatically converted to one using `Menu.buildFromTemplate`.
  - `id` string (optional) - Unique within a single menu. If defined then it can be used as a reference to this item by the position attribute.
  - `before` string[] (optional) - Inserts this item before the item with the specified id. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same "group" as the item.
  - `after` string[] (optional) - Inserts this item after the item with the specified id. If the referenced item doesn't exist the item will be inserted at the end of the menu.
  - `beforeGroupContaining` string[] (optional) - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified id.
  - `afterGroupContaining` string[] (optional) - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified id.

**Note on `role`:** The `role` property can have the following values. It is best to specify `role` for any menu item that matches a standard role, rather than trying to manually implement the behavior in a `click` function. The built-in `role` behavior will give the best native experience. When using `role`, the `label` and `accelerator` values are optional and will default to appropriate values for each platform.

**Note:** Every menu item must have either a `role`, `label`, or in the case of a separator a `type`.

## Instance Properties

### `menuItem.id`

A `string` indicating the item's unique id, this property can be dynamically changed.

### `menuItem.label`

A `string` indicating the item's visible label.

### `menuItem.click`

A `Function` that is fired when the MenuItem receives a click event. It can be called with `menuItem.click(event, focusedWindow, focusedWebContents)`.

### `menuItem.submenu`

A `Menu` (optional) containing the menu item's submenu, if present.

### `menuItem.type`

A `string` indicating the type of the item. Can be `normal`, `separator`, `submenu`, `checkbox`, `radio`, `header`, or `palette`.

### `menuItem.role`

A `string` (optional) indicating the item's role, if set. Can be `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `toggleSpellChecker`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `windowMenu`

### `menuItem.accelerator`

An `Accelerator` (optional) indicating the item's accelerator, if set.

### `menuItem.userAccelerator` _macOS_ _Readonly_

An `Accelerator | null` indicating the item's user-assigned accelerator for the menu item.

**Note:** This property is only initialized after the `MenuItem` has been added to a `Menu`. Via `Menu.buildFromTemplate` or via `Menu.append()/insert()`. Accessing before initialization will return `null`.

### `menuItem.icon`

A `NativeImage | string` (optional) indicating the item's icon, if set.

### `menuItem.sublabel`

A `string` indicating the item's sublabel.

### `menuItem.toolTip` _macOS_

A `string` indicating the item's hover text.

### `menuItem.enabled`

A `boolean` indicating whether the item is enabled, this property can be dynamically changed.

### `menuItem.visible`

A `boolean` indicating whether the item is visible, this property can be dynamically changed.

### `menuItem.checked`

A `boolean` indicating whether the item is checked, this property can be dynamically changed. A `checkbox` menu item will toggle the `checked` property on and off when selected. A `radio` menu item will turn on its `checked` property when clicked, and will turn off that property for all adjacent items in the same menu.

### `menuItem.registerAccelerator`

A `boolean` indicating if the accelerator should be registered with the system or just displayed.

### `menuItem.sharingItem` _macOS_

A `SharingItem` indicating the item to share when the `role` is `shareMenu`.

### `menuItem.commandId`

A `number` indicating an item's sequential unique id.

### `menuItem.menu`

A `Menu` that the item is a part of.
