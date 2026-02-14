---
title: Monorepo
source_url: https://ui.shadcn.com/docs/monorepo
---

# Monorepo

Using shadcn/ui components and CLI in a monorepo.

## Overview

Previously, implementing shadcn/ui in monorepo environments presented challenges around component installation paths and import management. The enhanced CLI now provides native monorepo support, automatically handling correct file placement, dependency installation, and import path resolution.

## Getting started

### Create a new monorepo project

Execute the `init` command and select the monorepo option:

```bash
pnpm dlx shadcn@latest init
```

When prompted, choose `Next.js (Monorepo)`. This scaffolds a new monorepo with two workspaces -- `web` and `ui` -- using Turborepo as the build system. React 19 and Tailwind CSS v4 are included.

### Add components to your project

Navigate to your app directory and run the `add` command:

```bash
cd apps/web
pnpm dlx shadcn@latest add [COMPONENT]
```

The CLI intelligently determines component type and installs files to appropriate paths. For instance, running `add button` places the button under `packages/ui`, while `add login-01` installs related components (`button`, `label`, `input`, `card`) to `packages/ui` and the form component to `apps/web/components`.

### Importing components

Import from the `@workspace/ui` package:

```typescript
import { Button } from "@workspace/ui/components/button"
import { useTheme } from "@workspace/ui/hooks/use-theme"
import { cn } from "@workspace/ui/lib/utils"
```

## File Structure

```
apps
└── web
    ├── app
    │   └── page.tsx
    ├── components
    │   └── login-form.tsx
    ├── components.json
    └── package.json

packages
└── ui
    ├── src
    │   ├── components
    │   │   └── button.tsx
    │   ├── hooks
    │   ├── lib
    │   │   └── utils.ts
    │   └── styles
    │       └── globals.css
    ├── components.json
    └── package.json

package.json
turbo.json
```

## Requirements

1. **Configuration files**: Every workspace requires both `package.json` and `components.json`. The latter instructs the CLI on installation locations and import handling.

2. **Alias configuration**: Define proper aliases in `components.json` to guide component, hook, and utility imports.

Example `apps/web/components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "../../packages/ui/src/styles/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "hooks": "@/hooks",
    "lib": "@/lib",
    "utils": "@workspace/ui/lib/utils",
    "ui": "@workspace/ui/components"
  }
}
```

Example `packages/ui/components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@workspace/ui/components",
    "utils": "@workspace/ui/lib/utils",
    "hooks": "@workspace/ui/hooks",
    "lib": "@workspace/ui/lib",
    "ui": "@workspace/ui/components"
  }
}
```

3. **Consistency**: Maintain matching `style`, `iconLibrary`, and `baseColor` values across all `components.json` files.

4. **Tailwind v4**: For Tailwind CSS v4, leave the `tailwind` config field empty in `components.json`.
