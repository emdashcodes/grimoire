---
title: Sonner
source_url: https://ui.shadcn.com/docs/components/radix/sonner
---

# Sonner

An opinionated toast component for React.

## About

Sonner is built and maintained by [emilkowalski](https://twitter.com/emilkowalski).

## Installation

```bash
pnpm dlx shadcn@latest add sonner
```

### Add the Toaster component

In your root layout file (`app/layout.tsx`):

```tsx
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
```

## Usage

Import the toast function and use it in your components:

```tsx
import { toast } from "sonner"

toast("Event has been created.")
```

## Examples

### Types

The component supports multiple toast types:

- Default
- Success
- Info
- Warning
- Error
- Promise

### Description

Toasts can display additional descriptive text alongside the main message.

### Position

Use the `position` prop to customize where toasts appear on the screen:

- Top Left
- Top Center
- Top Right
- Bottom Left
- Bottom Center
- Bottom Right

## API Reference

For comprehensive documentation on all available options and methods, see the [Sonner API Reference](https://sonner.emilkowal.ski/getting-started).
