---
title: Menubar
source_url: https://ui.shadcn.com/docs/components/radix/menubar
---

# Menubar

A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.

## Installation

```bash
pnpm dlx shadcn@latest add menubar
```

## Usage

```typescript
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
```

```jsx
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarGroup>
        <MenubarItem>
          New Tab <MenubarShortcut>⌘T</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>New Window</MenubarItem>
      </MenubarGroup>
      <MenubarSeparator />
      <MenubarGroup>
        <MenubarItem>Share</MenubarItem>
        <MenubarItem>Print</MenubarItem>
      </MenubarGroup>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

## Examples

### Checkbox

Use `MenubarCheckboxItem` for toggleable options.

### Radio

Use `MenubarRadioGroup` and `MenubarRadioItem` for single-select options.

### Submenu

Use `MenubarSub`, `MenubarSubTrigger`, and `MenubarSubContent` for nested menus.

### With Icons

Incorporate icon elements alongside menu items for visual enhancement.

## RTL Support

To enable right-to-left language support in shadcn/ui, consult the RTL configuration guide.

## API Reference

For comprehensive component properties and behaviors, refer to the [Radix UI Menubar documentation](https://www.radix-ui.com/docs/primitives/components/menubar#api-reference).
