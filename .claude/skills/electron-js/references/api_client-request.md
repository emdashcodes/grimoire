---
title: "Class: ClientRequest"
source_url: https://www.electronjs.org/docs/latest/api/client-request
---

# Class: ClientRequest

> Make HTTP/HTTPS requests.

Process: [Main](/docs/latest/glossary#main-process), [Utility](/docs/latest/glossary#utility-process)
_This class is not exported from the `'electron'` module. It is only available as a return value of other methods in the Electron API._

`ClientRequest` implements the [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams) interface and is therefore an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### `new ClientRequest(options)`

*   `options` (Object | string) - If `options` is a string, it is interpreted as the request URL. If it is an object, it is expected to fully specify an HTTP request via the following properties:
    *   `method` string (optional) - The HTTP request method. Defaults to the GET method.
    *   `url` string (optional) - The request URL. Must be provided in the absolute form with the protocol scheme specified as http or https.
    *   `headers` Record<string, string | string[]> (optional) - Headers to be sent with the request.
    *   `session` Session (optional) - The Session instance with which the request is associated.
    *   `partition` string (optional) - The name of the partition with which the request is associated.
    *   `bypassCustomProtocolHandlers` boolean (optional) - When set to `true`, custom protocol handlers will not be called. Defaults to `false`.
    *   `credentials` string (optional) - Can be `include`, `omit` or `same-origin`.
    *   `useSessionCookies` boolean (optional) - Whether to send cookies with this request from the provided session. Default is `false`.
    *   `protocol` string (optional) - Can be `http:` or `https:`. Defaults to 'http:'.
    *   `host` string (optional) - The server host provided as 'hostname:port'.
    *   `hostname` string (optional) - The server host name.
    *   `port` Integer (optional) - The server's listening port number.
    *   `path` string (optional) - The path part of the request URL.
    *   `redirect` string (optional) - Can be `follow`, `error` or `manual`. Defaults to `follow`.
    *   `origin` string (optional) - The origin URL of the request.
    *   `referrerPolicy` string (optional) - Defaults to `strict-origin-when-cross-origin`.
    *   `cache` string (optional) - can be `default`, `no-store`, `reload`, `no-cache`, `force-cache` or `only-if-cached`.
    *   `priority` string (optional) - can be `throttled`, `idle`, `lowest`, `low`, `medium`, or `highest`. Defaults to `idle`.
    *   `priorityIncremental` boolean (optional) - Default is `true`.

### Instance Events

#### Event: 'response'

Returns:

*   `response` [IncomingMessage](/docs/latest/api/incoming-message) - An object representing the HTTP response message.

#### Event: 'login'

Returns:

*   `authInfo` Object
    *   `isProxy` boolean
    *   `scheme` string
    *   `host` string
    *   `port` Integer
    *   `realm` string
*   `callback` Function
    *   `username` string (optional)
    *   `password` string (optional)

Emitted when an authenticating proxy is asking for user credentials.

#### Event: 'finish'

Emitted just after the last chunk of the `request`'s data has been written into the `request` object.

#### Event: 'abort'

Emitted when the `request` is aborted.

#### Event: 'error'

Returns:

*   `error` Error - an error object providing some information about the failure.

Emitted when the `net` module fails to issue a network request.

#### Event: 'close'

Emitted as the last event in the HTTP request-response transaction.

#### Event: 'redirect'

Returns:

*   `statusCode` Integer
*   `method` string
*   `redirectUrl` string
*   `responseHeaders` Record<string, string[]>

Emitted when the server returns a redirect response. Calling `request.followRedirect` will continue with the redirection.

### Instance Properties

#### `request.chunkedEncoding`

A `boolean` specifying whether the request will use HTTP chunked transfer encoding or not. Defaults to false.

### Instance Methods

#### `request.setHeader(name, value)`

*   `name` string - An extra HTTP header name.
*   `value` string - An extra HTTP header value.

Adds an extra HTTP header. Can be called only before first write.

#### `request.getHeader(name)`

Returns `string` - The value of a previously set extra header name.

#### `request.removeHeader(name)`

Removes a previously set extra header name. Can be called only before first write.

#### `request.write(chunk[, encoding][, callback])`

*   `chunk` (string | Buffer) - A chunk of the request body's data.
*   `encoding` string (optional) - Defaults to 'utf-8'.
*   `callback` Function (optional) - Called after the write operation ends.

Adds a chunk of data to the request body.

#### `request.end([chunk][, encoding][, callback])`

Returns `this`.

Sends the last chunk of the request data.

#### `request.abort()`

Cancels an ongoing HTTP transaction.

#### `request.followRedirect()`

Continues any pending redirection. Can only be called during a `'redirect'` event.

#### `request.getUploadProgress()`

Returns `Object`:

*   `active` boolean - Whether the request is currently active.
*   `started` boolean - Whether the upload has started.
*   `current` Integer - The number of bytes that have been uploaded so far.
*   `total` Integer - The number of bytes that will be uploaded this request.