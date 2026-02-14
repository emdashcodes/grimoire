---
title: Publishing and Updating
source_url: https://www.electronjs.org/docs/latest/tutorial/tutorial-publishing-updating
---

# Publishing and Updating

## Learning Goals

In this final part of the tutorial, you will publish your app to GitHub releases and integrate automatic updates into your app code.

## Using update.electronjs.org

The Electron maintainers provide a free auto-updating service for open-source apps at [https://update.electronjs.org](https://update.electronjs.org). Its requirements are:

- Your app runs on macOS or Windows
- Your app has a public GitHub repository
- Builds are published to GitHub Releases
- Builds are code signed (macOS only)

At this point, we will assume that you have already pushed all your code to a public GitHub repository.

**Alternative:** If you are using other repository hosts (e.g. GitLab or Bitbucket) or if you need to keep your code repository private, please refer to the tutorial on hosting your own Electron update server.

## Publishing a GitHub Release

Electron Forge has Publisher plugins that can automate the distribution of your packaged application to various sources. In this tutorial, we will be using the GitHub Publisher, which will allow us to publish our code to GitHub Releases.

### Generating a Personal Access Token

Forge cannot publish to any repository on GitHub without permission. You need to pass in an authenticated token that gives Forge access to your GitHub Releases. The easiest way to do this is to create a new personal access token (PAT) with the `public_repo` scope, which gives write access to your public repositories. **Make sure to keep this token a secret.**

### Setting Up the GitHub Publisher

**Install the module:**

```bash
npm install --save-dev @electron-forge/publisher-github
```

**Configure in forge.config.js:**

```javascript
module.exports = {
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'github-user-name',
          name: 'github-repo-name'
        },
        prerelease: false,
        draft: true
      }
    }
  ]
}
```

**Note on drafts:** By setting `draft: true`, you can publish your release without publishing it to end users. You can manually publish the release from GitHub after reviewing it on the Releases page.

### Setting Your Authentication Token

You also need to make the Publisher aware of your authentication token. By default, it will use the value stored in the `GITHUB_TOKEN` environment variable.

### Running the Publish Command

Add Forge's publish command to your npm scripts:

```json
{
  "scripts": {
    "publish": "electron-forge publish"
  }
}
```

Run:

```bash
npm run publish
```

**Note:** If you are publishing for multiple architectures, you can use the `--arch` flag.

### GitHub Actions

Local publishing can be painful, especially since you can only create distributables for your host operating system (i.e. you can not publish a Windows `.exe` file from macOS). A common pattern for Electron apps is to automate the publishing process using CI workflows such as GitHub Actions. This allows your app to be packaged and published on Ubuntu, macOS, and Windows runners.

## Instrumenting Your Updater

Now that you have a functional release system via GitHub Releases, you now need to tell your Electron app to download an update whenever a new release is cut. Electron apps do this via the `autoUpdater` module, which reads from an update server feed to check if a new version is available for download.

The `update.electronjs.org` service provides an updater-compatible feed. For example, Electron Fiddle v0.28.0 will check the endpoint `https://update.electronjs.org/electron/fiddle/darwin/v0.28.0` for available updates.

After your release is published to GitHub, the `update.electronjs.org` service should work for your application. The only step left is to configure the feed with the `autoUpdater` module.

To make this process easier, the Electron team maintains the `update-electron-app` module, which sets up the `autoUpdater` boilerplate for `update.electronjs.org` in one function call with no configuration needed. This module will search for the `update.electronjs.org` feed that matches your project's package.json `"repository"` field.

**Install the module:**

```bash
npm install update-electron-app
```

**In your main process (main.js), import the module and call it immediately:**

```javascript
const { updateElectronApp } = require('update-electron-app')
updateElectronApp()
```

And that is all it takes! Once your application is packaged, it will update itself for each new GitHub release that you publish.

## Summary

In this tutorial, we configured Electron Forge's GitHub Publisher to upload your app's distributables to GitHub Releases, and set up the `update-electron-app` package to fetch those releases and enable auto-updating. You now have a complete end-to-end system for packaging, distributing, and updating your Electron application.
