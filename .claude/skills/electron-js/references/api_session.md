---
title: session
source_url: https://www.electronjs.org/docs/latest/api/session
---

# session

> Manage browser sessions, cookies, cache, proxy settings, etc.

Process: [Main](../glossary.md#main-process)

The `session` module can be used to create new `Session` objects.

You can also access the `session` of existing pages by using the `session`
property of [`WebContents`](web-contents.md), or from the `session` module.

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## Methods

The `session` module has the following methods:

### `session.fromPartition(partition[, options])`

* `partition` string
* `options` Object (optional)
  * `cache` boolean - Whether to enable cache. Default is `true` unless the
    [`--disable-http-cache` switch](command-line-switches.md#--disable-http-cache) is used.

Returns `Session` - A session instance from `partition` string. When there is an existing
`Session` with the same `partition`, it will be returned; otherwise a new
`Session` instance will be created with `options`.

If `partition` starts with `persist:`, the page will use a persistent session
available to all pages in the app with the same `partition`. if there is no
`persist:` prefix, the page will use an in-memory session. If the `partition` is
empty then default session of the app will be returned.

To create a `Session` with `options`, you have to ensure the `Session` with the
`partition` has never been used before. There is no way to change the `options`
of an existing `Session` object.

### `session.fromPath(path[, options])`

* `path` string
* `options` Object (optional)
  * `cache` boolean - Whether to enable cache. Default is `true` unless the
    [`--disable-http-cache` switch](command-line-switches.md#--disable-http-cache) is used.

Returns `Session` - A session instance from the absolute path as specified by the `path`
string. When there is an existing `Session` with the same absolute path, it
will be returned; otherwise a new `Session` instance will be created with `options`. The
call will throw an error if the path is not an absolute path. Additionally, an error will
be thrown if an empty string is provided.

To create a `Session` with `options`, you have to ensure the `Session` with the
`path` has never been used before. There is no way to change the `options`
of an existing `Session` object.

## Properties

The `session` module has the following properties:

### `session.defaultSession`

A `Session` object, the default session object of the app, available after `app.whenReady` is called.

## Class: Session

> Get and set properties of a session.

Process: [Main](../glossary.md#main-process)

_This class is not exported from the `'electron'` module. It is only available as a return value of other methods in the Electron API._

You can create a `Session` object in the `session` module:

```js
const { session } = require('electron')

const ses = session.fromPartition('persist:name')
console.log(ses.getUserAgent())
```

### Instance Events

The following events are available on instances of `Session`:

#### Event: 'will-download'

Returns:

* `event` Event
* `item` [DownloadItem](download-item.md)
* `webContents` [WebContents](web-contents.md)

Emitted when Electron is about to download `item` in `webContents`.

Calling `event.preventDefault()` will cancel the download and `item` will not be
available from next tick of the process.

```js
const { session } = require('electron')

session.defaultSession.on('will-download', (event, item, webContents) => {
  event.preventDefault()
  require('got')(item.getURL()).then((response) => {
    require('node:fs').writeFileSync('/somewhere', response.body)
  })
})
```

#### Event: 'extension-loaded'

Returns:

* `event` Event
* `extension` [Extension](structures/extension.md)

Emitted after an extension is loaded. This occurs whenever an extension is
added to the "enabled" set of extensions. This includes:

* Extensions being loaded from `Session.loadExtension`.
* Extensions being reloaded:
  * from a crash.
  * if the extension requested it ([`chrome.runtime.reload()`](https://developer.chrome.com/extensions/runtime#method-reload)).

#### Event: 'extension-unloaded'

Returns:

* `event` Event
* `extension` [Extension](structures/extension.md)

Emitted after an extension is unloaded. This occurs when
`Session.removeExtension` is called.

#### Event: 'extension-ready'

Returns:

* `event` Event
* `extension` [Extension](structures/extension.md)

Emitted after an extension is loaded and all necessary browser state is
initialized to support the start of the extension's background page.

#### Event: 'file-system-access-restricted'

Returns:

* `event` Event
* `details` Object
  * `origin` string - The origin that initiated access to the blocked path.
  * `isDirectory` boolean - Whether or not the path is a directory.
  * `path` string - The blocked path attempting to be accessed.
* `callback` Function
  * `action` string - The action to take as a result of the restricted path access attempt.
    * `allow` - This will allow `path` to be accessed despite restricted status.
    * `deny` - This will block the access request and trigger an `AbortError`.
    * `tryAgain` - This will open a new file picker and allow the user to choose another path.

```js
const { app, dialog, BrowserWindow, session } = require('electron')

async function createWindow () {
  const mainWindow = new BrowserWindow()

  await mainWindow.loadURL('https://buzzfeed.com')

  session.defaultSession.on('file-system-access-restricted', async (e, details, callback) => {
    const { origin, path } = details
    const { response } = await dialog.showMessageBox({
      message: `Are you sure you want ${origin} to open restricted path ${path}?`,
      title: 'File System Access Restricted',
      buttons: ['Choose a different folder', 'Allow', 'Cancel'],
      cancelId: 2
    })

    if (response === 0) {
      callback('tryAgain')
    } else if (response === 1) {
      callback('allow')
    } else {
      callback('deny')
    }
  })
}

app.whenReady().then(() => {
  createWindow()
})
```

#### Event: 'preconnect'

Returns:

* `event` Event
* `preconnectUrl` string - The URL being requested for preconnection by the renderer.
* `allowCredentials` boolean - True if the renderer is requesting that the connection include credentials.

Emitted when a render process requests preconnection to a URL, generally due to
a resource hint.

#### Event: 'spellcheck-dictionary-initialized'

Returns:

* `event` Event
* `languageCode` string - The language code of the dictionary file

Emitted when a hunspell dictionary file has been successfully initialized. This
occurs after the file has been downloaded.

#### Event: 'spellcheck-dictionary-download-begin'

Returns:

* `event` Event
* `languageCode` string - The language code of the dictionary file

Emitted when a hunspell dictionary file starts downloading.

#### Event: 'spellcheck-dictionary-download-success'

Returns:

* `event` Event
* `languageCode` string - The language code of the dictionary file

Emitted when a hunspell dictionary file has been successfully downloaded.

#### Event: 'spellcheck-dictionary-download-failure'

Returns:

* `event` Event
* `languageCode` string - The language code of the dictionary file

Emitted when a hunspell dictionary file download fails.

#### Event: 'select-hid-device'

Returns:

* `event` Event
* `details` Object
  * `deviceList` [HIDDevice[]](structures/hid-device.md)
  * `frame` [WebFrameMain](web-frame-main.md) | null
* `callback` Function
  * `deviceId` string | null (optional)

Emitted when a HID device needs to be selected when a call to
`navigator.hid.requestDevice` is made.

```js
const { app, BrowserWindow } = require('electron')

let win = null

app.whenReady().then(() => {
  win = new BrowserWindow()

  win.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
    if (permission === 'hid') {
      return true
    }
    return false
  })

  win.webContents.session.on('select-hid-device', (event, details, callback) => {
    event.preventDefault()
    const selectedDevice = details.deviceList.find((device) => {
      return device.vendorId === 9025 && device.productId === 67
    })
    callback(selectedDevice?.deviceId)
  })
})
```

#### Event: 'hid-device-added'

Returns:

* `event` Event
* `details` Object
  * `device` [HIDDevice](structures/hid-device.md)
  * `frame` [WebFrameMain](web-frame-main.md) | null

Emitted after `navigator.hid.requestDevice` has been called and
`select-hid-device` has fired if a new device becomes available.

#### Event: 'hid-device-removed'

Returns:

* `event` Event
* `details` Object
  * `device` [HIDDevice](structures/hid-device.md)
  * `frame` [WebFrameMain](web-frame-main.md) | null

Emitted after `navigator.hid.requestDevice` has been called and
`select-hid-device` has fired if a device has been removed.

#### Event: 'hid-device-revoked'

Returns:

* `event` Event
* `details` Object
  * `device` [HIDDevice](structures/hid-device.md)
  * `origin` string (optional)

Emitted after `HIDDevice.forget()` has been called.

#### Event: 'select-serial-port'

Returns:

* `event` Event
* `portList` [SerialPort[]](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)
* `callback` Function
  * `portId` string

Emitted when a serial port needs to be selected when a call to
`navigator.serial.requestPort` is made.

```js
const { app, BrowserWindow } = require('electron')

let win = null

app.whenReady().then(() => {
  win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.webContents.session.on('select-serial-port', (event, portList, webContents, callback) => {
    event.preventDefault()
    const selectedPort = portList.find((device) => {
      return device.vendorId === '9025' && device.productId === '67'
    })
    if (!selectedPort) {
      callback('')
    } else {
      callback(selectedPort.portId)
    }
  })
})
```

#### Event: 'serial-port-added'

Returns:

* `event` Event
* `port` [SerialPort](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

Emitted after `navigator.serial.requestPort` has been called and
`select-serial-port` has fired if a new serial port becomes available.

#### Event: 'serial-port-removed'

Returns:

* `event` Event
* `port` [SerialPort](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

Emitted after `navigator.serial.requestPort` has been called and
`select-serial-port` has fired if a serial port has been removed.

#### Event: 'serial-port-revoked'

Returns:

* `event` Event
* `details` Object
  * `port` [SerialPort](structures/serial-port.md)
  * `frame` [WebFrameMain](web-frame-main.md) | null
  * `origin` string

Emitted after `SerialPort.forget()` has been called.

#### Event: 'select-usb-device'

Returns:

* `event` Event
* `details` Object
  * `deviceList` [USBDevice[]](structures/usb-device.md)
  * `frame` [WebFrameMain](web-frame-main.md) | null
* `callback` Function
  * `deviceId` string (optional)

Emitted when a USB device needs to be selected when a call to
`navigator.usb.requestDevice` is made.

#### Event: 'usb-device-added'

Returns:

* `event` Event
* `device` [USBDevice](structures/usb-device.md)
* `webContents` [WebContents](web-contents.md)

Emitted after `navigator.usb.requestDevice` has been called and
`select-usb-device` has fired if a new device becomes available.

#### Event: 'usb-device-removed'

Returns:

* `event` Event
* `device` [USBDevice](structures/usb-device.md)
* `webContents` [WebContents](web-contents.md)

Emitted after `navigator.usb.requestDevice` has been called and
`select-usb-device` has fired if a device has been removed.

#### Event: 'usb-device-revoked'

Returns:

* `event` Event
* `details` Object
  * `device` [USBDevice](structures/usb-device.md)
  * `origin` string (optional)

Emitted after `USBDevice.forget()` has been called.

### Instance Methods

The following methods are available on instances of `Session`:

#### `ses.getCacheSize()`

Returns `Promise<Integer>` - the session's current cache size, in bytes.

#### `ses.clearCache()`

Returns `Promise<void>` - resolves when the cache clear operation is complete.

Clears the session's HTTP cache.

#### `ses.clearStorageData([options])`

* `options` Object (optional)
  * `origin` string (optional) - Should follow `window.location.origin`'s representation `scheme://host:port`.
  * `storages` string[] (optional) - The types of storages to clear, can be
    `cookies`, `filesystem`, `indexdb`, `localstorage`,
    `shadercache`, `websql`, `serviceworkers`, `cachestorage`.
  * `quotas` string[] (optional) - The types of quotas to clear, can be `temporary`.

Returns `Promise<void>` - resolves when the storage data has been cleared.

#### `ses.flushStorageData()`

Writes any unwritten DOMStorage data to disk.

#### `ses.setProxy(config)`

* `config` [ProxyConfig](structures/proxy-config.md)

Returns `Promise<void>` - Resolves when the proxy setting process is complete.

Sets the proxy settings.

#### `ses.resolveHost(host, [options])`

* `host` string - Hostname to resolve.
* `options` Object (optional)
  * `queryType` string (optional) - Requested DNS query type. If unspecified,
    resolver will pick A or AAAA (or both) based on IPv4/IPv6 settings:
    * `A` - Fetch only A records
    * `AAAA` - Fetch only AAAA records.
  * `source` string (optional) - The source to use for resolved addresses.
    * `any` (default) - Resolver will pick an appropriate source.
    * `system` - Results will only be retrieved from the system or OS.
    * `dns` - Results will only come from DNS queries.
    * `mdns` - Results will only come from Multicast DNS queries.
    * `localOnly` - No external sources will be used.
  * `cacheUsage` string (optional) - Indicates what DNS cache entries can be used.
    * `allowed` (default) - Results may come from the host cache if non-stale.
    * `staleAllowed` - Results may come from the host cache even if stale.
    * `disallowed` - Results will not come from the host cache.
  * `secureDnsPolicy` string (optional) - Controls Secure DNS behavior.
    * `allow` (default)
    * `disable`

Returns `Promise<ResolvedHost>` - Resolves with the resolved IP addresses for the `host`.

#### `ses.resolveProxy(url)`

* `url` URL

Returns `Promise<string>` - Resolves with the proxy information for `url`.

#### `ses.forceReloadProxyConfig()`

Returns `Promise<void>` - Resolves when all internal states of proxy service is reset and the latest proxy configuration is reapplied.

#### `ses.setDownloadPath(path)`

* `path` string - The download location.

Sets download saving directory.

#### `ses.enableNetworkEmulation(options)`

* `options` Object
  * `offline` boolean (optional) - Whether to emulate network outage. Defaults to false.
  * `latency` Double (optional) - RTT in ms. Defaults to 0.
  * `downloadThroughput` Double (optional) - Download rate in Bps. Defaults to 0.
  * `uploadThroughput` Double (optional) - Upload rate in Bps. Defaults to 0.

Emulates network with the given configuration for the `session`.

```js
const win = new BrowserWindow()

// To emulate a GPRS connection with 50kbps throughput and 500 ms latency.
win.webContents.session.enableNetworkEmulation({
  latency: 500,
  downloadThroughput: 6400,
  uploadThroughput: 6400
})

// To emulate a network outage.
win.webContents.session.enableNetworkEmulation({ offline: true })
```

#### `ses.preconnect(options)`

* `options` Object
  * `url` string - URL for preconnect. Only the origin is relevant for opening the socket.
  * `numSockets` number (optional) - number of sockets to preconnect. Must be between 1 and 6. Defaults to 1.

Preconnects the given number of sockets to an origin.

#### `ses.closeAllConnections()`

Returns `Promise<void>` - Resolves when all connections are closed.

> **Note:** It will terminate / fail all requests currently in flight.

#### `ses.fetch(input[, init])`

* `input` string | GlobalRequest
* `init` RequestInit & { bypassCustomProtocolHandlers?: boolean } (optional)

Returns `Promise<GlobalResponse>` - see Response.

Sends a request, similarly to how `fetch()` works in the renderer, using
Chrome's network stack. This differs from Node's `fetch()`, which uses
Node.js's HTTP stack.

```js
async function example () {
  const response = await net.fetch('https://my.app')
  if (response.ok) {
    const body = await response.json()
    // ... use the result.
  }
}
```

#### `ses.disableNetworkEmulation()`

Disables any network emulation already active for the `session`.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function | null
  * `request` Object
    * `hostname` string
    * `certificate` [Certificate](structures/certificate.md)
    * `validatedCertificate` [Certificate](structures/certificate.md)
    * `isIssuedByKnownRoot` boolean
    * `verificationResult` string - `OK` if the certificate is trusted, otherwise an error like `CERT_REVOKED`.
    * `errorCode` Integer - Error code.
  * `callback` Function
    * `verificationResult` Integer - `0` accepts, `-2` rejects, `-3` uses chromium default.

Sets the certificate verify proc for `session`.

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.webContents.session.setCertificateVerifyProc((request, callback) => {
  const { hostname } = request
  if (hostname === 'github.com') {
    callback(0)
  } else {
    callback(-2)
  }
})
```

#### `ses.setPermissionRequestHandler(handler)`

* `handler` Function | null
  * `webContents` [WebContents](web-contents.md)
  * `permission` string - The type of requested permission.
    * `clipboard-read`, `clipboard-sanitized-write`, `display-capture`, `fullscreen`,
      `geolocation`, `idle-detection`, `media`, `mediaKeySystem`, `midi`, `midiSysex`,
      `notifications`, `pointerLock`, `keyboardLock`, `openExternal`, `speaker-selection`,
      `storage-access`, `top-level-storage-access`, `window-management`, `unknown`, `fileSystem`
  * `callback` Function
    * `permissionGranted` boolean
  * `details` PermissionRequest | FilesystemPermissionRequest | MediaAccessPermissionRequest | OpenExternalPermissionRequest

Sets the handler which can be used to respond to permission requests for the `session`.

```js
const { session } = require('electron')

session.fromPartition('some-partition').setPermissionRequestHandler((webContents, permission, callback) => {
  if (webContents.getURL() === 'some-host' && permission === 'notifications') {
    return callback(false) // denied.
  }

  callback(true)
})
```

#### `ses.setPermissionCheckHandler(handler)`

* `handler` Function<boolean> | null
  * `webContents` WebContents | null
  * `permission` string - Type of permission check.
  * `requestingOrigin` string
  * `details` Object

Sets the handler which can be used to respond to permission checks for the `session`.

```js
const { session } = require('electron')

session.fromPartition('some-partition').setPermissionCheckHandler((webContents, permission, requestingOrigin) => {
  if (new URL(requestingOrigin).hostname === 'some-host' && permission === 'notifications') {
    return true // granted
  }

  return false // denied
})
```

#### `ses.setDisplayMediaRequestHandler(handler[, opts])`

* `handler` Function | null
  * `request` Object
    * `frame` [WebFrameMain](web-frame-main.md) | null
    * `securityOrigin` String
    * `videoRequested` Boolean
    * `audioRequested` Boolean
    * `userGesture` Boolean
  * `callback` Function
    * `streams` Object
      * `video` Object | WebFrameMain (optional) - with `id` and `name` properties
      * `audio` String | WebFrameMain (optional) - can be `loopback` or `loopbackWithMute`
      * `enableLocalEcho` Boolean (optional) - Default is `false`.
* `opts` Object (optional) _macOS_ _Experimental_
  * `useSystemPicker` Boolean - Default is `false`.

This handler will be called when web content requests access to display media
via the `navigator.mediaDevices.getDisplayMedia` API.

```js
const { session, desktopCapturer } = require('electron')

session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
  desktopCapturer.getSources({ types: ['screen'] }).then((sources) => {
    // Grant access to the first screen found.
    callback({ video: sources[0] })
  })
}, { useSystemPicker: true })
```

#### `ses.setDevicePermissionHandler(handler)`

* `handler` Function<boolean> | null
  * `details` Object
    * `deviceType` string - can be `hid`, `serial`, or `usb`.
    * `origin` string
    * `device` HIDDevice | SerialPort | USBDevice

Sets the handler which can be used to respond to device permission checks for the `session`.

#### `ses.setUSBProtectedClassesHandler(handler)`

* `handler` Function<string[]> | null
  * `details` Object
    * `protectedClasses` string[] - `audio`, `audio-video`, `hid`, `mass-storage`, `smart-card`, `video`, `wireless`

Sets the handler which can override which USB classes are protected.

#### `ses.setBluetoothPairingHandler(handler)` _Windows_ _Linux_

* `handler` Function | null
  * `details` Object
    * `deviceId` string
    * `pairingKind` string - `confirm`, `confirmPin`, or `providePin`
    * `frame` [WebFrameMain](web-frame-main.md) | null
    * `pin` string (optional)
  * `callback` Function
    * `response` Object
      * `confirmed` boolean
      * `pin` string | null (optional)

Sets a handler to respond to Bluetooth pairing requests.

#### `ses.clearHostResolverCache()`

Returns `Promise<void>` - Resolves when the operation is complete.

Clears the host resolver cache.

#### `ses.allowNTLMCredentialsForDomains(domains)`

* `domains` string - A comma-separated list of servers for which integrated authentication is enabled.

```js
const { session } = require('electron')

// consider any url ending with `example.com`, `foobar.com`, `baz`
// for integrated authentication.
session.defaultSession.allowNTLMCredentialsForDomains('*example.com, *foobar.com, *baz')

// consider all urls for integrated authentication.
session.defaultSession.allowNTLMCredentialsForDomains('*')
```

#### `ses.setUserAgent(userAgent[, acceptLanguages])`

* `userAgent` string
* `acceptLanguages` string (optional)

Overrides the `userAgent` and `acceptLanguages` for this session.

#### `ses.isPersistent()`

Returns `boolean` - Whether or not this session is a persistent one.

#### `ses.getUserAgent()`

Returns `string` - The user agent for this session.

#### `ses.setSSLConfig(config)`

* `config` Object
  * `minVersion` string (optional) - Can be `tls1`, `tls1.1`, `tls1.2` or `tls1.3`. Defaults to `tls1`.
  * `maxVersion` string (optional) - Can be `tls1.2` or `tls1.3`. Defaults to `tls1.3`.
  * `disabledCipherSuites` Integer[] (optional) - List of cipher suites to disable.

Sets the SSL configuration for the session.

#### `ses.getBlobData(identifier)`

* `identifier` string - Valid UUID.

Returns `Promise<Buffer>` - resolves with blob data.

#### `ses.downloadURL(url[, options])`

* `url` string
* `options` Object (optional)
  * `headers` Record<string, string> (optional)

Initiates a download of the resource at `url`.

#### `ses.createInterruptedDownload(options)`

* `options` Object
  * `path` string - Absolute path of the download.
  * `urlChain` string[] - Complete URL chain for the download.
  * `mimeType` string (optional)
  * `offset` Integer - Start range for the download.
  * `length` Integer - Total length of the download.
  * `lastModified` string (optional)
  * `eTag` string (optional)
  * `startTime` Double (optional)

Allows resuming `cancelled` or `interrupted` downloads from previous `Session`.

#### `ses.clearAuthCache()`

Returns `Promise<void>` - resolves when the session's HTTP authentication cache has been cleared.

#### `ses.registerPreloadScript(script)`

* `script` PreloadScriptRegistration - Preload script

Registers preload script that will be executed in its associated context type.

Returns `string` - The ID of the registered preload script.

#### `ses.unregisterPreloadScript(id)`

* `id` string - Preload script ID

Unregisters script.

#### `ses.getPreloadScripts()`

Returns `PreloadScript[]` - An array of preload scripts that have been registered.

#### `ses.setCodeCachePath(path)`

* `path` String - Absolute path to store the v8 generated JS code cache.

Sets the directory to store the generated JS code cache for this session.

#### `ses.clearCodeCaches(options)`

* `options` Object
  * `urls` String[] (optional) - An array of url corresponding to the resource whose generated code cache needs to be removed.

Returns `Promise<void>` - resolves when the code cache clear operation is complete.

#### `ses.setSpellCheckerEnabled(enable)`

* `enable` boolean

Sets whether to enable the builtin spell checker.

#### `ses.isSpellCheckerEnabled()`

Returns `boolean` - Whether the builtin spell checker is enabled.

#### `ses.setSpellCheckerLanguages(languages)`

* `languages` string[] - An array of language codes to enable the spellchecker for.

#### `ses.getSpellCheckerLanguages()`

Returns `string[]` - An array of language codes the spellchecker is enabled for.

#### `ses.setSpellCheckerDictionaryDownloadURL(url)`

* `url` string - A base URL for Electron to download hunspell dictionaries from.

#### `ses.listWordsInSpellCheckerDictionary()`

Returns `Promise<string[]>` - An array of all words in app's custom dictionary.

#### `ses.addWordToSpellCheckerDictionary(word)`

* `word` string

Returns `boolean` - Whether the word was successfully written to the custom dictionary.

#### `ses.removeWordFromSpellCheckerDictionary(word)`

* `word` string

Returns `boolean` - Whether the word was successfully removed from the custom dictionary.

#### `ses.loadExtension(path[, options])` _Deprecated_

* `path` string - Path to a directory containing an unpacked Chrome extension
* `options` Object (optional)
  * `allowFileAccess` boolean - Defaults to false.

Returns `Promise<Extension>` - resolves when the extension is loaded.

**Deprecated:** Use the new `ses.extensions.loadExtension` API.

```js
const { app, session } = require('electron')

const path = require('node:path')

app.whenReady().then(async () => {
  await session.defaultSession.loadExtension(
    path.join(__dirname, 'react-devtools'),
    { allowFileAccess: true }
  )
})
```

#### `ses.removeExtension(extensionId)` _Deprecated_

* `extensionId` string - ID of extension to remove

**Deprecated:** Use the new `ses.extensions.removeExtension` API.

#### `ses.getExtension(extensionId)` _Deprecated_

* `extensionId` string

Returns `Extension | null` - The loaded extension with the given ID.

**Deprecated:** Use the new `ses.extensions.getExtension` API.

#### `ses.getAllExtensions()` _Deprecated_

Returns `Extension[]` - A list of all loaded extensions.

**Deprecated:** Use the new `ses.extensions.getAllExtensions` API.

#### `ses.getStoragePath()`

Returns `string | null` - The absolute file system path where data for this session is persisted on disk. Returns `null` for in-memory sessions.

#### `ses.clearData([options])`

* `options` Object (optional)
  * `dataTypes` String[] (optional) - The types of data to clear:
    `backgroundFetch`, `cache`, `cookies`, `downloads`, `fileSystems`,
    `indexedDB`, `localStorage`, `serviceWorkers`, `webSQL`
  * `origins` String[] (optional) - Clear data for only these origins.
  * `excludeOrigins` String[] (optional) - Clear data for all origins except these.
  * `avoidClosingConnections` boolean (optional) - Default: `false`.
  * `originMatchingMode` String (optional) - `third-parties-included` (default) or `origin-in-all-contexts`.

Returns `Promise<void>` - resolves when all data has been cleared.

#### `ses.getSharedDictionaryUsageInfo()`

Returns `Promise<SharedDictionaryUsageInfo[]>` - an array of shared dictionary information entries.

#### `ses.getSharedDictionaryInfo(options)`

* `options` Object
  * `frameOrigin` string
  * `topFrameSite` string

Returns `Promise<SharedDictionaryInfo[]>` - an array of shared dictionary information entries.

#### `ses.clearSharedDictionaryCache()`

Returns `Promise<void>` - resolves when the dictionary cache has been cleared.

#### `ses.clearSharedDictionaryCacheForIsolationKey(options)`

* `options` Object
  * `frameOrigin` string
  * `topFrameSite` string

Returns `Promise<void>` - resolves when the dictionary cache has been cleared for the specified isolation key.

### Instance Properties

The following properties are available on instances of `Session`:

#### `ses.availableSpellCheckerLanguages` _Readonly_

A `string[]` array which consists of all the known available spell checker languages.

#### `ses.spellCheckerEnabled`

A `boolean` indicating whether builtin spell checker is enabled.

#### `ses.storagePath` _Readonly_

A `string | null` indicating the absolute file system path where data for this
session is persisted on disk. For in memory sessions this returns `null`.

#### `ses.cookies` _Readonly_

A [`Cookies`](cookies.md) object for this session.

#### `ses.extensions` _Readonly_

A [`Extensions`](extensions-api.md) object for this session.

#### `ses.serviceWorkers` _Readonly_

A [`ServiceWorkers`](service-workers.md) object for this session.

#### `ses.webRequest` _Readonly_

A [`WebRequest`](web-request.md) object for this session.

#### `ses.protocol` _Readonly_

A [`Protocol`](protocol.md) object for this session.

```js
const { app, session } = require('electron')

const path = require('node:path')

app.whenReady().then(() => {
  const protocol = session.fromPartition('some-partition').protocol
  if (!protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(path.join(__dirname, url)) })
  })) {
    console.error('Failed to register protocol')
  }
})
```

#### `ses.netLog` _Readonly_

A [`NetLog`](net-log.md) object for this session.

```js
const { app, session } = require('electron')

app.whenReady().then(async () => {
  const netLog = session.fromPartition('some-partition').netLog
  netLog.startLogging('/path/to/net-log')
  // After some network events
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```
