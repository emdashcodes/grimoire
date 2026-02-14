---
title: Tooltip
source_url: https://ui.shadcn.com/docs/components/radix/tooltip
---

# Tooltip

A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.

## Installation

Run the following command:

```bash
pnpm dlx shadcn@latest add tooltip
```

Add the `TooltipProvider` to the root of your app:

```tsx
import { TooltipProvider } from "@/components/ui/tooltip"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}
```

## Usage

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
```

```tsx
<Tooltip>
  <TooltipTrigger>Hover</TooltipTrigger>
  <TooltipContent>
    <p>Add to library</p>
  </TooltipContent>
</Tooltip>
```

## Examples

### Side

Use the `side` prop to change the position of the tooltip. Options include left, top, bottom, and right.

### With Keyboard Shortcut

Display keyboard shortcuts within tooltip content alongside descriptive text.

### Disabled Button

Show a tooltip on a disabled button by wrapping it with a span element.

## RTL

To enable RTL support in shadcn/ui, see the RTL configuration guide.

## API Reference

See the [Radix Tooltip documentation](https://www.radix-ui.com/primitives/docs/components/tooltip) for complete API details and available props.
