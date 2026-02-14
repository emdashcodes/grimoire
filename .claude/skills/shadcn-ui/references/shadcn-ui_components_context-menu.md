---
title: Context Menu
source_url: https://ui.shadcn.com/docs/components/radix/context-menu
---

# Context Menu

Displays a menu of actions triggered by a right click.

## Installation

```bash
pnpm dlx shadcn@latest add context-menu
```

## Usage

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
```

```tsx
<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Profile</ContextMenuItem>
    <ContextMenuItem>Billing</ContextMenuItem>
    <ContextMenuItem>Team</ContextMenuItem>
    <ContextMenuItem>Subscription</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

## Examples

### Basic

A simple context menu with a few actions.

### Submenu

Use `ContextMenuSub` to nest secondary actions.

### Shortcuts

Add `ContextMenuShortcut` to show keyboard hints.

### Groups

Group related actions and separate them with dividers.

### Icons

Combine icons with labels for quick scanning.

### Checkboxes

Use `ContextMenuCheckboxItem` for toggles.

### Radio

Use `ContextMenuRadioItem` for exclusive choices.

### Destructive

Use `variant="destructive"` to style the menu item as destructive.

## RTL

To enable RTL support in shadcn/ui, see the RTL configuration guide.

## API Reference

See the Radix UI documentation for additional information.
