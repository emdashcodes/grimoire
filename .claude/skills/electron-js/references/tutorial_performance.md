---
title: Performance
source_url: https://www.electronjs.org/docs/latest/tutorial/performance
---

# Performance

Developers frequently ask about strategies to optimize the performance of Electron applications. This document outlines the Electron maintainers' recommendations to reduce memory, CPU, and disk resources while ensuring that your app is responsive to user input and completes operations as quickly as possible. All performance strategies should maintain a high standard for your app's security.

Wisdom about building performant websites with JavaScript generally applies to Electron apps, too. Resources discussing how to build performant Node.js applications also apply, but be careful to understand that "performance" means different things for a Node.js backend than it does for a client application.

## Measure, Measure, Measure

The most successful strategy for building a performant Electron app is to profile the running code, find the most resource-hungry piece of it, and to optimize it. Repeating this process over and over again will dramatically increase your app's performance. Experience from working with major apps like Visual Studio Code or Slack has shown that this practice is by far the most reliable strategy to improve performance.

To learn more about how to profile your app's code, familiarize yourself with the Chrome Developer Tools. For advanced analysis looking at multiple processes at once, consider the Chrome Tracing tool.

### Recommended Reading

- [Analyze runtime performance](https://developer.chrome.com/docs/devtools/performance/)
- [Talk: "Visual Studio Code - The First Second"](https://www.youtube.com/watch?v=r0OeHRUCCb4)

## Checklist: Performance Recommendations

1. Carelessly including modules
2. Loading and running code too soon
3. Blocking the main process
4. Blocking the renderer process
5. Unnecessary polyfills
6. Unnecessary or blocking network requests
7. Bundle your code
8. Call `Menu.setApplicationMenu(null)` when you do not need a default menu

### 1. Carelessly Including Modules

Before adding a Node.js module to your application, examine said module. How many dependencies does that module include? What kind of resources does it need to simply be called in a `require()` statement? You might find that the module with the most downloads on the NPM package registry or the most stars on GitHub is not in fact the leanest or smallest one available.

#### Why?

A seemingly excellent module written primarily for Node.js servers running Linux might be bad news for your app's performance. In one real-world example, a simple `isOnline()` module pulled in dependencies that included a JSON file with over 100,000 lines of port information, causing expensive parsing on every load.

#### How?

When considering a module, check:

1. The size of dependencies included
2. The resources required to load (`require()`) it
3. The resources required to perform the action you're interested in

Generate a CPU profile and a heap memory profile for loading a module:

```bash
node --cpu-prof --heap-prof -e "require('request')"
```

Both resulting files can be analyzed using the Chrome Developer Tools, using the `Performance` and `Memory` tabs respectively.

### 2. Loading and Running Code Too Soon

If you have expensive setup operations, consider deferring those. Instead of firing off all operations right away, consider staggering them in a sequence more closely aligned with the user's journey.

#### Why?

Loading modules is a surprisingly expensive operation, especially on Windows. When your app starts, it should not make users wait for operations that are currently not necessary.

#### How?

Instead of eagerly loading dependencies:

```javascript
// Eager loading - avoid this pattern
const fs = require('node:fs')
const fooParser = require('foo-parser')

class Parser {
  constructor () {
    this.files = fs.readdirSync('.')
  }

  getParsedFiles () {
    return fooParser.parse(this.files)
  }
}

const parser = new Parser()
module.exports = { parser }
```

Defer loading to when actually needed:

```javascript
// Deferred loading - preferred pattern
const fs = require('node:fs')

class Parser {
  async getFiles () {
    this.files = this.files || await fs.promises.readdir('.')
    return this.files
  }

  async getParsedFiles () {
    const fooParser = require('foo-parser')
    const files = await this.getFiles()
    return fooParser.parse(files)
  }
}

const parser = new Parser()
module.exports = { parser }
```

Allocate resources "just in time" rather than allocating them all when your app starts.

### 3. Blocking the Main Process

Electron's main process is the parent process to all your app's other processes and the primary process the operating system interacts with. It handles windows, interactions, and the communication between various components inside your app. It also houses the UI thread.

Under no circumstances should you block this process and the UI thread with long-running operations. Blocking the UI thread means that your entire app will freeze until the main process is ready to continue processing.

#### How?

1. For long running CPU-heavy tasks, make use of worker threads, consider moving them to the BrowserWindow, or (as a last resort) spawn a dedicated process.
2. Avoid using the synchronous IPC and the `@electron/remote` module as much as possible.
3. Avoid using blocking I/O operations in the main process. Prefer the asynchronous and non-blocking variant of core Node.js modules (like `fs` or `child_process`).

### 4. Blocking the Renderer Process

Since Electron ships with a current version of Chrome, you can make use of the latest and greatest features the Web Platform offers to defer or offload heavy operations.

#### How?

- Use `requestIdleCallback()` for small operations to queue up functions to be executed during idle periods.
- Use `Web Workers` for long-running operations that require a lot of CPU power for an extended period of time.

### 5. Unnecessary Polyfills

Electron bundles a known version of Chromium, so you know exactly which engine will parse your JavaScript, HTML, and CSS. Do not polyfill features that are already included in Electron.

#### How?

Operate under the assumption that polyfills in current versions of Electron are unnecessary. Check [caniuse.com](https://caniuse.com) if you have doubts. Examine the libraries you use -- are they really necessary? If you're using a transpiler like TypeScript, ensure you're targeting the latest ECMAScript version supported by Electron.

### 6. Unnecessary or Blocking Network Requests

Avoid fetching rarely changing resources from the internet if they could easily be bundled with your application.

#### How?

Open the developer tools, navigate to the `Network` tab and check the `Disable cache` option. Then, reload your renderer and take stock of all resources being downloaded. Bundle images, fonts, or media files that don't change. Enable `Network Throttling` to identify resources your app unnecessarily waits for.

### 7. Bundle Your Code

Calling `require()` is an expensive operation. Bundle your application's code into a single file to ensure that the overhead is only paid once when your application loads.

There are numerous JavaScript bundlers available, including Webpack, Parcel, and rollup.js. Use a bundler that handles Electron's unique environment (both Node.js and browser).

### 8. Call `Menu.setApplicationMenu(null)` When Not Needed

If you build your own menu or use a frameless window without a native menu, call `Menu.setApplicationMenu(null)` before `app.on("ready")` to prevent Electron from setting a default menu, which benefits startup performance.
