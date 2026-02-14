---
title: Drawer
source_url: https://ui.shadcn.com/docs/components/radix/drawer
---

# Drawer

A drawer component for React.

## About

Drawer is built on top of [Vaul](https://github.com/emilkowalski/vaul) by [emilkowalski](https://twitter.com/emilkowalski).

## Installation

```bash
pnpm dlx shadcn@latest add drawer
```

## Usage

```typescript
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
```

```jsx
<Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>
        This action cannot be undone.
      </DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

## Examples

### Scrollable Content

Keep actions visible while the content scrolls.

### Sides

Use the `direction` prop to set the side of the drawer. Available options are `top`, `right`, `bottom`, and `left`.

### Responsive Dialog

Combine the `Dialog` and `Drawer` components to create a responsive dialog that displays as a `Dialog` on desktop and a `Drawer` on mobile.

## RTL Support

To enable RTL support in shadcn/ui, reference the [RTL configuration guide](/docs/rtl).

## API Reference

See the [Vaul documentation](https://vaul.emilkowal.ski/getting-started) for the full API reference.
