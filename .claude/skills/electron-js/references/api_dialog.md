---
title: dialog
source_url: https://www.electronjs.org/docs/latest/api/dialog
---

# dialog

> Display native system dialogs for opening and saving files, alerting, etc.

**Process:** Main

An example of showing a dialog to select multiple files:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
```

## Methods

The `dialog` module has the following methods:

### `dialog.showOpenDialogSync([window, ]options)`

- `window` BaseWindow (optional)
- `options` Object
  - `title` string (optional)
  - `defaultPath` string (optional)
  - `buttonLabel` string (optional) - Custom label for the confirmation button
  - `filters` FileFilter[] (optional)
  - `properties` string[] (optional) - Contains which features the dialog should use:
    - `openFile` - Allow files to be selected
    - `openDirectory` - Allow directories to be selected
    - `multiSelections` - Allow multiple paths to be selected
    - `showHiddenFiles` - Show hidden files in dialog
    - `createDirectory` (macOS) - Allow creating new directories from dialog
    - `promptToCreate` (Windows) - Prompt for creation if file path doesn't exist
    - `noResolveAliases` (macOS) - Disable automatic alias path resolution
    - `treatPackageAsDirectory` (macOS) - Treat packages as directories
    - `dontAddToRecent` (Windows) - Don't add item to recent documents
  - `message` string (optional, macOS) - Message to display above input boxes
  - `securityScopedBookmarks` boolean (optional, macOS, MAS) - Create security scoped bookmarks

**Returns:** `string[] | undefined` - file paths chosen by the user; returns `undefined` if cancelled

The `window` argument makes the dialog modal by attaching it to a parent window. File `filters` specify allowed file types. The `extensions` array should contain extensions without wildcards or dots (e.g., `'png'` not `'.png'`).

**Note:** On Windows and Linux, a dialog cannot be both a file selector and directory selector simultaneously -- setting both properties will show a directory selector.

**Note:** On Linux, `defaultPath` requires portal backend version 4 or higher unless using `--xdg-portal-required-version` command-line switch.

### `dialog.showOpenDialog([window, ]options)`

- `window` BaseWindow (optional)
- `options` Object (same parameters as `showOpenDialogSync`)

**Returns:** `Promise<Object>` containing:
- `canceled` boolean - whether the dialog was cancelled
- `filePaths` string[] - array of file paths chosen; empty array if cancelled
- `bookmarks` string[] (optional, macOS, MAS) - base64 encoded security scoped bookmark data

Example:

```javascript
dialog.showOpenDialog(mainWindow, {
  properties: ['openFile', 'openDirectory']
}).then(result => {
  console.log(result.canceled)
  console.log(result.filePaths)
}).catch(err => {
  console.log(err)
})
```

### `dialog.showSaveDialogSync([window, ]options)`

- `window` BaseWindow (optional)
- `options` Object
  - `title` string (optional) - The dialog title
  - `defaultPath` string (optional) - Absolute directory path, file path, or filename to use by default
  - `buttonLabel` string (optional) - Custom label for confirmation button
  - `filters` FileFilter[] (optional)
  - `message` string (optional, macOS) - Message to display above text fields
  - `nameFieldLabel` string (optional, macOS) - Custom label for filename text field
  - `showsTagField` boolean (optional, macOS) - Show tags input box; defaults to `true`
  - `properties` string[] (optional)
    - `showHiddenFiles` - Show hidden files
    - `createDirectory` (macOS) - Allow creating new directories
    - `treatPackageAsDirectory` (macOS) - Treat packages as directories
    - `showOverwriteConfirmation` (Linux) - Confirm if file already exists
    - `dontAddToRecent` (Windows) - Don't add item to recent documents
  - `securityScopedBookmarks` boolean (optional, macOS, MAS) - Creates security scoped bookmark

**Returns:** `string` - path of file chosen by user; returns empty string if cancelled

### `dialog.showSaveDialog([window, ]options)`

- `window` BaseWindow (optional)
- `options` Object (same parameters as `showSaveDialogSync`)

**Returns:** `Promise<Object>` containing:
- `canceled` boolean - whether the dialog was cancelled
- `filePath` string - empty string if cancelled
- `bookmark` string (optional, macOS, MAS) - base64 encoded security scoped bookmark data

**Note:** The asynchronous version is recommended on macOS to avoid issues when expanding/collapsing the dialog.

### `dialog.showMessageBoxSync([window, ]options)`

- `window` BaseWindow (optional)
- `options` Object
  - `message` string - Content of the message box
  - `type` string (optional) - Can be `none`, `info`, `error`, `question`, or `warning`
  - `buttons` string[] (optional) - Array of button texts
  - `defaultId` Integer (optional) - Index of default button
  - `title` string (optional) - Title of the message box
  - `detail` string (optional) - Extra information
  - `icon` (NativeImage | string) (optional)
  - `textWidth` Integer (optional, macOS) - Custom text width
  - `cancelId` Integer (optional) - Index of cancel button
  - `noLink` boolean (optional) - Don't show command links on Windows
  - `normalizeAccessKeys` boolean (optional) - Normalize keyboard access keys across platforms

**Returns:** `Integer` - index of the clicked button

Shows a message box and blocks the process until closed.

### `dialog.showMessageBox([window, ]options)`

- `window` BaseWindow (optional)
- `options` Object (same parameters as `showMessageBoxSync`, plus:)
  - `signal` AbortSignal (optional) - Close the message box when signalled
  - `checkboxLabel` string (optional) - Label for checkbox if provided
  - `checkboxChecked` boolean (optional) - Initial checkbox state; defaults to `false`

**Returns:** `Promise<Object>` containing:
- `response` number - index of clicked button
- `checkboxChecked` boolean - checkbox state if `checkboxLabel` was set

### `dialog.showErrorBox(title, content)`

- `title` string - Title to display in the error box
- `content` string - Text content to display

Displays a modal dialog showing an error message. Can be called safely before the `ready` event. On Linux before `ready`, the message is emitted to stderr with no GUI dialog.

### `dialog.showCertificateTrustDialog([window, ]options)` _macOS_ _Windows_

- `window` BaseWindow (optional)
- `options` Object
  - `certificate` Certificate - The certificate to trust/import
  - `message` string - Message to display to the user

**Returns:** `Promise<void>` - resolves when the certificate trust dialog is shown

On macOS, displays a modal dialog with certificate information. On Windows, the `message` is not used and the window argument is ignored due to OS limitations.

## Bookmarks array

`showOpenDialog` and `showSaveDialog` include a `bookmarks` field containing base64 encoded security scoped bookmark data (when `securityScopedBookmarks` is enabled):

| Build Type | securityScopedBookmarks | Return Type | Return Value |
|---|---|---|---|
| macOS mas | True | Success | `['LONGBOOKMARKSTRING']` |
| macOS mas | True | Error | `['']` (array of empty string) |
| macOS mas | False | NA | `[]` (empty array) |
| non mas | any | NA | `[]` (empty array) |

## Sheets

On macOS, dialogs are presented as sheets attached to a window if you provide a `BaseWindow` reference in the `window` parameter, or modals if no window is provided. Call `BaseWindow.getCurrentWindow().setSheetOffset(offset)` to change the offset from the window frame where sheets attach.
