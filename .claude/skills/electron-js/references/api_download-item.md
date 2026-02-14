---
title: "Class: DownloadItem"
source_url: https://www.electronjs.org/docs/latest/api/download-item
---

# Class: DownloadItem

> Manage file downloads from remote sources.

**Process:** Main

_This class is not exported from the `'electron'` module. It is only available as a return value of other methods in the Electron API._

`DownloadItem` extends EventEmitter and represents a download in Electron. Used in the `will-download` event of the `Session` class, it enables control over download operations.

## Example Usage

```javascript
// In the main process
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.webContents.session.on('will-download', (event, item, webContents) => {
  item.setSavePath('/tmp/save.pdf')
  item.on('updated', (event, state) => {
    if (state === 'interrupted') {
      console.log('Download is interrupted but can be resumed')
    } else if (state === 'progressing') {
      if (item.isPaused()) {
        console.log('Download is paused')
      } else {
        console.log(`Received bytes: ${item.getReceivedBytes()}`)
      }
    }
  })
  item.once('done', (event, state) => {
    if (state === 'completed') {
      console.log('Download successfully')
    } else {
      console.log(`Download failed: ${state}`)
    }
  })
})
```

## Instance Events

### Event: 'updated'

**Returns:**
- `event` Event
- `state` string - `progressing` or `interrupted`

Emitted when download progresses. States include:
- `progressing` - Download in-progress
- `interrupted` - Download paused, resumable

### Event: 'done'

**Returns:**
- `event` Event
- `state` string - `completed`, `cancelled`, or `interrupted`

Emitted upon terminal state. States include:
- `completed` - Successfully finished
- `cancelled` - Cancelled via `downloadItem.cancel()`
- `interrupted` - Cannot resume

## Instance Methods

### `downloadItem.setSavePath(path)`

- `path` string

Sets the save location. Only available in `will-download` callback. Creates directories recursively if needed.

### `downloadItem.getSavePath()`

**Returns:** `string` - The save path.

### `downloadItem.setSaveDialogOptions(options)`

- `options` SaveDialogOptions

Customizes the save dialog shown for downloads. Only available in `will-download` callback.

### `downloadItem.getSaveDialogOptions()`

**Returns:** `SaveDialogOptions` - Previously set options.

### `downloadItem.pause()`

Pauses the download.

### `downloadItem.isPaused()`

**Returns:** `boolean`

### `downloadItem.resume()`

Resumes a paused download.

**Note:** Server must support range requests with `Last-Modified` and `ETag` headers for resumption.

### `downloadItem.canResume()`

**Returns:** `boolean`

### `downloadItem.cancel()`

Cancels the operation.

### `downloadItem.getURL()`

**Returns:** `string` - Source URL.

### `downloadItem.getMimeType()`

**Returns:** `string` - MIME type.

### `downloadItem.hasUserGesture()`

**Returns:** `boolean`

### `downloadItem.getFilename()`

**Returns:** `string` - File name.

**Note:** May differ from actual saved filename if user modifies it.

### `downloadItem.getCurrentBytesPerSecond()`

**Returns:** `Integer` - Speed in bytes per second.

### `downloadItem.getTotalBytes()`

**Returns:** `Integer` - Total size. Returns 0 if unknown.

### `downloadItem.getReceivedBytes()`

**Returns:** `Integer`

### `downloadItem.getPercentComplete()`

**Returns:** `Integer` - Completion percentage.

### `downloadItem.getContentDisposition()`

**Returns:** `string` - Content-Disposition header value.

### `downloadItem.getState()`

**Returns:** `string` - `progressing`, `completed`, `cancelled`, or `interrupted`

### `downloadItem.getURLChain()`

**Returns:** `string[]` - Complete URL chain including redirects.

### `downloadItem.getLastModifiedTime()`

**Returns:** `string` - Last-Modified header.

### `downloadItem.getETag()`

**Returns:** `string` - ETag header.

### `downloadItem.getStartTime()`

**Returns:** `Double` - UNIX epoch seconds at start.

### `downloadItem.getEndTime()`

**Returns:** `Double` - UNIX epoch seconds at completion.

## Instance Properties

### `downloadItem.savePath`

A `string` property setting the save location. Only available in `will-download` callback.
