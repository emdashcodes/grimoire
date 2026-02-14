---
title: Scroll Area
source_url: https://ui.shadcn.com/docs/components/radix/scroll-area
---

# Scroll Area

Augments native scroll functionality for custom, cross-browser styling.

## Installation

```bash
pnpm dlx shadcn@latest add scroll-area
```

## Usage

```typescript
import { ScrollArea } from "@/components/ui/scroll-area"
```

```jsx
<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  Your scrollable content here.
</ScrollArea>
```

## Examples

### Horizontal

Use `ScrollBar` with `orientation="horizontal"` for horizontal scrolling.

```typescript
import * as React from "react"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
```

## RTL Support

To enable RTL support in shadcn/ui, see the RTL configuration guide.

## API Reference

See the Radix UI Scroll Area documentation for complete API details.

## CSS Implementation

The component implements custom scrollbar hiding across browsers:

```css
[data-radix-scroll-area-viewport] {
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

[data-radix-scroll-area-viewport]::-webkit-scrollbar {
  display: none;
}
```
