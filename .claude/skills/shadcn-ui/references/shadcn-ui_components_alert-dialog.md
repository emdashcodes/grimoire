---
title: Alert Dialog
source_url: https://ui.shadcn.com/docs/components/radix/alert-dialog
---

# Alert Dialog

A modal dialog that interrupts the user with important content and expects a response.

## Installation

```bash
pnpm dlx shadcn@latest add alert-dialog
```

## Usage

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
```

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Show Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Examples

### Basic

A basic alert dialog with a title, description, and cancel and continue buttons.

### Small

Use the `size="sm"` prop to make the alert dialog smaller.

### Media

Use the `AlertDialogMedia` component to add a media element such as an icon or image to the alert dialog.

### Small with Media

Use the `size="sm"` prop combined with `AlertDialogMedia` to create a smaller dialog with visual elements.

### Destructive

Use the `AlertDialogAction` component to add a destructive action button to the alert dialog.

## RTL

To enable RTL support in shadcn/ui, see the RTL configuration guide.

## API Reference

### AlertDialogContent

| Prop | Type | Default |
|------|------|---------|
| `size` | `"default" \| "sm"` | `"default"` |

For additional information about other components and their properties, refer to the Radix UI documentation.
