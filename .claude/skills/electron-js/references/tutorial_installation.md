---
title: Advanced Installation Instructions
source_url: https://www.electronjs.org/docs/latest/tutorial/installation
---

# Advanced Installation Instructions

## Overview

To install prebuilt Electron binaries, use `npm`. The preferred method is to install Electron as a development dependency:

```bash
npm install electron --save-dev
```

## Running Electron Ad-hoc

You can execute Electron without a local installation using the `npx` command runner:

```bash
npx electron .
```

This runs the current working directory with Electron. Note that application dependencies will not be installed automatically.

## Customization

### Architecture

To change the architecture (e.g., `x64` on an `arm64` machine), use the `--arch` flag or set the `npm_config_arch` environment variable:

```bash
npm install --arch=x64 electron
```

### Platform

Specify the platform using the `--platform` flag:

```bash
npm install --platform=win32 electron
```

## Proxies

To use an HTTP proxy, set the `ELECTRON_GET_USE_PROXY` variable to any value, plus additional environment variables based on your Node version.

## Custom Mirrors and Caches

### Mirror

Override the base URL using environment variables. The URL composition is:

```
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

Example using China CDN mirror:

```bash
ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
```

Use the `{{ version }}` placeholder for custom directory formats:

```bash
ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"
```

This downloads from URLs like: `https://npmmirror.com/mirrors/electron/8.0.0/electron-v8.0.0-linux-x64.zip`

For checksums differing from official releases, set `electron_use_remote_checksums=1` to force remote verification.

### Cache

Override the local cache location to provide custom builds or avoid network access:

- **Linux**: `$XDG_CACHE_HOME` or `~/.cache/electron/`
- **macOS**: `~/Library/Caches/electron/`
- **Windows**: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

Set a custom location with the `electron_config_cache` environment variable.

Cache structure:

```
├── [checksum]/
│   └── electron-v15.3.1-darwin-x64.zip
```

## Postinstall Script

The Electron binary is downloaded during the `postinstall` step by default. To skip this:

```bash
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install
```

This is useful in CI environments running unit tests with mocked modules.

## Troubleshooting

Installation errors typically result from network issues rather than package problems. Errors like `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` indicate connectivity problems.

**Solutions:**

- Switch networks or retry the installation
- Download directly from [electron/electron/releases](https://github.com/electron/electron/releases)
- For `EACCES` errors, fix npm permissions
- Set the `unsafe-perm` flag if needed:

```bash
sudo npm install electron --unsafe-perm=true
```

- Use `--verbose` for download progress on slower networks:

```bash
npm install --verbose electron
```

- Force asset re-download with:

```bash
force_no_cache=true npm install electron
```
