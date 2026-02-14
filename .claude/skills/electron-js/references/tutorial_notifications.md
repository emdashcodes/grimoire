---
title: Notifications
source_url: https://www.electronjs.org/docs/latest/tutorial/notifications
---

# Notifications

## Overview

All three operating systems provide means for applications to send notifications to the user. The technique of showing notifications is different for the Main and Renderer processes.

For the Renderer process, Electron conveniently allows developers to send notifications with the [HTML5 Notification API](https://notifications.spec.whatwg.org/), using the currently running operating system's native notification APIs to display it.

To show notifications in the Main process, you need to use the [Notification](/docs/latest/api/notification) module.

## Example

### Show notifications in the Main process

Starting with a working application from the Quick Start Guide, add the following line to the `main.js` file:

```javascript
const { Notification } = require('electron')

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

new Notification({
  title: NOTIFICATION_TITLE,
  body: NOTIFICATION_BODY
}).show()
```

### Show notifications in the Renderer process

```javascript
const NOTIFICATION_TITLE = 'Title'
const NOTIFICATION_BODY =
  'Notification from the Renderer process. Click to log to console.'
const CLICK_MESSAGE = 'Notification clicked'

new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY }).onclick =
  () => console.log(CLICK_MESSAGE)
```

After launching the Electron application, you should see the notification.

## Additional information

While code and user experience across operating systems are similar, there are subtle differences.

### Windows

- On Windows 10, a shortcut to your app with an Application User Model ID must be installed to the Start Menu. This can be overkill during development, so adding `node_modules\electron\dist\electron.exe` to your Start Menu also does the trick. Navigate to the file in Explorer, right-click and 'Pin to Start Menu'. You will then need to add the line `app.setAppUserModelId(process.execPath)` to your main process to see notifications.
- On Windows 10, a ToastActivatorCLSID must additionally be defined. If you use Electron Forge or Electron Packager, no additional steps are required, as both tools set the ToastActivatorCLSID automatically.
- On Windows 8.1 and Windows 8, a shortcut to your app with an Application User Model ID must be installed to the Start Screen. Note, however, that it does not need to be pinned to the Start Screen.
- On Windows 7, notifications work via a custom implementation which visually resembles the native one on newer systems.

Electron attempts to automate the work around the Application User Model ID. When Electron is used together with the installation and update framework Squirrel, Electron will automatically set your app's Application User Model ID correctly. However, if you don't use Squirrel and instead use something like electron-winstaller, you will need to set it explicitly.

Furthermore, the maximum size for the notification body is 250 characters, though the Windows team recommends keeping notifications at 200 characters.

For more advanced notifications on Windows, consider using userland modules like `electron-windows-notifications`, which provides support for native Windows templates and images.

### macOS

Notifications are straightforward on macOS, but you should be aware of Apple's Human Interface guidelines regarding notifications.

Note that notifications are limited to 256 bytes in size and will be truncated if you exceed that limit.

### Linux

Notifications are sent using `libnotify`, which can show notifications on any desktop environment that follows the Desktop Notifications Specification, including Cinnamon, Enlightenment, Unity, GNOME, and KDE.
