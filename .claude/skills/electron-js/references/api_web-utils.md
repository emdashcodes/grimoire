---
title: webUtils
source_url: https://www.electronjs.org/docs/latest/api/web-utils
---

# webUtils

> Utility functions for interacting with Web API objects.

Process: [Renderer](../glossary#renderer-process)

The `webUtils` module provides utility functions for interacting with Web API objects such as Files and Blobs within Electron's renderer process.

## Context Isolation Note

When context isolation is enabled, API calls should be placed in a preload script and exposed using the `contextBridge` API.

## Methods

### `webUtils.getPathForFile(file)`

- `file` File - A web File object

Returns `string` - The file system path that the `File` object references.

This method retrieves the file system path that a File object references. If the input is not a File object, an exception is thrown. If the File was created in JavaScript without disk backing, an empty string is returned.

**Migration Example:**

The old approach exposed a `path` property directly:

```javascript
// Legacy approach (deprecated)
const oldPath = document.querySelector('input[type=file]').files[0].path
```

The recommended modern approach uses `webUtils` through a preload script:

```javascript
// Renderer process
const file = document.querySelector('input[type=file]').files[0]
electronApi.doSomethingWithFile(file)
```

```javascript
// Preload script
const { contextBridge, webUtils } = require('electron')

contextBridge.exposeInMainWorld('electronApi', {
  doSomethingWithFile (file) {
    const path = webUtils.getPathForFile(file)
    // Use path as needed, preferably not exposing full paths to web content
  }
})
```
