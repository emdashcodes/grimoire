---
title: Code Signing
source_url: https://www.electronjs.org/docs/latest/tutorial/code-signing
---

# Code Signing

## Overview

Code signing is a security technology that certifies an application's origin. Both Windows and macOS prevent users from running unsigned applications, requiring code signing for proper distribution.

## Signing & Notarizing macOS Builds

macOS applications require two steps for release:

1. Code signing the application
2. Notarization through Apple's automated verification process

### Prerequisites

- Enrollment in the Apple Developer Program (annual fee required)
- Xcode installation (requires macOS)
- Downloaded and installed signing certificates

### Using Electron Forge

Electron Forge simplifies the signing and notarization process. Configuration details are available in the [Signing macOS Apps guide](https://www.electronforge.io/guides/code-signing/code-signing-macos).

### Using Electron Packager

For applications not using Forge, `@electron/packager` includes signing and notarization tools.

```javascript
const packager = require('@electron/packager')
packager({
  dir: '/path/to/my/app',
  osxSign: {},
  osxNotarize: {
    appleId: 'felix@felix.fun',
    appleIdPassword: 'my-apple-id-password'
  }
})
```

## Signing Windows Builds

### Traditional Certificates

Certificate providers include Certum, DigiCert, Entrust, GlobalSign, IdenTrust, Sectigo, and SSL.com.

**Important:** Since June 2023, Microsoft requires "extended validation" (EV) certificates. Older "authenticode" certificates no longer provide benefits and result in unsigned app warnings.

EV certificates must be stored on FIPS 140 Level 2-compliant hardware. Many providers now offer cloud-based signing for CI/CD environments.

### Using Electron Forge

Configuration instructions for Windows code signing are available in the [Electron Forge Code Signing Tutorial](https://www.electronforge.io/guides/code-signing/code-signing-windows).

### Using Electron Packager

```javascript
const packager = require('@electron/packager')
packager({
  dir: '/path/to/my/app',
  windowsSign: {
    signWithParams: '--my=custom --parameters',
    signToolPath: 'C:\\Path\\To\\my-custom-tool.exe'
  }
})
```

### Using electron-winstaller

```javascript
const electronInstaller = require('electron-winstaller')

try {
  await electronInstaller.createWindowsInstaller({
    appDirectory: '/tmp/build/my-app-64',
    outputDirectory: '/tmp/build/installer64',
    authors: 'My App Inc.',
    exe: 'myapp.exe',
    windowsSign: {
      signWithParams: '--my=custom --parameters',
      signToolPath: 'C:\\Path\\To\\my-custom-tool.exe'
    }
  })
} catch (e) {
  console.log(`Error: ${e.message}`)
}
```

### Using electron-wix-msi

```javascript
import { MSICreator } from 'electron-wix-msi'

const msiCreator = new MSICreator({
  appDirectory: '/path/to/built/app',
  description: 'My amazing Kitten simulator',
  exe: 'kittens',
  name: 'Kittens',
  manufacturer: 'Kitten Technologies',
  version: '1.1.2',
  outputDirectory: '/path/to/output/folder',
  windowsSign: {
    signWithParams: '--my=custom --parameters',
    signToolPath: 'C:\\Path\\To\\my-custom-tool.exe'
  }
})

const supportBinaries = await msiCreator.create()

for (const binary of supportBinaries) {
  await signFile(binary)
}

await msiCreator.compile()
```

### Azure Trusted Signing

Microsoft's cloud-based alternative to EV certificates, available to US/Canada-based organizations with 3+ years of business history and US/Canada individual developers (as of October 2025).

Configuration available through Electron Forge and Electron Builder.
