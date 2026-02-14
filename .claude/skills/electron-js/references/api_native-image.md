---
title: nativeImage
source_url: https://www.electronjs.org/docs/latest/api/native-image
---

# nativeImage

> Create tray, dock, and application icons using PNG or JPG files.

**Process:** Main, Renderer

To call this API from a renderer process with context isolation enabled, place the API call in your preload script and expose it using the `contextBridge` API.

## Overview

The `nativeImage` module provides a unified interface for manipulating system images. These can be useful for providing multiple scaled versions of the same icon or leveraging macOS template images.

Electron APIs that accept image files can use either file paths or `NativeImage` instances. When `null` is passed, an empty and transparent image is used.

### Example Usage

**Passing a file path string:**

```javascript
const { BrowserWindow, Tray } = require('electron')
const tray = new Tray('/Users/somebody/images/icon.png')
const win = new BrowserWindow({ icon: '/Users/somebody/images/window.png' })
```

**Creating NativeImage instances:**

```javascript
const { BrowserWindow, nativeImage, Tray } = require('electron')
const trayIcon = nativeImage.createFromPath('/Users/somebody/images/icon.png')
const appIcon = nativeImage.createFromPath('/Users/somebody/images/window.png')
const tray = new Tray(trayIcon)
const win = new BrowserWindow({ icon: appIcon })
```

## Supported Formats

Currently, `PNG` and `JPEG` formats are supported across all platforms. PNG is recommended for transparency and lossless compression support.

On Windows, `ICO` icons can also be loaded from file paths. For best visual quality, include these sizes:

**Small icon:**
- 16x16 (100% DPI)
- 20x20 (125% DPI)
- 24x24 (150% DPI)
- 32x32 (200% DPI)

**Large icon:**
- 32x32 (100% DPI)
- 40x40 (125% DPI)
- 48x48 (150% DPI)
- 64x64 (200% DPI)
- 256x256

**Note:** EXIF metadata is not currently supported and will be ignored during image encoding and decoding.

## High Resolution Image

On platforms supporting high pixel density displays (like Apple Retina), append `@2x` after the base filename to mark it as a 2x scale high resolution image.

### Example Structure:

```
images/
  icon.png
  icon@2x.png
  icon@3x.png
```

```javascript
const { Tray } = require('electron')
const appTray = new Tray('/Users/somebody/images/icon.png')
```

### Supported DPI Suffixes:
- `@1x`, `@1.25x`, `@1.33x`, `@1.4x`, `@1.5x`, `@1.8x`, `@2x`, `@2.5x`, `@3x`, `@4x`, `@5x`

## Template Image _macOS_

On macOS, template images consist of black and an alpha channel. They are typically mixed with other content to create the desired appearance.

The most common use case is menu bar (Tray) icons that adapt to both light and dark menu bars.

To mark an image as a template image, the base filename should end with `Template` (e.g., `xxxTemplate.png`). You can also specify different DPI densities (e.g., `xxxTemplate@2x.png`).

## Static Methods

### `nativeImage.createEmpty()`

**Returns:** `NativeImage`

Creates an empty `NativeImage` instance.

### `nativeImage.createThumbnailFromPath(path, size)` _macOS_ _Windows_

- `path` string - Path to the file for thumbnail creation
- `size` Size - Desired width and height (positive numbers) of the thumbnail

**Returns:** `Promise<NativeImage>`

**Note:** Windows implementation ignores `size.height` and scales height according to `size.width`.

### `nativeImage.createFromPath(path)`

- `path` string - Path to an image file (PNG or JPEG)

**Returns:** `NativeImage`

Creates a `NativeImage` instance from an image file. Returns an empty image if the path doesn't exist, cannot be read, or is invalid.

```javascript
const { nativeImage } = require('electron')
const image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `nativeImage.createFromBitmap(buffer, options)`

- `buffer` Buffer - Raw bitmap pixel data
- `options` Object
  - `width` Integer
  - `height` Integer
  - `scaleFactor` Number (optional) - Defaults to 1.0

**Returns:** `NativeImage`

### `nativeImage.createFromBuffer(buffer[, options])`

- `buffer` Buffer
- `options` Object (optional)
  - `width` Integer (optional) - Required for bitmap buffers
  - `height` Integer (optional) - Required for bitmap buffers
  - `scaleFactor` Number (optional) - Defaults to 1.0

**Returns:** `NativeImage`

Attempts to decode the buffer as PNG or JPEG first.

### `nativeImage.createFromDataURL(dataURL)`

- `dataURL` string - Base 64 encoded Data URL string

**Returns:** `NativeImage`

### `nativeImage.createFromNamedImage(imageName[, hslShift])` _macOS_

- `imageName` string - NSImage name or SF Symbol name
- `hslShift` number[] (optional) - HSL color shift array

**Returns:** `NativeImage`

Refer to Apple's NSImageName documentation and SF Symbols for possible values.

**HSL Shift Rules:**
- `hsl_shift[0]` (hue): Absolute hue value (0-1 maps to 0-360 on color wheel)
- `hsl_shift[1]` (saturation): Saturation shift (0 = no color, 0.5 = unchanged, 1 = fully saturated)
- `hsl_shift[2]` (lightness): Lightness shift (0 = black, 0.5 = unchanged, 1 = white)

Example: `[-1, 0, 1]` makes the image completely white; `[-1, 1, 0]` makes it completely black.

**SF Symbols Example:**

```javascript
const image = nativeImage.createFromNamedImage('square.and.pencil')
```

## Class: NativeImage

Natively wraps images such as tray, dock, and application icons.

**Process:** Main, Renderer

_This class is not exported directly; it is returned by other Electron API methods._

### Instance Methods

#### `image.toPNG([options])`

- `options` Object (optional)
  - `scaleFactor` Number (optional) - Defaults to 1.0

**Returns:** `Buffer` - PNG encoded image data

#### `image.toJPEG(quality)`

- `quality` Integer - Between 0-100

**Returns:** `Buffer` - JPEG encoded image data

#### `image.toBitmap([options])`

- `options` Object (optional)
  - `scaleFactor` Number (optional) - Defaults to 1.0

**Returns:** `Buffer` - Raw bitmap pixel data copy

#### `image.toDataURL([options])`

- `options` Object (optional)
  - `scaleFactor` Number (optional) - Defaults to 1.0

**Returns:** `string` - Data URL of the image

**Note:** As of version 32.0.0+, `toDataURL` preserves PNG colorspace.

#### `image.getBitmap([options])` _(Deprecated)_

- `options` Object (optional)
  - `scaleFactor` Number (optional) - Defaults to 1.0

Legacy alias for `image.toBitmap()`.

#### `image.getNativeHandle()` _macOS_

**Returns:** `Buffer` - C pointer to underlying native handle (`NSImage` instance on macOS)

**Warning:** The returned pointer is a weak reference. Keep the associated `nativeImage` instance in scope.

#### `image.isEmpty()`

**Returns:** `boolean` - Whether the image is empty

#### `image.getSize([scaleFactor])`

- `scaleFactor` Number (optional) - Defaults to 1.0

**Returns:** `Size`

If `scaleFactor` is passed, returns the size corresponding to the representation most closely matching that value.

#### `image.setTemplateImage(option)`

- `option` boolean

Marks the image as a macOS template image.

#### `image.isTemplateImage()`

**Returns:** `boolean` - Whether the image is a macOS template image

#### `image.crop(rect)`

- `rect` Rectangle - Area of the image to crop

**Returns:** `NativeImage` - Cropped image

#### `image.resize(options)`

- `options` Object
  - `width` Integer (optional) - Defaults to current width
  - `height` Integer (optional) - Defaults to current height
  - `quality` string (optional) - `'good'`, `'better'`, or `'best'` (default is `'best'`)

**Returns:** `NativeImage` - Resized image

If only height or width is specified, the current aspect ratio is preserved.

#### `image.getAspectRatio([scaleFactor])`

- `scaleFactor` Number (optional) - Defaults to 1.0

**Returns:** `Number` - Image aspect ratio (width divided by height)

#### `image.getScaleFactors()`

**Returns:** `Number[]` - Array of all scale factors with representations for the `NativeImage`

#### `image.addRepresentation(options)`

- `options` Object
  - `scaleFactor` Number (optional) - Scale factor for the representation
  - `width` Integer (optional) - Required for bitmap buffers
  - `height` Integer (optional) - Required for bitmap buffers
  - `buffer` Buffer (optional) - Raw image data
  - `dataURL` string (optional) - Base 64 encoded PNG or JPEG Data URL

Adds an image representation for a specific scale factor. Can be called on empty images.

### Instance Properties

#### `nativeImage.isMacTemplateImage` _macOS_

**Type:** `boolean`

Determines whether the image is considered a template image. This property only affects macOS.
