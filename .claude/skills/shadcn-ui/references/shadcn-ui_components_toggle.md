---
title: Toggle
source_url: https://ui.shadcn.com/docs/components/radix/toggle
---

# Toggle

A two-state button that can be either on or off.

## Installation

```bash
pnpm dlx shadcn@latest add toggle
```

## Usage

```tsx
import { Toggle } from "@/components/ui/toggle"

export function ToggleDemo() {
  return <Toggle>Toggle</Toggle>
}
```

## Examples

### Outline

Use `variant="outline"` for an outline style.

```tsx
import { Toggle } from "@/components/ui/toggle"
import { BoldIcon, ItalicIcon } from "lucide-react"

export function ToggleOutline() {
  return (
    <div>
      <Toggle variant="outline">
        <BoldIcon className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline">
        <ItalicIcon className="h-4 w-4" />
      </Toggle>
    </div>
  )
}
```

### With Text

```tsx
import { Toggle } from "@/components/ui/toggle"
import { ItalicIcon } from "lucide-react"

export function ToggleWithText() {
  return (
    <Toggle>
      <ItalicIcon className="mr-2 h-4 w-4" />
      Italic
    </Toggle>
  )
}
```

### Size

Use the `size` prop to change the toggle dimensions.

```tsx
import { Toggle } from "@/components/ui/toggle"

export function ToggleSizes() {
  return (
    <div>
      <Toggle size="sm">Small</Toggle>
      <Toggle size="default">Default</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  )
}
```

### Disabled

```tsx
import { Toggle } from "@/components/ui/toggle"

export function ToggleDisabled() {
  return (
    <div>
      <Toggle disabled>Disabled</Toggle>
    </div>
  )
}
```

## RTL Support

To enable right-to-left support in shadcn/ui, refer to the RTL configuration documentation.

## API Reference

See the [Radix Toggle documentation](https://www.radix-ui.com/primitives/docs/components/toggle) for complete API specifications and component props.
