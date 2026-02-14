---
title: Accessibility
source_url: https://www.electronjs.org/docs/latest/tutorial/accessibility
---

# Accessibility

Making accessible applications is important and we're happy to provide functionality to [Devtron](https://electronjs.org/devtron) and [Spectron](https://electronjs.org/spectron) that gives developers the opportunity to make their apps better for everyone.

## Overview

Accessibility concerns in Electron applications are similar to those of websites because they're both ultimately HTML. With Electron apps, however, you can't use the online resources for accessibility audits because your app doesn't have a URL to point the auditor to.

## Manually enabling accessibility features

Electron applications will automatically enable accessibility features in the presence of assistive technology (e.g. JAWS on Windows or VoiceOver on macOS). See Chrome's accessibility documentation for more details.

You can also manually toggle these features either within your Electron application or by setting flags in third-party native software.

### Using Electron's API

By using the `app.setAccessibilitySupportEnabled(enabled)` API, you can manually expose Chrome's accessibility tree to users in the application preferences. Note that the user's system assistive utilities have priority over this setting and will override it.

### Within third-party software

#### macOS

On macOS, third-party assistive technology can toggle accessibility features inside Electron applications by setting the `AXManualAccessibility` attribute programmatically:

```objc
CFStringRef kAXManualAccessibility = CFSTR("AXManualAccessibility");

+ (void)enableAccessibility:(BOOL)enable inElectronApplication:(NSRunningApplication *)app
{
    AXUIElementRef appRef = AXUIElementCreateApplication(app.processIdentifier);
    if (appRef == nil)
        return;

    CFBooleanRef value = enable ? kCFBooleanTrue : kCFBooleanFalse;
    AXUIElementSetAttributeValue(appRef, kAXManualAccessibility, value);
    CFRelease(appRef);
}
```

```swift
import Cocoa

let name = CommandLine.arguments.count >= 2 ? CommandLine.arguments[1] : "Electron"
let pid = NSWorkspace.shared.runningApplications.first(where: {$0.localizedName == name})!.processIdentifier
let axApp = AXUIElementCreateApplication(pid)
let result = AXUIElementSetAttributeValue(axApp, "AXManualAccessibility" as CFString, true as CFTypeRef)
print("Setting 'AXManualAccessibility' \(result.rawValue == 0 ? "succeeded" : "failed")")
```
