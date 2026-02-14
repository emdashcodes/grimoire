---
title: Prerequisites
source_url: https://www.electronjs.org/docs/latest/tutorial/tutorial-prerequisites
---

# Prerequisites

Electron is a framework for building desktop applications using JavaScript, HTML, and CSS. By embedding Chromium and Node.js into a single binary, Electron allows you to create cross-platform apps that work on Windows, macOS, and Linux.

This tutorial will guide you through the process of developing an Electron application and distributing it to end users.

## Goals

This tutorial starts by guiding you through the process of assembling a minimal Electron application from scratch, then teaches you how to package and distribute it to users using Electron Forge.

If you prefer to get a project started with a single-command boilerplate, we recommend you start with Electron Forge's `create-electron-app` command.

## Assumptions

Electron is a native wrapper layer for web apps and is run in a Node.js environment. Therefore, this tutorial assumes you are generally familiar with Node's and the web's front-end basics. If you need to do some background reading before continuing, we recommend the following resources:

- Getting started with the Web (MDN Web Docs)
- Introduction to Node.js

## Required Tools

### Code Editor

You will need a text editor to write your code. We recommend using Visual Studio Code, although you can pick whichever one you prefer.

### Command Line

Throughout the tutorial, we will ask you to use various command-line interfaces (CLIs). You can type these commands into your system's default terminal:

- Windows: Command Prompt or PowerShell
- macOS: Terminal
- Linux: varies by distribution (e.g. GNOME Terminal, Konsole)

### Git and GitHub

Git is a commonly-used version control system for source code, and GitHub is a collaborative development platform built on top of it. Although neither is strictly necessary to building an Electron application, we will use GitHub releases to set up automatic updates later in the tutorial. Therefore, we recommend that you:

1. Install Git
2. Create a GitHub account

### Node.js and npm

To begin developing an Electron app, you need to install the Node.js runtime and its bundled npm package manager onto your system. We recommend that you use the latest long-term support (LTS) version.

You can check that Node.js was installed correctly by typing the following commands in your terminal client:

```bash
node -v
npm -v
```

Both commands should print their version numbers.

**Note:** Because Electron embeds Node.js into its binary, the version of Node.js running your code is unrelated to the version running on your system. Electron does not use your system's Node.js installation to run its code. This means that your end users do not need to install Node.js themselves as a prerequisite to running your app.

To check which version of Node.js is running in your app, you can access the global `process.versions` variable in the main process or preload script. You can also reference the releases.electronjs.org/headers/index.json.
