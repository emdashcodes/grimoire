---
title: app
source_url: https://www.electronjs.org/docs/latest/api/app
---

# app

> Control your application's event lifecycle.

Process: [Main](/docs/latest/glossary#main-process)

The following example shows how to quit the application when the last window is closed:

```
const { app } = require('electron')app.on('window-all-closed', () => {  app.quit()})
```

## Events

The `app` object emits the following events:

### Event: 'will-finish-launching'

Emitted when the application has finished basic startup. On Windows and Linux, the `will-finish-launching` event is the same as the `ready` event; on macOS, this event represents the `applicationWillFinishLaunching` notification of `NSApplication`.

In most cases, you should do everything in the `ready` event handler.

### Event: 'ready'

Returns:

*   `event` Event
*   `launchInfo` Record<string, any> | [NotificationResponse](/docs/latest/api/structures/notification-response) _macOS_

Emitted once, when Electron has finished initializing. On macOS, `launchInfo` holds the `userInfo` of the [`NSUserNotification`](https://developer.apple.com/documentation/foundation/nsusernotification) or information from [`UNNotificationResponse`](https://developer.apple.com/documentation/usernotifications/unnotificationresponse) that was used to open the application, if it was launched from Notification Center. You can also call `app.isReady()` to check if this event has already fired and `app.whenReady()` to get a Promise that is fulfilled when Electron is initialized.

note

The `ready` event is only fired after the main process has finished running the first tick of the event loop. If an Electron API needs to be called before the `ready` event, ensure that it is called synchronously in the top-level context of the main process.

### Event: 'window-all-closed'

Emitted when all windows have been closed.

If you do not subscribe to this event and all windows are closed, the default behavior is to quit the app; however, if you subscribe, you control whether the app quits or not. If the user pressed `Cmd + Q`, or the developer called `app.quit()`, Electron will first try to close all the windows and then emit the `will-quit` event, and in this case the `window-all-closed` event would not be emitted.

### Event: 'before-quit'

Returns:

*   `event` Event

Emitted before the application starts closing its windows. Calling `event.preventDefault()` will prevent the default behavior, which is terminating the application.

note

If application quit was initiated by `autoUpdater.quitAndInstall()`, then `before-quit` is emitted _after_ emitting `close` event on all windows and closing them.

note

On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### Event: 'will-quit'

Returns:

*   `event` Event

Emitted when all windows have been closed and the application will quit. Calling `event.preventDefault()` will prevent the default behavior, which is terminating the application.

See the description of the `window-all-closed` event for the differences between the `will-quit` and `window-all-closed` events.

note

On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### Event: 'quit'

Returns:

*   `event` Event
*   `exitCode` Integer

Emitted when the application is quitting.

note

On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### Event: 'open-file' _macOS_

Returns:

*   `event` Event
*   `path` string

Emitted when the user wants to open a file with the application. The `open-file` event is usually emitted when the application is already open and the OS wants to reuse the application to open the file. `open-file` is also emitted when a file is dropped onto the dock and the application is not yet running. Make sure to listen for the `open-file` event very early in your application startup to handle this case (even before the `ready` event is emitted).

You should call `event.preventDefault()` if you want to handle this event.

On Windows, you have to parse `process.argv` (in the main process) to get the filepath.

### Event: 'open-url' _macOS_

Returns:

*   `event` Event
*   `url` string

Emitted when the user wants to open a URL with the application. Your application's `Info.plist` file must define the URL scheme within the `CFBundleURLTypes` key, and set `NSPrincipalClass` to `AtomApplication`.

As with the `open-file` event, be sure to register a listener for the `open-url` event early in your application startup to detect if the application is being opened to handle a URL. If you register the listener in response to a `ready` event, you'll miss URLs that trigger the launch of your application.

### Event: 'activate' _macOS_

Returns:

*   `event` Event
*   `hasVisibleWindows` boolean

Emitted when the application is activated. Various actions can trigger this event, such as launching the application for the first time, attempting to re-launch the application when it's already running, or clicking on the application's dock or taskbar icon.

### Event: 'did-become-active' _macOS_

Returns:

*   `event` Event

Emitted when the application becomes active. This differs from the `activate` event in that `did-become-active` is emitted every time the app becomes active, not only when Dock icon is clicked or application is re-launched. It is also emitted when a user switches to the app via the macOS App Switcher.

### Event: 'did-resign-active' _macOS_

Returns:

*   `event` Event

Emitted when the app is no longer active and doesn't have focus. This can be triggered, for example, by clicking on another application or by using the macOS App Switcher to switch to another application.

### Event: 'continue-activity' _macOS_

Returns:

*   `event` Event
*   `type` string - A string identifying the activity. Maps to [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
*   `userInfo` unknown - Contains app-specific state stored by the activity on another device.
*   `details` Object
    *   `webpageURL` string (optional) - A string identifying the URL of the webpage accessed by the activity on another device, if available.

Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) when an activity from a different device wants to be resumed. You should call `event.preventDefault()` if you want to handle this event.

A user activity can be continued only in an app that has the same developer Team ID as the activity's source app and that supports the activity's type. Supported activity types are specified in the app's `Info.plist` under the `NSUserActivityTypes` key.

### Event: 'will-continue-activity' _macOS_

Returns:

*   `event` Event
*   `type` string - A string identifying the activity. Maps to [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) before an activity from a different device wants to be resumed. You should call `event.preventDefault()` if you want to handle this event.

### Event: 'continue-activity-error' _macOS_

Returns:

*   `event` Event
*   `type` string - A string identifying the activity. Maps to [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
*   `error` string - A string with the error's localized description.

Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) when an activity from a different device fails to be resumed.

### Event: 'activity-was-continued' _macOS_

Returns:

*   `event` Event
*   `type` string - A string identifying the activity. Maps to [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
*   `userInfo` unknown - Contains app-specific state stored by the activity.

Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) after an activity from this device was successfully resumed on another one.

### Event: 'update-activity-state' _macOS_

Returns:

*   `event` Event
*   `type` string - A string identifying the activity. Maps to [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
*   `userInfo` unknown - Contains app-specific state stored by the activity.

Emitted when [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) is about to be resumed on another device. If you need to update the state to be transferred, you should call `event.preventDefault()` immediately, construct a new `userInfo` dictionary and call `app.updateCurrentActivity()` in a timely manner. Otherwise, the operation will fail and `continue-activity-error` will be called.

### Event: 'new-window-for-tab' _macOS_

Returns:

*   `event` Event

Emitted when the user clicks the native macOS new tab button. The new tab button is only visible if the current `BrowserWindow` has a `tabbingIdentifier`

### Event: 'browser-window-blur'

Returns:

*   `event` Event
*   `window` [BrowserWindow](/docs/latest/api/browser-window)

Emitted when a [browserWindow](/docs/latest/api/browser-window) gets blurred.

### Event: 'browser-window-focus'

Returns:

*   `event` Event
*   `window` [BrowserWindow](/docs/latest/api/browser-window)

Emitted when a [browserWindow](/docs/latest/api/browser-window) gets focused.

### Event: 'browser-window-created'

Returns:

*   `event` Event
*   `window` [BrowserWindow](/docs/latest/api/browser-window)

Emitted when a new [browserWindow](/docs/latest/api/browser-window) is created.

### Event: 'web-contents-created'

Returns:

*   `event` Event
*   `webContents` [WebContents](/docs/latest/api/web-contents)

Emitted when a new [webContents](/docs/latest/api/web-contents) is created.

### Event: 'certificate-error'

Returns:

*   `event` Event
*   `webContents` [WebContents](/docs/latest/api/web-contents)
*   `url` string
*   `error` string - The error code
*   `certificate` [Certificate](/docs/latest/api/structures/certificate)
*   `callback` Function
    *   `isTrusted` boolean - Whether to consider the certificate as trusted
*   `isMainFrame` boolean

Emitted when failed to verify the `certificate` for `url`, to trust the certificate you should prevent the default behavior with `event.preventDefault()` and call `callback(true)`.

```
const { app } = require('electron')app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {  if (url === 'https://github.com') {    // Verification logic.    event.preventDefault()    callback(true)  } else {    callback(false)  }})
```

### Event: 'select-client-certificate'

Returns:

*   `event` Event
*   `webContents` [WebContents](/docs/latest/api/web-contents)
*   `url` URL
*   `certificateList` [Certificate\[\]](/docs/latest/api/structures/certificate)
*   `callback` Function
    *   `certificate` [Certificate](/docs/latest/api/structures/certificate) (optional)

Emitted when a client certificate is requested.

The `url` corresponds to the navigation entry requesting the client certificate and `callback` can be called with an entry filtered from the list. Using `event.preventDefault()` prevents the application from using the first certificate from the store.

```
const { app } = require('electron')app.on('select-client-certificate', (event, webContents, url, list, callback) => {  event.preventDefault()  callback(list[0])})
```

### Event: 'login'

Returns:

*   `event` Event
*   `webContents` [WebContents](/docs/latest/api/web-contents) (optional)
*   `authenticationResponseDetails` Object
    *   `url` URL
    *   `pid` number
*   `authInfo` Object
    *   `isProxy` boolean
    *   `scheme` string
    *   `host` string
    *   `port` Integer
    *   `realm` string
*   `callback` Function
    *   `username` string (optional)
    *   `password` string (optional)

Emitted when `webContents` or [Utility process](/docs/latest/glossary#utility-process) wants to do basic auth.

The default behavior is to cancel all authentications. To override this you should prevent the default behavior with `event.preventDefault()` and call `callback(username, password)` with the credentials.

```
const { app } = require('electron')app.on('login', (event, webContents, details, authInfo, callback) => {  event.preventDefault()  callback('username', 'secret')})
```

If `callback` is called without a username or password, the authentication request will be cancelled and the authentication error will be returned to the page.

### Event: 'gpu-info-update'

Emitted whenever there is a GPU info update.

### Event: 'render-process-gone'

Returns:

*   `event` Event
*   `webContents` [WebContents](/docs/latest/api/web-contents)
*   `details` [RenderProcessGoneDetails](/docs/latest/api/structures/render-process-gone-details)

Emitted when the renderer process unexpectedly disappears. This is normally because it was crashed or killed.

### Event: 'child-process-gone'

Returns:

*   `event` Event
*   `details` Object
    *   `type` string - Process type. One of the following values:
        *   `Utility`
        *   `Zygote`
        *   `Sandbox helper`
        *   `GPU`
        *   `Pepper Plugin`
        *   `Pepper Plugin Broker`
        *   `Unknown`
    *   `reason` string - The reason the child process is gone. Possible values:
        *   `clean-exit` - Process exited with an exit code of zero
        *   `abnormal-exit` - Process exited with a non-zero exit code
        *   `killed` - Process was sent a SIGTERM or otherwise killed externally
        *   `crashed` - Process crashed
        *   `oom` - Process ran out of memory
        *   `launch-failed` - Process never successfully launched
        *   `integrity-failure` - Windows code integrity checks failed
        *   `memory-eviction` - Process proactively terminated to prevent a future out-of-memory (OOM) situation
    *   `exitCode` number - The exit code for the process (e.g. status from waitpid if on POSIX, from GetExitCodeProcess on Windows).
    *   `serviceName` string (optional) - The non-localized name of the process.
    *   `name` string (optional) - The name of the process. Examples for utility: `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`, etc.

Emitted when the child process unexpectedly disappears. This is normally because it was crashed or killed. It does not include renderer processes.

### Event: 'accessibility-support-changed' _macOS_ _Windows_

Returns:

*   `event` Event
*   `accessibilitySupportEnabled` boolean - `true` when Chrome's accessibility support is enabled, `false` otherwise.

Emitted when Chrome's accessibility support changes. This event fires when assistive technologies, such as screen readers, are enabled or disabled. See [https://www.chromium.org/developers/design-documents/accessibility](https://www.chromium.org/developers/design-documents/accessibility) for more details.

### Event: 'session-created'

Returns:

*   `session` [Session](/docs/latest/api/session)

Emitted when Electron has created a new `session`.

```
const { app } = require('electron')app.on('session-created', (session) => {  console.log(session)})
```

### Event: 'second-instance'

Returns:

*   `event` Event
*   `argv` string\[\] - An array of the second instance's command line arguments
*   `workingDirectory` string - The second instance's working directory
*   `additionalData` unknown - A JSON object of additional data passed from the second instance

This event will be emitted inside the primary instance of your application when a second instance has been executed and calls `app.requestSingleInstanceLock()`.

`argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Usually applications respond to this by making their primary window focused and non-minimized.

note

`argv` will not be exactly the same list of arguments as those passed to the second instance. The order might change and additional arguments might be appended. If you need to maintain the exact same arguments, it's advised to use `additionalData` instead.

note

If the second instance is started by a different user than the first, the `argv` array will not include the arguments.

This event is guaranteed to be emitted after the `ready` event of `app` gets emitted.

note

Extra command line arguments might be added by Chromium, such as `--original-process-start-time`.

## Methods

The `app` object has the following methods:

note

Some methods are only available on specific operating systems and are labeled as such.

### `app.quit()`

Try to close all windows. The `before-quit` event will be emitted first. If all windows are successfully closed, the `will-quit` event will be emitted and by default the application will terminate.

This method guarantees that all `beforeunload` and `unload` event handlers are correctly executed. It is possible that a window cancels the quitting by returning `false` in the `beforeunload` event handler.

### `app.exit([exitCode])`

*   `exitCode` Integer (optional)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

All windows will be closed immediately without asking the user, and the `before-quit` and `will-quit` events will not be emitted.

### `app.relaunch([options])`

*   `options` Object (optional)
    *   `args` string\[\] (optional)
    *   `execPath` string (optional)

Relaunches the app when the current instance exits.

By default, the new instance will use the same working directory and command line arguments as the current instance. When `args` is specified, the `args` will be passed as the command line arguments instead. When `execPath` is specified, the `execPath` will be executed for the relaunch instead of the current app.

Note that this method does not quit the app when executed. You have to call `app.quit` or `app.exit` after calling `app.relaunch` to make the app restart.

When `app.relaunch` is called multiple times, multiple instances will be started after the current instance exits.

An example of restarting the current instance immediately and adding a new command line argument to the new instance:

```
const { app } = require('electron')app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })app.exit(0)
```

### `app.isReady()`

Returns `boolean` - `true` if Electron has finished initializing, `false` otherwise. See also `app.whenReady()`.

### `app.whenReady()`

Returns `Promise<void>` - fulfilled when Electron is initialized. May be used as a convenient alternative to checking `app.isReady()` and subscribing to the `ready` event if the app is not ready yet.

### `app.focus([options])`

*   `options` Object (optional)
    *   `steal` boolean _macOS_ - Make the receiver the active app even if another app is currently active.

On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

You should seek to use the `steal` option as sparingly as possible.

### `app.hide()` _macOS_

Hides all application windows without minimizing them.

### `app.isHidden()` _macOS_

Returns `boolean` - `true` if the application—including all of its windows—is hidden (e.g. with `Command-H`), `false` otherwise.

### `app.show()` _macOS_

Shows application windows after they were hidden. Does not automatically focus them.

### `app.setAppLogsPath([path])`

*   `path` string (optional) - A custom path for your logs. Must be absolute.

Sets or creates a directory your app's logs which can then be manipulated with `app.getPath()` or `app.setPath(pathName, newPath)`.

Calling `app.setAppLogsPath()` without a `path` parameter will result in this directory being set to `~/Library/Logs/YourAppName` on _macOS_, and inside the `userData` directory on _Linux_ and _Windows_.

### `app.getAppPath()`

Returns `string` - The current application directory.

### `app.getPath(name)`

*   `name` string - You can request the following paths by the name:
    *   `home` User's home directory.
    *   `appData` Per-user application data directory, which by default points to:
        *   `%APPDATA%` on Windows
        *   `$XDG_CONFIG_HOME` or `~/.config` on Linux
        *   `~/Library/Application Support` on macOS
    *   `assets` The directory where app assets such as `resources.pak` are stored. By default this is the same as the folder containing the `exe` path. Available on Windows and Linux only.
    *   `userData` The directory for storing your app's configuration files, which by default is the `appData` directory appended with your app's name. By convention files storing user data should be written to this directory, and it is not recommended to write large files here because some environments may backup this directory to cloud storage.
    *   `sessionData` The directory for storing data generated by `Session`, such as localStorage, cookies, disk cache, downloaded dictionaries, network state, DevTools files. By default this points to `userData`. Chromium may write very large disk cache here, so if your app does not rely on browser storage like localStorage or cookies to save user data, it is recommended to set this directory to other locations to avoid polluting the `userData` directory.
    *   `temp` Temporary directory.
    *   `exe` The current executable file.
    *   `module` The location of the Chromium module. By default this is synonymous with `exe`.
    *   `desktop` The current user's Desktop directory.
    *   `documents` Directory for a user's "My Documents".
    *   `downloads` Directory for a user's downloads.
    *   `music` Directory for a user's music.
    *   `pictures` Directory for a user's pictures.
    *   `videos` Directory for a user's videos.
    *   `recent` Directory for the user's recent files (Windows only).
    *   `logs` Directory for your app's log folder.
    *   `crashDumps` Directory where crash dumps are stored.

Returns `string` - A path to a special directory or file associated with `name`. On failure, an `Error` is thrown.

If `app.getPath('logs')` is called without called `app.setAppLogsPath()` being called first, a default log directory will be created equivalent to calling `app.setAppLogsPath()` without a `path` parameter.

### `app.getFileIcon(path[, options])`

*   `path` string
*   `options` Object (optional)
    *   `size` string
        *   `small` - 16x16
        *   `normal` - 32x32
        *   `large` - 48x48 on _Linux_, 32x32 on _Windows_, unsupported on _macOS_.

Returns `Promise<NativeImage>` - fulfilled with the app's icon, which is a [NativeImage](/docs/latest/api/native-image).

Fetches a path's associated icon.

On _Windows_, there a 2 kinds of icons:

*   Icons associated with certain file extensions, like `.mp3`, `.png`, etc.
*   Icons inside the file itself, like `.exe`, `.dll`, `.ico`.

On _Linux_ and _macOS_, icons depend on the application associated with file mime type.

### `app.setPath(name, path)`

*   `name` string
*   `path` string

Overrides the `path` to a special directory or file associated with `name`. If the path specifies a directory that does not exist, an `Error` is thrown. In that case, the directory should be created with `fs.mkdirSync` or similar.

You can only override paths of a `name` defined in `app.getPath`.

By default, web pages' cookies and caches will be stored under the `sessionData` directory. If you want to change this location, you have to override the `sessionData` path before the `ready` event of the `app` module is emitted.

### `app.getVersion()`

Returns `string` - The version of the loaded application. If no version is found in the application's `package.json` file, the version of the current bundle or executable is returned.

### `app.getName()`

Returns `string` - The current application's name, which is the name in the application's `package.json` file.

Usually the `name` field of `package.json` is a short lowercase name, according to the npm modules spec. You should usually also specify a `productName` field, which is your application's full capitalized name, and which will be preferred over `name` by Electron.

### `app.setName(name)`

*   `name` string

Overrides the current application's name.

note

This function overrides the name used internally by Electron; it does not affect the name that the OS uses.

### `app.getLocale()`

Returns `string` - The current application locale, fetched using Chromium's `l10n_util` library. Possible return values are documented [here](https://source.chromium.org/chromium/chromium/src/+/main:ui/base/l10n/l10n_util.cc).

To set the locale, you'll want to use a command line switch at app startup, which may be found [here](/docs/latest/api/command-line-switches).

note

When distributing your packaged app, you have to also ship the `locales` folder.

note

This API must be called after the `ready` event is emitted.

note

To see example return values of this API compared to other locale and language APIs, see [`app.getPreferredSystemLanguages()`](#appgetpreferredsystemlanguages).

### `app.getLocaleCountryCode()`

Returns `string` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

note

When unable to detect locale country code, it returns empty string.

### `app.getSystemLocale()`

Returns `string` - The current system locale. On Windows and Linux, it is fetched using Chromium's `i18n` library. On macOS, `[NSLocale currentLocale]` is used instead. To get the user's current system language, which is not always the same as the locale, it is better to use [`app.getPreferredSystemLanguages()`](#appgetpreferredsystemlanguages).

Different operating systems also use the regional data differently:

*   Windows 11 uses the regional format for numbers, dates, and times.
*   macOS Monterey uses the region for formatting numbers, dates, times, and for selecting the currency symbol to use.

Therefore, this API can be used for purposes such as choosing a format for rendering dates and times in a calendar app, especially when the developer wants the format to be consistent with the OS.

note

This API must be called after the `ready` event is emitted.

note

To see example return values of this API compared to other locale and language APIs, see [`app.getPreferredSystemLanguages()`](#appgetpreferredsystemlanguages).

### `app.getPreferredSystemLanguages()`

Returns `string[]` - The user's preferred system languages from most preferred to least preferred, including the country codes if applicable. A user can modify and add to this list on Windows or macOS through the Language and Region settings.

The API uses `GlobalizationPreferences` (with a fallback to `GetSystemPreferredUILanguages`) on Windows, `\[NSLocale preferredLanguages\]` on macOS, and `g_get_language_names` on Linux.

This API can be used for purposes such as deciding what language to present the application in.

Here are some examples of return values of the various language and locale APIs with different configurations:

On Windows, given application locale is German, the regional format is Finnish (Finland), and the preferred system languages from most to least preferred are French (Canada), English (US), Simplified Chinese (China), Finnish, and Spanish (Latin America):

```
app.getLocale() // 'de'app.getSystemLocale() // 'fi-FI'app.getPreferredSystemLanguages() // ['fr-CA', 'en-US', 'zh-Hans-CN', 'fi', 'es-419']
```

On macOS, given the application locale is German, the region is Finland, and the preferred system languages from most to least preferred are French (Canada), English (US), Simplified Chinese, and Spanish (Latin America):

```
app.getLocale() // 'de'app.getSystemLocale() // 'fr-FI'app.getPreferredSystemLanguages() // ['fr-CA', 'en-US', 'zh-Hans-FI', 'es-419']
```

Both the available languages and regions and the possible return values differ between the two operating systems.

As can be seen with the example above, on Windows, it is possible that a preferred system language has no country code, and that one of the preferred system languages corresponds with the language used for the regional format. On macOS, the region serves more as a default country code: the user doesn't need to have Finnish as a preferred language to use Finland as the region,and the country code `FI` is used as the country code for preferred system languages that do not have associated countries in the language name.

### `app.addRecentDocument(path)` _macOS_ _Windows_

*   `path` string

Adds `path` to the recent documents list.

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.

### `app.clearRecentDocuments()` _macOS_ _Windows_

Clears the recent documents list.

### `app.getRecentDocuments()` _macOS_ _Windows_

Returns `string[]` - An array containing documents in the most recent documents list.

```
const { app } = require('electron')const path = require('node:path')const file = path.join(app.getPath('desktop'), 'foo.txt')app.addRecentDocument(file)const recents = app.getRecentDocuments()console.log(recents) // ['/path/to/desktop/foo.txt'}
```

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

*   `protocol` string - The name of your protocol, without `://`. For example, if you want your app to handle `electron://` links, call this method with `electron` as the parameter.
*   `path` string (optional) _Windows_ - The path to the Electron executable. Defaults to `process.execPath`
*   `args` string\[\] (optional) _Windows_ - Arguments passed to the executable. Defaults to an empty array

Returns `boolean` - Whether the call succeeded.

Sets the current executable as the default handler for a protocol (aka URI scheme). It allows you to integrate your app deeper into the operating system. Once registered, all links with `your-protocol://` will be opened with the current executable. The whole link, including protocol, will be passed to your application as a parameter.

note

On macOS, you can only register protocols that have been added to your app's `info.plist`, which cannot be modified at runtime. However, you can change the file during build time via [Electron Forge](https://www.electronforge.io/), [Electron Packager](https://github.com/electron/packager), or by editing `info.plist` with a text editor. Please refer to [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) for details.

note

In a Windows Store environment (when packaged as an `appx`) this API will return `true` for all calls but the registry key it sets won't be accessible by other applications. In order to register your Windows Store application as a default protocol handler you must [declare the protocol in your manifest](https://learn.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

The API uses the Windows Registry and `LSSetDefaultHandlerForURLScheme` internally.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` _macOS_ _Windows_

*   `protocol` string - The name of your protocol, without `://`.
*   `path` string (optional) _Windows_ - Defaults to `process.execPath`
*   `args` string\[\] (optional) _Windows_ - Defaults to an empty array

Returns `boolean` - Whether the call succeeded.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])`

*   `protocol` string - The name of your protocol, without `://`.
*   `path` string (optional) _Windows_ - Defaults to `process.execPath`
*   `args` string\[\] (optional) _Windows_ - Defaults to an empty array

Returns `boolean` - Whether the current executable is the default handler for a protocol (aka URI scheme).

note

On macOS, you can use this method to check if the app has been registered as the default protocol handler for a protocol. You can also verify this by checking `~/Library/Preferences/com.apple.LaunchServices.plist` on the macOS machine. Please refer to [Apple's documentation](https://developer.apple.com/documentation/coreservices/1441725-lscopydefaulthandlerforurlscheme?language=objc) for details.

The API uses the Windows Registry and `LSCopyDefaultHandlerForURLScheme` internally.

### `app.getApplicationNameForProtocol(url)`

*   `url` string - a URL with the protocol name to check. Unlike the other methods in this family, this accepts an entire URL, including `://` at a minimum (e.g. `https://`).

Returns `string` - Name of the application handling the protocol, or an empty string if there is no handler. For instance, if Electron is the default handler of the URL, this could be `Electron` on Windows and Mac. However, don't rely on the precise format which is not guaranteed to remain unchanged. Expect a different format on Linux, possibly with a `.desktop` suffix.

This method returns the application name of the default handler for the protocol (aka URI scheme) of a URL.

### `app.getApplicationInfoForProtocol(url)` _macOS_ _Windows_

*   `url` string - a URL with the protocol name to check. Unlike the other methods in this family, this accepts an entire URL, including `://` at a minimum (e.g. `https://`).

Returns `Promise<Object>` - Resolve with an object containing the following:

*   `icon` NativeImage - the display icon of the app handling the protocol.
*   `path` string - installation path of the app handling the protocol.
*   `name` string - display name of the app handling the protocol.

This method returns a promise that contains the application name, icon and path of the default handler for the protocol (aka URI scheme) of a URL.

### `app.setUserTasks(tasks)` _Windows_

*   `tasks` [Task\[\]](/docs/latest/api/structures/task) - Array of `Task` objects

Adds `tasks` to the [Tasks](https://learn.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks) category of the Jump List on Windows.

`tasks` is an array of [Task](/docs/latest/api/structures/task) objects.

Returns `boolean` - Whether the call succeeded.

note

If you'd like to customize the Jump List even more use `app.setJumpList(categories)` instead.

### `app.getJumpListSettings()` _Windows_

Returns `Object`:

*   `minItems` Integer - The minimum number of items that will be shown in the Jump List (for a more detailed description of this value see the [MSDN docs](https://learn.microsoft.com/en-us/windows/win32/api/shobjidl_core/nf-shobjidl_core-icustomdestinationlist-beginlist)).
*   `removedItems` [JumpListItem\[\]](/docs/latest/api/structures/jump-list-item) - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. These items must not be re-added to the Jump List in the **next** call to `app.setJumpList()`, Windows will not display any custom category that contains any of the removed items.

### `app.setJumpList(categories)` _Windows_

*   `categories` [JumpListCategory\[\]](/docs/latest/api/structures/jump-list-category) | `null` - Array of `JumpListCategory` objects.

Returns `string`

Sets or removes a custom Jump List for the application, and returns one of the following strings:

*   `ok` - Nothing went wrong.
*   `error` - One or more errors occurred, enable runtime logging to figure out the likely cause.
*   `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
*   `fileTypeRegistrationError` - An attempt was made to add a file link to the Jump List for a file type the app isn't registered to handle.
*   `customCategoryAccessDeniedError` - Custom categories can't be added to the Jump List due to user privacy or group policy settings.

If `categories` is `null` the previously set custom Jump List (if any) will be replaced by the standard Jump List for the app (managed by Windows).

note

If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.

note

Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Any attempt to re-add a removed item to a custom category earlier than that will result in the entire custom category being omitted from the Jump List. The list of removed items can be obtained using `app.getJumpListSettings()`.

note

The maximum length of a Jump List item's `description` property is 260 characters. Beyond this limit, the item will not be added to the Jump List, nor will it be displayed.

### `app.requestSingleInstanceLock([additionalData])`

*   `additionalData` Record<any, any> (optional) - A JSON object containing additional data to send to the first instance.

Returns `boolean`

The return value of this method indicates whether or not this instance of your application successfully obtained the lock. If it failed to obtain the lock, you can assume that another instance of your application is already running with the lock and exit immediately.

I.e. This method returns `true` if your process is the primary instance of your application and your app should continue loading. It returns `false` if your process should immediately quit as it has sent its parameters to another instance that has already acquired the lock.

On macOS, the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line, the system's single instance mechanism will be bypassed, and you have to use this method to ensure single instance.

### `app.hasSingleInstanceLock()`

Returns `boolean`

This method returns whether or not this instance of your app is currently holding the single instance lock. You can request the lock with `app.requestSingleInstanceLock()` and release with `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS_

*   `type` string - Uniquely identifies the activity. Maps to [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
*   `userInfo` any - App-specific state to store for use by another device.
*   `webpageURL` string (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) to another device afterward.

### `app.getCurrentActivityType()` _macOS_

Returns `string` - The type of the currently running activity.

### `app.invalidateCurrentActivity()` _macOS_

Invalidates the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity.

### `app.resignCurrentActivity()` _macOS_

Marks the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity as inactive without invalidating it.

### `app.updateCurrentActivity(type, userInfo)` _macOS_

*   `type` string - Uniquely identifies the activity. Maps to [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
*   `userInfo` any - App-specific state to store for use by another device.

Updates the current activity if its type matches `type`, merging the entries from `userInfo` into its current `userInfo` dictionary.

### `app.setAppUserModelId(id)` _Windows_

*   `id` string

Changes the [Application User Model ID](https://learn.microsoft.com/en-us/windows/win32/shell/appids) to `id`.

### `app.setActivationPolicy(policy)` _macOS_

*   `policy` string - Can be 'regular', 'accessory', or 'prohibited'.

Sets the activation policy for a given app.

Activation policy types:

*   'regular' - The application is an ordinary app that appears in the Dock and may have a user interface.
*   'accessory' - The application doesn't appear in the Dock and doesn't have a menu bar, but it may be activated programmatically or by clicking on one of its windows.
*   'prohibited' - The application doesn't appear in the Dock and may not create windows or be activated.

### `app.importCertificate(options, callback)` _Linux_

*   `options` Object
    *   `certificate` string - Path for the pkcs12 file.
    *   `password` string - Passphrase for the certificate.
*   `callback` Function
    *   `result` Integer - Result of import.

Imports the certificate in pkcs12 format into the platform certificate store. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to Chromium [net\_error\_list](https://source.chromium.org/chromium/chromium/src/+/main:net/base/net_error_list.h).

### `app.configureHostResolver(options)`

*   `options` Object
    *   `enableBuiltInResolver` boolean (optional) - Whether the built-in host resolver is used in preference to getaddrinfo. When enabled, the built-in resolver will attempt to use the system's DNS settings to do DNS lookups itself. Enabled by default on macOS, disabled by default on Windows and Linux.
    *   `secureDnsMode` string (optional) - Can be 'off', 'automatic' or 'secure'. Configures the DNS-over-HTTP mode. When 'off', no DoH lookups will be performed. When 'automatic', DoH lookups will be performed first if DoH is available, and insecure DNS lookups will be performed as a fallback. When 'secure', only DoH lookups will be performed. Defaults to 'automatic'.
    *   `secureDnsServers` string\[\] (optional) - A list of DNS-over-HTTP server templates.
    *   `enableAdditionalDnsQueryTypes` boolean (optional) - Controls whether additional DNS query types, e.g. HTTPS (DNS type 65) will be allowed besides the traditional A and AAAA queries when a request is being made via insecure DNS. Has no effect on Secure DNS which always allows additional types. Defaults to true.

Configures host resolution (DNS and DNS-over-HTTPS). By default, the following resolvers will be used, in order:

1.  DNS-over-HTTPS, if the DNS provider supports it, then
2.  the built-in resolver (enabled on macOS only by default), then
3.  the system's resolver (e.g. `getaddrinfo`).

This API must be called after the `ready` event is emitted.

### `app.disableHardwareAcceleration()`

Disables hardware acceleration for current app.

This method can only be called before app is ready.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behavior.

This method can only be called before app is ready.

### `app.getAppMetrics()`

Returns [ProcessMetric\[\]](/docs/latest/api/structures/process-metric): Array of `ProcessMetric` objects that correspond to memory and CPU usage statistics of all the processes associated with the app.

### `app.getGPUFeatureStatus()`

Returns [GPUFeatureStatus](/docs/latest/api/structures/gpu-feature-status) - The Graphics Feature Status from `chrome://gpu/`.

note

This information is only usable after the `gpu-info-update` event is emitted.

### `app.getGPUInfo(infoType)`

*   `infoType` string - Can be `basic` or `complete`.

Returns `Promise<unknown>`

For `infoType` equal to `complete`: Promise is fulfilled with `Object` containing all the GPU Information as in chromium's GPUInfo object. This includes the version and driver information that's shown on `chrome://gpu` page.

For `infoType` equal to `basic`: Promise is fulfilled with `Object` containing fewer attributes than when requested with `complete`.

### `app.setBadgeCount([count])` _Linux_ _macOS_

*   `count` Integer (optional) - If a value is provided, set the badge to the provided value otherwise, on macOS, display a plain white dot (e.g. unknown number of notifications). On Linux, if a value is not provided the badge will not display.

Returns `boolean` - Whether the call succeeded.

Sets the counter badge for current app. Setting the count to `0` will hide the badge.

On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.

### `app.getBadgeCount()` _Linux_ _macOS_

Returns `Integer` - The current value displayed in the counter badge.

### `app.isUnityRunning()` _Linux_

Returns `boolean` - Whether the current desktop environment is Unity launcher.

### `app.getLoginItemSettings([options])` _macOS_ _Windows_

*   `options` Object (optional)
    *   `type` string (optional) _macOS_ - Can be one of `mainAppService`, `agentService`, `daemonService`, or `loginItemService`. Defaults to `mainAppService`. Only available on macOS 13 and up.
    *   `serviceName` string (optional) _macOS_ - The name of the service. Required if `type` is non-default. Only available on macOS 13 and up.
    *   `path` string (optional) _Windows_ - The executable path to compare against. Defaults to `process.execPath`.
    *   `args` string\[\] (optional) _Windows_ - The command-line arguments to compare against. Defaults to an empty array.

Returns `Object`:

*   `openAtLogin` boolean - `true` if the app is set to open at login.
*   `openAsHidden` boolean _macOS_ _Deprecated_ - `true` if the app is set to open as hidden at login.
*   `wasOpenedAtLogin` boolean _macOS_ - `true` if the app was opened at login automatically.
*   `wasOpenedAsHidden` boolean _macOS_ _Deprecated_ - `true` if the app was opened as a hidden login item.
*   `restoreState` boolean _macOS_ _Deprecated_ - `true` if the app was opened as a login item that should restore the state from the previous session.
*   `status` string _macOS_ - can be one of `not-registered`, `enabled`, `requires-approval`, or `not-found`.
*   `executableWillLaunchAtLogin` boolean _Windows_ - `true` if app is set to open at login and its run key is not deactivated.
*   `launchItems` Object\[\] _Windows_
    *   `name` string _Windows_ - name value of a registry entry.
    *   `path` string _Windows_ - The executable to an app that corresponds to a registry entry.
    *   `args` string\[\] _Windows_ - the command-line arguments to pass to the executable.
    *   `scope` string _Windows_ - one of `user` or `machine`.
    *   `enabled` boolean _Windows_ - `true` if the app registry key is startup approved.

### `app.setLoginItemSettings(settings)` _macOS_ _Windows_

*   `settings` Object
    *   `openAtLogin` boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Defaults to `false`.
    *   `openAsHidden` boolean (optional) _macOS_ _Deprecated_ - `true` to open the app as hidden. Defaults to `false`.
    *   `type` string (optional) _macOS_ - The type of service to add as a login item. Defaults to `mainAppService`. Only available on macOS 13 and up.
    *   `serviceName` string (optional) _macOS_ - The name of the service. Required if `type` is non-default. Only available on macOS 13 and up.
    *   `path` string (optional) _Windows_ - The executable to launch at login. Defaults to `process.execPath`.
    *   `args` string\[\] (optional) _Windows_ - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.
    *   `enabled` boolean (optional) _Windows_ - `true` will change the startup approved registry key and `enable / disable` the App in Task Manager and Windows Settings. Defaults to `true`.
    *   `name` string (optional) _Windows_ - value name to write into registry. Defaults to the app's AppUserModelId().

Set the app's login item settings.

### `app.isAccessibilitySupportEnabled()` _macOS_ _Windows_

Returns `boolean` - `true` if Chrome's accessibility support is enabled, `false` otherwise. This API will return `true` if the use of assistive technologies, such as screen readers, has been detected.

### `app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_

*   `enabled` boolean - Enable or disable [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) rendering

Manually enables Chrome's accessibility support, allowing to expose accessibility switch to users in application settings. Disabled by default.

This API must be called after the `ready` event is emitted.

note

Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.showAboutPanel()`

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`. This function runs asynchronously.

### `app.setAboutPanelOptions(options)`

*   `options` Object
    *   `applicationName` string (optional) - The app's name.
    *   `applicationVersion` string (optional) - The app's version.
    *   `copyright` string (optional) - Copyright information.
    *   `version` string (optional) _macOS_ - The app's build version number.
    *   `credits` string (optional) _macOS_ _Windows_ - Credit information.
    *   `authors` string\[\] (optional) _Linux_ - List of app authors.
    *   `website` string (optional) _Linux_ - The app's website.
    *   `iconPath` string (optional) _Linux_ _Windows_ - Path to the app's icon in a JPEG or PNG file format.

Set the about panel options. This will override the values defined in the app's `.plist` file on macOS.

### `app.isEmojiPanelSupported()`

Returns `boolean` - whether or not the current OS version allows for native emoji pickers.

### `app.showEmojiPanel()` _macOS_ _Windows_

Show the platform's native emoji picker.

### `app.startAccessingSecurityScopedResource(bookmarkData)` _MAS_

*   `bookmarkData` string - The base64 encoded security scoped bookmark data returned by the `dialog.showOpenDialog` or `dialog.showSaveDialog` methods.

Returns `Function` - This function **must** be called once you have finished accessing the security scoped file. If you do not remember to stop accessing the bookmark, kernel resources will be leaked and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.

Start accessing a security scoped resource. With this method Electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user.

### `app.enableSandbox()`

Enables full sandbox mode on the app. This means that all renderers will be launched sandboxed, regardless of the value of the `sandbox` flag in [`WebPreferences`](/docs/latest/api/structures/web-preferences).

This method can only be called before app is ready.

### `app.isInApplicationsFolder()` _macOS_

Returns `boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder([options])` _macOS_

*   `options` Object (optional)
    *   `conflictHandler` Function<boolean> (optional) - A handler for potential conflict in move failure.
        *   `conflictType` string - The type of move conflict encountered by the handler; can be `exists` or `existsAndRunning`.

Returns `boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](/docs/latest/api/dialog) API.

### `app.isSecureKeyboardEntryEnabled()` _macOS_

Returns `boolean` - whether `Secure Keyboard Entry` is enabled.

By default this API will return `false`.

### `app.setSecureKeyboardEntryEnabled(enabled)` _macOS_

*   `enabled` boolean - Enable or disable `Secure Keyboard Entry`

Set the `Secure Keyboard Entry` is enabled in your application.

By using this API, important information such as password and other sensitive information can be prevented from being intercepted by other processes.

### `app.setProxy(config)`

*   `config` [ProxyConfig](/docs/latest/api/structures/proxy-config)

Returns `Promise<void>` - Resolves when the proxy setting process is complete.

Sets the proxy settings for networks requests made without an associated [Session](/docs/latest/api/session).

This method can only be called after app is ready.

### `app.resolveProxy(url)`

*   `url` URL

Returns `Promise<string>` - Resolves with the proxy information for `url`.

### `app.setClientCertRequestPasswordHandler(handler)` _Linux_

*   `handler` Function<Promise<string>>
    *   `clientCertRequestParams` Object
        *   `hostname` string - the hostname of the site requiring a client certificate
        *   `tokenName` string - the token (or slot) name of the cryptographic device
        *   `isRetry` boolean - whether there have been previous failed attempts at prompting the password
    Returns `Promise<string>` - Resolves with the password

The handler is called when a password is needed to unlock a client certificate for `hostname`.

## Properties

### `app.accessibilitySupportEnabled` _macOS_ _Windows_

A `boolean` property that's `true` if Chrome's accessibility support is enabled, `false` otherwise. This property will be `true` if the use of assistive technologies, such as screen readers, has been detected. Setting this property to `true` manually enables Chrome's accessibility support, allowing developers to expose accessibility switch to users in application settings.

This API must be called after the `ready` event is emitted.

note

Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.applicationMenu`

A `Menu | null` property that returns [`Menu`](/docs/latest/api/menu) if one has been set and `null` otherwise. Users can pass a [Menu](/docs/latest/api/menu) to set this property.

### `app.badgeCount` _Linux_ _macOS_

An `Integer` property that returns the badge count for current app. Setting the count to `0` will hide the badge.

On macOS, setting this with any nonzero integer shows on the dock icon. On Linux, this property only works for Unity launcher.

### `app.commandLine` _Readonly_

A [`CommandLine`](/docs/latest/api/command-line) object that allows you to read and manipulate the command line arguments that Chromium uses.

### `app.dock` _macOS_ _Readonly_

A `Dock | undefined` property ([`Dock`](/docs/latest/api/dock) on macOS, `undefined` on all other platforms) that allows you to perform actions on your app icon in the user's dock.

### `app.isPackaged` _Readonly_

A `boolean` property that returns `true` if the app is packaged, `false` otherwise. For many apps, this property can be used to distinguish development and production environments.

### `app.name`

A `string` property that indicates the current application's name, which is the name in the application's `package.json` file.

Usually the `name` field of `package.json` is a short lowercase name, according to the npm modules spec. You should usually also specify a `productName` field, which is your application's full capitalized name, and which will be preferred over `name` by Electron.

### `app.userAgentFallback`

A `string` which is the user agent string Electron will use as a global fallback.

This is the user agent that will be used when no user agent is set at the `webContents` or `session` level. It is useful for ensuring that your entire app has the same user agent. Set to a custom value as early as possible in your app's initialization to ensure that your overridden value is used.

### `app.runningUnderARM64Translation` _Readonly_ _macOS_ _Windows_

A `boolean` which when `true` indicates that the app is currently running under an ARM64 translator (like the macOS [Rosetta Translator Environment](https://en.wikipedia.org/wiki/Rosetta_(software)) or Windows [WOW](https://en.wikipedia.org/wiki/Windows_on_Windows)).

You can use this property to prompt users to download the arm64 version of your application when they are mistakenly running the x64 version under Rosetta or WOW.