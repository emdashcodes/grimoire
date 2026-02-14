---
title: Sheet
source_url: https://ui.shadcn.com/docs/components/radix/sheet
---

# Sheet

Extends the Dialog component to display content that complements the main content of the screen.

## Installation

```bash
pnpm dlx shadcn@latest add sheet
```

## Usage

```typescript
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
```

```jsx
<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>This action cannot be undone.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

## Examples

### Side

Use the `side` prop on `SheetContent` to set the edge of the screen where the sheet appears. Values are `top`, `right`, `bottom`, or `left`.

### No Close Button

Use `showCloseButton={false}` on `SheetContent` to hide the close button.

## RTL

To enable right-to-left support in shadcn/ui, refer to the RTL configuration guide.

## API Reference

See the Radix UI Dialog documentation for complete API details.
