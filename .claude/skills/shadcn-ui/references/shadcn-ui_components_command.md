---
title: Command
source_url: https://ui.shadcn.com/docs/components/radix/command
---

# Command

Command menu for search and quick actions.

## About

The `<Command />` component uses the `cmdk` component by pacocoursey.

## Installation

```bash
pnpm dlx shadcn@latest add command
```

## Usage

```tsx
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
```

```tsx
<Command className="max-w-sm rounded-lg border">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Billing</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

## Examples

### Basic

A simple command menu in a dialog.

### Shortcuts

Command menu displaying keyboard shortcuts alongside actions.

### Groups

A command menu with groups, icons and separators.

### Scrollable

Scrollable command menu with multiple items.

## RTL Support

To enable RTL support in shadcn/ui, see the RTL configuration guide.

## API Reference

See the [cmdk documentation](https://github.com/pacocoursey/cmdk) for more information.
