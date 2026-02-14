---
title: ES Modules (ESM) in Electron
source_url: https://www.electronjs.org/docs/latest/tutorial/esm
---

# ES Modules (ESM) in Electron

## Introduction

ECMAScript modules represent the standard way of loading JavaScript packages. Electron incorporates ESM support from both Chromium and Node.js, selecting the appropriate loader depending on execution context. This feature became available starting with `electron@28.0.0`.

## ESM Support Matrix

| Process | ESM Loader | ESM Loader in Preload | Key Requirements |
|---------|-----------|----------------------|------------------|
| Main | Node.js | N/A | Use `await` before app's `ready` event |
| Renderer (Sandboxed) | Chromium | Unsupported | Sandboxed preload scripts cannot use ESM imports |
| Renderer (Unsandboxed & Context Isolated) | Chromium | Node.js | `.mjs` extension required; scripts run after page load on empty pages |
| Renderer (Unsandboxed & Non-Context Isolated) | Chromium | Node.js | `.mjs` extension required; scripts run after page load on empty pages |

## Main Process

The main process operates within Node.js and uses its ESM loader. Enable ESM in files by either:

- Using the `.mjs` file extension, or
- Setting `"type": "module"` in the nearest parent `package.json`

### Caveats

**Asynchronous Loading Requirement**: ES Modules load asynchronously, meaning only side effects from the entry point's imports execute before the `ready` event. Certain Electron APIs (like `app.setPath`) require invocation before `ready` emits. Employ top-level `await` to ensure Promises resolve before the app becomes ready.

**Transpiler Considerations**: Tools like Babel historically converted ES Module syntax to CommonJS `require` calls, which load synchronously. When migrating transpiled code to native ESM, account for timing differences between these approaches.

## Renderer Process

Renderer processes operate in Chromium and use its ESM loader. This means import statements:

- Cannot access Node.js built-in modules
- Cannot load npm packages from `node_modules`

For client-side JavaScript packages, employ bundlers such as webpack or Vite.

## Preload Scripts

Preload scripts use the Node.js ESM loader when available, contingent upon sandbox and context isolation settings.

### Requirements and Caveats

**File Extension**: ESM preload scripts require the `.mjs` extension; `"type": "module"` declarations are ignored.

**Sandboxed Limitations**: Sandboxed preload scripts execute as plain JavaScript without ESM context. For external modules, use a bundler; the `electron` module remains loadable via `require()`.

**Empty Page Content**: On pages with completely empty response bodies, unsandboxed ESM preload scripts execute after page load, potentially causing race conditions. Add minimal content (like `<html></html>`) or revert to CommonJS preload scripts to block page load appropriately.

**Context Isolation for Dynamic Imports**: Unsandboxed renderers lacking `contextIsolation` cannot dynamically `import()` Node.js files. Enabling context isolation allows dynamic imports to route through Node.js.
