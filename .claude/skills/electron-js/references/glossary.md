---
title: Glossary
source_url: https://www.electronjs.org/docs/latest/glossary
---

# Glossary

## ASAR

ASAR stands for Atom Shell Archive Format. An asar archive is a simple tar-like format that concatenates files into a single file. Electron can read files from it without unpacking the entire archive. The format was created primarily to enhance performance on Windows when reading numerous small files.

## ASAR integrity

A security feature that validates ASAR archive contents during runtime. When enabled, the Electron app verifies the header hash of its ASAR archive. If no hash exists or hashes don't match, the application terminates forcefully.

## code signing

A process where developers digitally sign their code to verify it hasn't been altered after packaging. Both Windows and macOS implement their own code signing versions, which is important for public distribution.

## context isolation

A security measure ensuring that preload scripts cannot expose privileged Electron or Node.js APIs to web contents in the renderer process. The only way to expose APIs is through the `contextBridge` API.

## CRT

The C Runtime Library represents the portion of the C++ Standard Library incorporating the ISO C99 standard library. Visual C++ libraries supporting it enable native code development and both mixed and pure managed code.

## DMG

An Apple Disk Image is a macOS packaging format commonly used for distributing application installers.

## IME

Input Method Editor allows users to enter characters and symbols not found on their keyboard, enabling input of Chinese, Japanese, Korean, and Indic characters.

## IDL

Interface Description Language writes function signatures and data types usable for generating interfaces in Java, C++, JavaScript, and other languages.

## IPC

IPC stands for inter-process communication. Electron uses IPC to send serialized JSON messages between the main and renderer processes.

## main process

The main process, commonly a file named `main.js`, is the entry point to every Electron app. It controls the app's lifecycle, manages native elements like menus and docks, and creates renderer processes. The full Node API is built in.

## MAS

Acronym for Apple's Mac App Store, the official marketplace for macOS applications.

## Mojo

An IPC system for communicating intra- or inter-process, which allows Chrome to split work into separate processes based on memory pressures.

## MSI

On Windows, MSI packages are used by the Windows Installer service to install and configure applications.

## native modules

Native modules (also called addons in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the `require()` function. They primarily provide interfaces between JavaScript and C/C++ libraries.

## notarization

A macOS-specific process where developers submit code-signed apps to Apple servers for verification against malicious components through automated service.

## OSR

Offscreen rendering (OSR) loads heavy pages in the background for later display, allowing page rendering without displaying it on screen, resulting in faster performance.

## preload script

Scripts containing code executed in the renderer process before web contents load. They run within the renderer context but access Node.js APIs with elevated privileges.

## process

An instance of a computer program being executed. Electron apps using main and multiple renderer processes run several programs simultaneously. Each process has a global `process` object providing information and control.

## renderer process

A browser window in an app. Unlike the main process, multiple renderer processes can exist, each running separately and potentially hidden from view.

## sandbox

A security feature inherited from Chromium that restricts renderer processes to a limited set of permissions.

## Squirrel

Squirrel is an open-source framework that enables Electron apps to update automatically as new versions are released.

## userland

A term distinguishing between core framework features and community-created packages. Electron maintains a small API set for essential primitives while allowing users to create additional tools.

## utility process

A child of the main process allowing untrusted services to run separately. Chromium uses it for network I/O, audio/video processing, and device inputs.

## V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. Electron builds V8 as part of Chromium and points Node to that version during its build.

## webview

Tags used to embed guest content like external web pages in Electron apps. Each webview runs in a separate process, differs from iframes, and all interactions are asynchronous for security.
