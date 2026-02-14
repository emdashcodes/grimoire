---
title: CLI
source_url: https://ui.shadcn.com/docs/cli
---

# CLI

## init

The `init` command prepares configuration and dependencies for a new project, installing necessary packages and setting up the `cn` utility with CSS variables.

```bash
pnpm dlx shadcn@latest init
```

**Options:**

| Option | Description |
|--------|-------------|
| `-t, --template <template>` | Choose template (next, next-monorepo) |
| `-b, --base-color <base-color>` | Select base color (neutral, gray, zinc, stone, slate) |
| `-y, --yes` | Skip confirmation prompts (default: true) |
| `-f, --force` | Overwrite existing configuration (default: false) |
| `-c, --cwd <cwd>` | Set working directory |
| `-s, --silent` | Suppress output (default: false) |
| `--src-dir` | Use src directory for new projects (default: false) |
| `--css-variables` | Enable CSS variables for theming (default: true) |
| `--no-base-style` | Skip base shadcn style installation |

## add

The `add` command installs components and their dependencies to your project.

```bash
pnpm dlx shadcn@latest add [component]
```

**Options:**

| Option | Description |
|--------|-------------|
| `-y, --yes` | Skip confirmation (default: false) |
| `-o, --overwrite` | Replace existing files (default: false) |
| `-c, --cwd <cwd>` | Set working directory |
| `-a, --all` | Add all available components (default: false) |
| `-p, --path <path>` | Specify installation path |
| `-s, --silent` | Suppress output (default: false) |
| `--src-dir` | Use src directory |
| `--css-variables` | Enable CSS variables (default: true) |

## view

Preview registry items before installation.

```bash
pnpm dlx shadcn@latest view [item]
```

View multiple items or namespaced components:

```bash
pnpm dlx shadcn@latest view button card dialog
pnpm dlx shadcn@latest view @acme/auth @v0/dashboard
```

## search

Find components across registries.

```bash
pnpm dlx shadcn@latest search [registry]
pnpm dlx shadcn@latest search @shadcn -q "button"
pnpm dlx shadcn@latest search @shadcn @v0 @acme
```

The `list` command serves as an alias for `search`:

```bash
pnpm dlx shadcn@latest list @acme
```

## build

Generate registry JSON files from configuration.

```bash
pnpm dlx shadcn@latest build
```

Customize output location:

```bash
pnpm dlx shadcn@latest build --output ./public/registry
```

## migrate

Apply transformations to your project.

```bash
pnpm dlx shadcn@latest migrate [migration]
```

**Available Migrations:**

| Migration | Purpose |
|-----------|---------|
| `icons` | Switch to different icon library |
| `radix` | Upgrade to radix-ui |
| `rtl` | Enable RTL language support |

### migrate rtl

Transform components for right-to-left languages:

```bash
pnpm dlx shadcn@latest migrate rtl
```

Changes physical CSS properties to logical equivalents (`ml-4` to `ms-4`, `text-left` to `text-start`) and adds `rtl:` variants where needed.

Migrate specific files:

```bash
npx shadcn@latest migrate rtl src/components/ui/button.tsx
npx shadcn@latest migrate rtl "src/components/ui/**"
```

### migrate radix

Update imports from individual `@radix-ui/react-*` packages to the unified `radix-ui` package.

```bash
pnpm dlx shadcn@latest migrate radix
```

**Before:**

```javascript
import * as DialogPrimitive from "@radix-ui/react-dialog"
import * as SelectPrimitive from "@radix-ui/react-select"
```

**After:**

```javascript
import { Dialog as DialogPrimitive, Select as SelectPrimitive } from "radix-ui"
```

Migrate specific files or patterns:

```bash
npx shadcn@latest migrate radix src/components/ui/dialog.tsx
npx shadcn@latest migrate radix "src/components/ui/**"
```

After completion, remove unused `@radix-ui/react-*` packages from dependencies.
