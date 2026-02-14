---
title: "<webview> Tag"
source_url: https://www.electronjs.org/docs/latest/api/webview-tag
---

# `<webview>` Tag

> Display external web content in an isolated frame and process.

Process: [Renderer](../glossary#renderer-process)

**Warning:** The Electron team discourages use of the `<webview>` tag. It is based on Chromium's webview implementation which is undergoing architectural changes. Consider alternatives like `iframe`, `WebContentsView`, or avoiding embedded content altogether.

## Enabling

By default, the `<webview>` tag is disabled in Electron >= 5. Enable it by setting the `webviewTag` webPreference option when constructing a `BrowserWindow`.

## Overview

The `<webview>` tag can be used to embed 'guest' content (such as external web pages) in your Electron app. The guest content is contained within the `<webview>` container. An embedded page within your app controls how the guest content is laid out and rendered.

Unlike an `iframe`, the `<webview>` runs in a separate process than your app. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous.

## CSS Styling Notes

The `<webview>` tag uses `display:flex` internally. Do not overwrite this default CSS property unless specifying `display:inline-flex` for inline layout.

## Example

```html
<webview id="foo" src="https://www.github.com/"
  style="display:inline-flex; width:640px; height:480px"></webview>
```

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('did-start-loading', () => {
  indicator.innerText = 'loading...'
})
webview.addEventListener('did-stop-loading', () => {
  indicator.innerText = ''
})
```

## Tag Attributes

### `src`

A `string` representing the visible URL. Writing to this attribute initiates top-level navigation. Assigning `src` its own value will reload the current page.

### `nodeintegration`

A `boolean`. When this attribute is present the guest page in `webview` will have node integration and can use node APIs like `require` and `process` to access low level system resources.

### `nodeintegrationinsubframes`

A `boolean` for the experimental option for enabling NodeJS support in sub-frames such as iframes inside the `webview`.

### `plugins`

A `boolean`. When this attribute is present the guest page in `webview` will be able to use browser plugins.

### `preload`

A `string` that specifies a script that will be loaded before other scripts run in the guest page. The protocol of the script's URL must be `file:` (even when using `asar:` archives) because it will be loaded by Node's `require` under the hood.

### `httpreferrer`

A `string` that sets the referrer URL for the guest page.

### `useragent`

A `string` that sets the user agent for the guest page before the page is navigated to.

### `disablewebsecurity`

A `boolean`. When this attribute is present the guest page will have web security disabled. This value can only be modified before the first navigation.

### `partition`

A `string` that sets the session used by the page. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. If there is no `persist:` prefix, the page will use an in-memory session. By assigning the same `partition`, multiple pages can share the same session. If the `partition` is unset then the default session of the app will be used.

### `allowpopups`

A `boolean`. When this attribute is present the guest page will be allowed to open new windows.

### `webpreferences`

A `string` which is a comma separated list of strings that specifies web preferences to be set on the webview.

### `enableblinkfeatures`

A `string` which is a list of strings specifying the blink features to be enabled, separated by commas.

### `disableblinkfeatures`

A `string` which is a list of strings specifying the blink features to be disabled, separated by commas.

## Methods

### `<webview>.loadURL(url[, options])`

- `url` URL
- `options` Object (optional)
  - `httpReferrer` (string | Referrer) (optional)
  - `userAgent` string (optional)
  - `extraHeaders` string (optional)
  - `postData` (UploadRawData | UploadFile)[] (optional)
  - `baseURLForDataURL` string (optional)

Returns `Promise<void>` - resolves when the page finishes loading.

Loads the `url` in the webview, the `url` must contain the protocol prefix, e.g. `http://` or `file://`.

### `<webview>.downloadURL(url[, options])`

- `url` string
- `options` Object (optional)
  - `headers` Record<string, string> (optional)

Initiates a download of the resource at `url` without navigating.

### `<webview>.getURL()`

Returns `string` - The URL of guest page.

### `<webview>.getTitle()`

Returns `string` - The title of guest page.

### `<webview>.isLoading()`

Returns `boolean` - Whether guest page is still loading resources.

### `<webview>.isLoadingMainFrame()`

Returns `boolean` - Whether the main frame is still loading.

### `<webview>.isWaitingForResponse()`

Returns `boolean` - Whether the guest page is waiting for a first-response for the main resource of the page.

### `<webview>.stop()`

Stops any pending navigation.

### `<webview>.reload()`

Reloads the guest page.

### `<webview>.reloadIgnoringCache()`

Reloads the guest page and ignores cache.

### `<webview>.canGoBack()`

Returns `boolean` - Whether the guest page can go back.

### `<webview>.canGoForward()`

Returns `boolean` - Whether the guest page can go forward.

### `<webview>.canGoToOffset(offset)`

- `offset` Integer

Returns `boolean` - Whether the guest page can go to `offset`.

### `<webview>.clearHistory()`

Clears the navigation history.

### `<webview>.goBack()`

Makes the guest page go back.

### `<webview>.goForward()`

Makes the guest page go forward.

### `<webview>.goToIndex(index)`

- `index` Integer

Navigates to the specified absolute index.

### `<webview>.goToOffset(offset)`

- `offset` Integer

Navigates to the specified offset from the current entry.

### `<webview>.isCrashed()`

Returns `boolean` - Whether the renderer process has crashed.

### `<webview>.setUserAgent(userAgent)`

- `userAgent` string

Overrides the user agent for the guest page.

### `<webview>.getUserAgent()`

Returns `string` - The user agent for guest page.

### `<webview>.insertCSS(css)`

- `css` string

Returns `Promise<string>` - A key for the inserted CSS that can later be used to remove the CSS via `<webview>.removeInsertedCSS(key)`.

Injects CSS into the current web page and returns a unique key for the inserted stylesheet.

### `<webview>.removeInsertedCSS(key)`

- `key` string

Returns `Promise<void>` - Resolves if the removal was successful.

Removes the inserted CSS from the current web page.

### `<webview>.executeJavaScript(code[, userGesture])`

- `code` string
- `userGesture` boolean (optional) - Default `false`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Evaluates `code` in page. If `userGesture` is set, it will create the user gesture context in the page.

### `<webview>.openDevTools()`

Opens a DevTools window for guest page.

### `<webview>.closeDevTools()`

Closes the DevTools window of guest page.

### `<webview>.isDevToolsOpened()`

Returns `boolean` - Whether guest page has a DevTools window attached.

### `<webview>.isDevToolsFocused()`

Returns `boolean` - Whether DevTools window of guest page is focused.

### `<webview>.inspectElement(x, y)`

- `x` Integer
- `y` Integer

Starts inspecting element at position (`x`, `y`) of guest page.

### `<webview>.inspectSharedWorker()`

Opens the DevTools for the shared worker context present in the guest page.

### `<webview>.inspectServiceWorker()`

Opens the DevTools for the service worker context present in the guest page.

### `<webview>.setAudioMuted(muted)`

- `muted` boolean

Set guest page muted.

### `<webview>.isAudioMuted()`

Returns `boolean` - Whether guest page has been muted.

### `<webview>.isCurrentlyAudible()`

Returns `boolean` - Whether audio is currently playing.

### `<webview>.undo()`

Executes editing command `undo` in page.

### `<webview>.redo()`

Executes editing command `redo` in page.

### `<webview>.cut()`

Executes editing command `cut` in page.

### `<webview>.copy()`

Executes editing command `copy` in page.

### `<webview>.paste()`

Executes editing command `paste` in page.

### `<webview>.pasteAndMatchStyle()`

Executes editing command `pasteAndMatchStyle` in page.

### `<webview>.delete()`

Executes editing command `delete` in page.

### `<webview>.selectAll()`

Executes editing command `selectAll` in page.

### `<webview>.replace(text)`

- `text` string

Executes editing command `replace` in page.

### `<webview>.replaceMisspelling(text)`

- `text` string

Executes editing command `replaceMisspelling` in page.

### `<webview>.insertText(text)`

- `text` string

Returns `Promise<void>`

Inserts `text` to the focused element.

### `<webview>.findInPage(text[, options])`

- `text` string - Content to be searched, must not be empty.
- `options` Object (optional)
  - `forward` boolean (optional) - Whether to search forward or backward, defaults to `true`.
  - `findNext` boolean (optional) - Whether to begin a new text find session with this request. Should be `true` for initial requests, and `false` for follow-up requests. Defaults to `false`.
  - `matchCase` boolean (optional) - Whether search should be case-sensitive, defaults to `false`.

Returns `Integer` - The request id used for the request.

Starts a request to find all matches for the `text` in the web page.

### `<webview>.stopFindInPage(action)`

- `action` string - Specifies the action to take place when ending `<webview>.findInPage` request.
  - `clearSelection` - Clear the selection.
  - `keepSelection` - Translate the selection into a normal selection.
  - `activateSelection` - Focus and click the selection node.

Stops any `findInPage` request for the `webview` with the provided `action`.

### `<webview>.print([options])`

- `options` Object (optional)
  - Various print options for margins, headers/footers, scaling, etc.

Returns `Promise<void>`

Prints `webview`'s web page.

### `<webview>.printToPDF(options)`

- `options` Object
  - Various PDF generation options for page size, margins, headers/footers, etc.

Returns `Promise<Uint8Array>` - Resolves with the generated PDF data.

### `<webview>.capturePage([rect])`

- `rect` Rectangle (optional) - The area of the page to be captured.

Returns `Promise<NativeImage>` - Resolves with a NativeImage.

Captures a snapshot of the page within `rect`. Omitting `rect` captures the whole visible page.

### `<webview>.send(channel, ...args)`

- `channel` string
- `...args` any[]

Send an asynchronous message to renderer process via `channel`, you can also send arbitrary arguments.

### `<webview>.sendToFrame(frameId, channel, ...args)`

- `frameId` [number, number]
- `channel` string
- `...args` any[]

Send an asynchronous message to renderer process via `channel`, targeting a specific frame.

### `<webview>.sendInputEvent(event)`

- `event` Object

Sends an input event to the page.

### `<webview>.setZoomFactor(factor)`

- `factor` number - Zoom factor; default is 1.0.

Changes the zoom factor to the specified factor.

### `<webview>.setZoomLevel(level)`

- `level` number - Zoom level.

Changes the zoom level to the specified level.

### `<webview>.getZoomFactor()`

Returns `number` - the current zoom factor.

### `<webview>.getZoomLevel()`

Returns `number` - the current zoom level.

### `<webview>.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

- `minimumLevel` number
- `maximumLevel` number

Returns `Promise<void>`

Sets the maximum and minimum pinch-to-zoom level.

### `<webview>.getWebContentsId()`

Returns `number` - The WebContents ID of this `webview`.

## DOM Events

### Event: 'load-commit'

- `url` string
- `isMainFrame` boolean

Fired when a load has committed. This includes navigation within the current document as well as subframe document-level loads, but does not include asynchronous resource loads.

### Event: 'did-finish-load'

Fired when the navigation is done, i.e. the spinner of the tab will stop spinning, and the `onload` event is dispatched.

### Event: 'did-fail-load'

- `errorCode` Integer
- `errorDescription` string
- `validatedURL` string
- `isMainFrame` boolean

This event is like `did-finish-load`, but fired when the load failed or was cancelled.

### Event: 'did-frame-finish-load'

- `isMainFrame` boolean

Fired when a frame has done navigation.

### Event: 'did-start-loading'

Corresponds to the points in time when the spinner of the tab starts spinning.

### Event: 'did-stop-loading'

Corresponds to the points in time when the spinner of the tab stops spinning.

### Event: 'dom-ready'

Fired when document in the given frame is loaded.

### Event: 'page-title-updated'

- `title` string
- `explicitSet` boolean

Fired when page title is set during navigation.

### Event: 'page-favicon-updated'

- `favicons` string[] - Array of URLs.

Fired when page receives favicon urls.

### Event: 'enter-html-full-screen'

Fired when page enters fullscreen triggered by HTML API.

### Event: 'leave-html-full-screen'

Fired when page leaves fullscreen triggered by HTML API.

### Event: 'console-message'

- `level` Integer - The log level (0-3: verbose, info, warning, error)
- `message` string
- `line` Integer
- `sourceId` string

Fired when the guest window logs a console message.

### Event: 'found-in-page'

- `result` Object
  - `requestId` Integer
  - `activeMatchOrdinal` Integer
  - `matches` Integer
  - `selectionArea` Rectangle
  - `finalUpdate` boolean

Fired when a result is available for `webview.findInPage` request.

### Event: 'will-navigate'

- `url` string

Emitted when a user or the page wants to start navigation.

### Event: 'will-frame-navigate'

- `url` string
- `isMainFrame` boolean
- `frameProcessId` Integer
- `frameRoutingId` Integer

Emitted when a user or the page wants to start navigation in any frame.

### Event: 'did-start-navigation'

- `url` string
- `isInPlace` boolean
- `isMainFrame` boolean
- `frameProcessId` Integer
- `frameRoutingId` Integer

Emitted when any frame (including main) starts navigating.

### Event: 'did-redirect-navigation'

- `url` string
- `isInPlace` boolean
- `isMainFrame` boolean
- `frameProcessId` Integer
- `frameRoutingId` Integer

Emitted after a server side redirect occurs during navigation.

### Event: 'did-navigate'

- `url` string

Emitted when a navigation is done.

### Event: 'did-frame-navigate'

- `url` string
- `httpResponseCode` Integer
- `httpStatusText` string
- `isMainFrame` boolean
- `frameProcessId` Integer
- `frameRoutingId` Integer

Emitted when any frame navigation is done.

### Event: 'did-navigate-in-page'

- `isMainFrame` boolean
- `url` string

Emitted when an in-page navigation happened.

### Event: 'close'

Fired when the guest page attempts to close itself.

### Event: 'ipc-message'

- `channel` string
- `args` any[]

Fired when the guest page has sent an asynchronous message to embedder page.

### Event: 'render-process-gone'

- `details` Object

Fired when the renderer process unexpectedly disappears (crash or kill).

### Event: 'destroyed'

Fired when the WebContents is destroyed.

### Event: 'media-started-playing'

Emitted when media starts playing.

### Event: 'media-paused'

Emitted when media is paused or done playing.

### Event: 'did-change-theme-color'

- `themeColor` string

Emitted when a page's theme color changes.

### Event: 'update-target-url'

- `url` string

Emitted when mouse moves over a link or the keyboard moves the focus to a link.

### Event: 'devtools-opened'

Emitted when DevTools is opened.

### Event: 'devtools-closed'

Emitted when DevTools is closed.

### Event: 'devtools-focused'

Emitted when DevTools is focused / opened.

### Event: 'devtools-open-url'

- `url` string

Emitted when a link is clicked in DevTools or 'Open in new tab' is selected for a link in its context menu.

### Event: 'devtools-search-query'

- `event` Event
- `query` string

Emitted when 'Search' is selected for text in its context menu.

### Event: 'context-menu'

- `params` Object

Emitted when there is a new context menu that needs to be handled.

### Event: 'did-attach'

Emitted when the webview is attached to web contents.
