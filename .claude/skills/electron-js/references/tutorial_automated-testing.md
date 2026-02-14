---
title: Automated Testing
source_url: https://www.electronjs.org/docs/latest/tutorial/automated-testing
---

# Automated Testing

Test automation is an efficient way of validating that your application code works as intended. While Electron doesn't actively maintain its own testing solution, this guide covers several approaches for running end-to-end automated tests on your Electron app.

## Using the WebDriver Interface

WebDriver is an open source tool for automated testing of web apps across many browsers. It provides capabilities for navigating to web pages, user input, JavaScript execution, and more.

### With WebdriverIO

[WebdriverIO](https://webdriver.io/) (WDIO) is a test automation framework that provides a Node.js package for testing with WebDriver.

#### Install the test runner

```bash
npm init wdio@latest ./
```

This starts a configuration wizard. Select "Desktop Testing - of Electron Applications" when asked about the type of testing.

#### Connect WDIO to your Electron app

```javascript
export const config = {
  // ...
  services: ['electron'],
  capabilities: [{
    browserName: 'electron',
    'wdio:electronServiceOptions': {
      // WebdriverIO can automatically find your bundled application
      // if you use Electron Forge or electron-builder, otherwise you
      // can define it here, e.g.:
      // appBinaryPath: './path/to/bundled/application.exe',
      appArgs: ['foo', 'bar=baz']
    }
  }]
  // ...
}
```

#### Write your tests

```javascript
import { browser, $, expect } from '@wdio/globals'

describe('keyboard input', () => {
  it('should detect keyboard input', async () => {
    await browser.keys(['y', 'o'])
    await expect($('keypress-count')).toHaveText('YO')
  })
})
```

WebdriverIO also allows accessing Electron APIs:

```javascript
import { browser } from '@wdio/globals'

describe('trigger message modal', async () => {
  it('message modal can be triggered from a test', async () => {
    await browser.electron.execute(
      (electron, param1, param2, param3) => {
        const appWindow = electron.BrowserWindow.getFocusedWindow()
        electron.dialog.showMessageBox(appWindow, {
          message: 'Hello World!',
          detail: `${param1} + ${param2} + ${param3} = ${param1 + param2 + param3}`
        })
      },
      1, 2, 3
    )
  })
})
```

#### Run your tests

```bash
npx wdio run wdio.conf.js
```

### With Selenium

[Selenium](https://www.selenium.dev/) is a web automation framework with Node.js bindings available under the `selenium-webdriver` package.

#### Run a ChromeDriver server

```bash
npm install --save-dev electron-chromedriver
./node_modules/.bin/chromedriver
```

#### Connect Selenium to ChromeDriver

```bash
npm install --save-dev selenium-webdriver
```

```javascript
const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder()
  .usingServer('http://localhost:9515')
  .withCapabilities({
    'goog:chromeOptions': {
      binary: '/Path-to-Your-App.app/Contents/MacOS/Electron'
    }
  })
  .forBrowser('chrome')
  .build()

driver.get('https://www.google.com')
driver.findElement(webdriver.By.name('q')).sendKeys('webdriver')
driver.findElement(webdriver.By.name('btnG')).click()
driver.wait(() => {
  return driver.getTitle().then((title) => {
    return title === 'webdriver - Google Search'
  })
}, 1000)
driver.quit()
```

## Using Playwright

[Microsoft Playwright](https://playwright.dev) is an end-to-end testing framework with experimental Electron support via Chrome DevTools Protocol (CDP).

### Install dependencies

```bash
npm install --save-dev @playwright/test
```

### Write your tests

```javascript
import { test, expect, _electron as electron } from '@playwright/test'

test('example test', async () => {
  const electronApp = await electron.launch({ args: ['.'] })
  const isPackaged = await electronApp.evaluate(async ({ app }) => {
    return app.isPackaged
  })
  expect(isPackaged).toBe(false)
  const window = await electronApp.firstWindow()
  await window.screenshot({ path: 'intro.png' })
  await electronApp.close()
})
```

### Run your tests

```bash
npx playwright test
```

## Using a Custom Test Driver

You can write your own custom driver using Node.js' built-in IPC-over-STDIO. Custom test drivers require additional app code, but have lower overhead and let you expose custom methods to your test suite.

### Test suite side

```javascript
const electronPath = require('electron')
const childProcess = require('node:child_process')

const env = { /* ... */ }
const stdio = ['inherit', 'inherit', 'inherit', 'ipc']
const appProcess = childProcess.spawn(electronPath, ['./app'], { stdio, env })

appProcess.on('message', (msg) => {
  // ...
})

appProcess.send({ my: 'message' })
```

### App side

```javascript
process.on('message', (msg) => {
  // ...
})

process.send({ my: 'message' })
```

### TestDriver class example

```javascript
class TestDriver {
  constructor ({ path, args, env }) {
    this.rpcCalls = []

    env.APP_TEST_DRIVER = 1
    this.process = childProcess.spawn(path, args, {
      stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
      env
    })

    this.process.on('message', (message) => {
      const rpcCall = this.rpcCalls[message.msgId]
      if (!rpcCall) return
      this.rpcCalls[message.msgId] = null
      if (message.reject) rpcCall.reject(message.reject)
      else rpcCall.resolve(message.resolve)
    })

    this.isReady = this.rpc('isReady').catch((err) => {
      console.error('Application failed to start', err)
      this.stop()
      process.exit(1)
    })
  }

  async rpc (cmd, ...args) {
    const msgId = this.rpcCalls.length
    this.process.send({ msgId, cmd, args })
    return new Promise((resolve, reject) => this.rpcCalls.push({ resolve, reject }))
  }

  stop () {
    this.process.kill()
  }
}
```

### App-side RPC handler

```javascript
const METHODS = {
  isReady () {
    return true
  }
  // define your RPC-able methods here
}

const onMessage = async ({ msgId, cmd, args }) => {
  let method = METHODS[cmd]
  if (!method) method = () => new Error('Invalid method: ' + cmd)
  try {
    const resolve = await method(...args)
    process.send({ msgId, resolve })
  } catch (err) {
    const reject = {
      message: err.message,
      stack: err.stack,
      name: err.name
    }
    process.send({ msgId, reject })
  }
}

if (process.env.APP_TEST_DRIVER) {
  process.on('message', onMessage)
}
```

### Usage with a test framework (ava example)

```javascript
const electronPath = require('electron')
const test = require('ava')
const { TestDriver } = require('./testDriver')

const app = new TestDriver({
  path: electronPath,
  args: ['./app'],
  env: {
    NODE_ENV: 'test'
  }
})

test.before(async t => {
  await app.isReady
})

test.after.always('cleanup', async t => {
  await app.stop()
})
```
