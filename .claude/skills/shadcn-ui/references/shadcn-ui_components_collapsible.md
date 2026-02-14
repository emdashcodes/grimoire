---
title: Collapsible
source_url: https://ui.shadcn.com/docs/components/radix/collapsible
---

# Collapsible

An interactive component which expands/collapses a panel.

## Installation

```bash
pnpm dlx shadcn@latest add collapsible
```

## Usage

```tsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
```

```tsx
<Collapsible>
  <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
  <CollapsibleContent>
    Yes. Free to use for personal and commercial projects. No attribution
    required.
  </CollapsibleContent>
</Collapsible>
```

## Controlled State

Manage the component's open/closed state using the `open` and `onOpenChange` props:

```tsx
import * as React from "react"

export function Example() {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Content</CollapsibleContent>
    </Collapsible>
  )
}
```

## Examples

The component supports various use cases including basic toggles, settings panels with form controls, and nested collapsibles for file tree structures.

## RTL Support

Right-to-left language support is available through the RTL configuration guide.

## API Reference

Refer to the Radix UI documentation for comprehensive API details and additional configuration options.
