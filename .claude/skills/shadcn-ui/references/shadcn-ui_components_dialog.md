---
title: Dialog
source_url: https://ui.shadcn.com/docs/components/radix/dialog
---

# Dialog

A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.

## Installation

```bash
pnpm dlx shadcn@latest add dialog
```

## Usage

```typescript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
```

```jsx
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

## Examples

### Custom Close Button

Replace the default close control with your own button.

### No Close Button

Use `showCloseButton={false}` to hide the close button.

### Sticky Footer

Keep actions visible while the content scrolls.

### Scrollable Content

Long content can scroll while the header stays in view.

## Right-to-Left (RTL)

To enable RTL support in shadcn/ui, see the RTL configuration guide.

## API Reference

See the Radix UI documentation for comprehensive API information.
