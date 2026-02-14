---
title: JavaScript
source_url: https://ui.shadcn.com/docs/javascript
---

# JavaScript

## Overview

This documentation explains how to use shadcn/ui with JavaScript instead of TypeScript.

The project and the components are written in TypeScript. It is recommended to use TypeScript for your project as well. However, the project provides a JavaScript version of components available through the CLI.

## Configuration

To opt out of TypeScript, set the `tsx` flag to `false` in your `components.json` file:

```json
{
  "style": "new-york",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

## Import Aliases Setup

To configure import aliases for JavaScript projects, use the following `jsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

This configuration allows you to use path aliases like `@/components` throughout your JavaScript codebase, matching the standard shadcn/ui setup patterns.
