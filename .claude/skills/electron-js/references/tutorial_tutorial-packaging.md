---
title: Packaging Your Application
source_url: https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging
---

# Packaging Your Application

## Learning Goals

In this part of the tutorial, we will go over the basics of packaging and distributing your app with Electron Forge.

## Using Electron Forge

Electron does not have any tooling for packaging and distribution bundled into its core modules. Once you have a working Electron app in dev mode, you need to use additional tooling to create a packaged app you can distribute to your users (also known as a **distributable**). Distributables can be either installers (e.g. MSI on Windows) or portable executable files (e.g. `.app` on macOS).

Electron Forge is an all-in-one tool that handles the packaging and distribution of Electron apps. Under the hood, it combines a lot of existing Electron tools (e.g. `@electron/packager`, `@electron/osx-sign`, `electron-winstaller`, etc.) into a single interface so you do not have to worry about wiring them all together.

### Importing Your Project into Forge

You can install Electron Forge's CLI in your project's `devDependencies` and import your existing project with a handy conversion script:

```bash
npm install --save-dev @electron-forge/cli
npx electron-forge import
```

Once the conversion script is done, Forge should have added a couple of scripts to your `package.json` file:

```json
{
  "scripts": {
    "start": "electron-forge start",
    "package": "electron-forge package",
    "make": "electron-forge make"
  }
}
```

**Note:** You should also notice that your `devDependencies` now includes a few more packages. Also, a new `forge.config.js` file has been added, where you will see several makers (packages that create distributable bundles) pre-configured.

### Creating a Distributable

To create a distributable, use your project's new `make` script, which runs the `electron-forge make` command:

```bash
npm run make
```

This `make` command contains two steps:

1. It will first run `electron-forge package` under the hood, which bundles your app code together with the Electron binary. The packaged code is generated into a folder.
2. It will then use this packaged app folder to create a separate distributable for each configured maker.

After the script runs, you should see an `out` folder containing both the distributable and a folder containing the packaged application code.

**Output example (macOS):**

```
out/
├── out/make/zip/darwin/x64/my-electron-app-darwin-x64-1.0.0.zip
├── ...
└── out/my-electron-app-darwin-x64/my-electron-app.app/Contents/...
```

The distributable in the `out/make` folder should be ready to launch. You have now created your first bundled Electron application.

**Tip:** Distributables formats can be configured in your Forge config. See Forge's Makers documentation for more details.

## Important: Code Signing

Code signing is an important part of shipping desktop applications, and is mandatory for the auto-update step in the last part of the tutorial.

Code signing is a security technology that you use to certify that a desktop app was created by a known source. Windows and macOS have their own OS-specific code signing systems that will make it difficult for users to download or launch unsigned applications.

If you already have code signing certificates for Windows and macOS, you can set your credentials in your Forge configuration.

### macOS Code Signing

On macOS, code signing is done through the `osxSign` and `osxNotarize` options:

```javascript
// forge.config.js
module.exports = {
  packagerConfig: {
    osxSign: {},
    osxNotarize: {
      tool: 'notarytool',
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_PASSWORD,
      teamId: process.env.APPLE_TEAM_ID
    }
  }
}
```

### Windows Code Signing

On Windows, code signing is done through the maker config:

```javascript
// forge.config.js
module.exports = {
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        certificateFile: './cert.pfx',
        certificatePassword: process.env.CERTIFICATE_PASSWORD
      }
    }
  ]
}
```

For detailed information on code signing, see the Forge Code Signing documentation.
