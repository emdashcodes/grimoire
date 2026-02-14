---
title: clipboard
source_url: https://www.electronjs.org/docs/latest/api/clipboard
---

# clipboard

> Perform copy and paste operations on the system clipboard.

Process: [Main](/docs/latest/glossary#main-process), [Renderer](/docs/latest/glossary#renderer-process) _Deprecated_ (non-sandboxed only)

On Linux, there is also a `selection` clipboard. To manipulate it you need to pass `selection` to each method.

## Methods

### `clipboard.readText([type])`

*   `type` string (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Returns `string` - The content in the clipboard as plain text.

### `clipboard.writeText(text[, type])`

*   `text` string
*   `type` string (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Writes the `text` into the clipboard as plain text.

### `clipboard.readHTML([type])`

*   `type` string (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Returns `string` - The content in the clipboard as markup.

### `clipboard.writeHTML(markup[, type])`

*   `markup` string
*   `type` string (optional)

Writes `markup` to the clipboard.

### `clipboard.readImage([type])`

*   `type` string (optional)

Returns [`NativeImage`](/docs/latest/api/native-image) - The image content in the clipboard.

### `clipboard.writeImage(image[, type])`

*   `image` [NativeImage](/docs/latest/api/native-image)
*   `type` string (optional)

Writes `image` to the clipboard.

### `clipboard.readRTF([type])`

*   `type` string (optional)

Returns `string` - The content in the clipboard as RTF.

### `clipboard.writeRTF(text[, type])`

*   `text` string
*   `type` string (optional)

Writes the `text` into the clipboard in RTF.

### `clipboard.readBookmark()` _macOS_ _Windows_

Returns `Object`:

*   `title` string
*   `url` string

Returns an Object containing `title` and `url` keys representing the bookmark in the clipboard.

### `clipboard.writeBookmark(title, url[, type])` _macOS_ _Windows_

*   `title` string - Unused on Windows
*   `url` string
*   `type` string (optional)

Writes the `title` (macOS only) and `url` into the clipboard as a bookmark.

### `clipboard.readFindText()` _macOS_

Returns `string` - The text on the find pasteboard.

### `clipboard.writeFindText(text)` _macOS_

*   `text` string

Writes the `text` into the find pasteboard as plain text.

### `clipboard.clear([type])`

*   `type` string (optional)

Clears the clipboard content.

### `clipboard.availableFormats([type])`

*   `type` string (optional)

Returns `string[]` - An array of supported formats for the clipboard `type`.

### `clipboard.has(format[, type])` _Experimental_

*   `format` string
*   `type` string (optional)

Returns `boolean` - Whether the clipboard supports the specified `format`.

### `clipboard.read(format)` _Experimental_

*   `format` string

Returns `string` - Reads `format` type from the clipboard.

### `clipboard.readBuffer(format)` _Experimental_

*   `format` string

Returns `Buffer` - Reads `format` type from the clipboard.

### `clipboard.writeBuffer(format, buffer[, type])` _Experimental_

*   `format` string
*   `buffer` Buffer
*   `type` string (optional)

Writes the `buffer` into the clipboard as `format`.

### `clipboard.write(data[, type])`

*   `data` Object
    *   `text` string (optional)
    *   `html` string (optional)
    *   `image` [NativeImage](/docs/latest/api/native-image) (optional)
    *   `rtf` string (optional)
    *   `bookmark` string (optional) - The title of the URL at `text`.
*   `type` string (optional)

Writes `data` to the clipboard.