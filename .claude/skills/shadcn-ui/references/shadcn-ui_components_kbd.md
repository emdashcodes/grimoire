---
title: Kbd
source_url: https://ui.shadcn.com/docs/components/radix/kbd
---

# Kbd

Used to display textual user input from keyboard.

## Installation

```bash
pnpm dlx shadcn@latest add kbd
```

## Usage

```tsx
import { Kbd } from "@/components/ui/kbd"

export function KbdExample() {
  return <Kbd>Ctrl</Kbd>
}
```

## Examples

### Group

Use the `KbdGroup` component to group keyboard keys together.

```tsx
import { Kbd, KbdGroup } from "@/components/ui/kbd"

export function KbdGroupExample() {
  return (
    <div>
      <p>Use <KbdGroup><Kbd>Ctrl</Kbd><Kbd>B</Kbd></KbdGroup> to open the command palette</p>
    </div>
  )
}
```

### Button

Use the `Kbd` component inside a `Button` component to display a keyboard key inside a button.

```tsx
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"

export function KbdButtonExample() {
  return <Button>Accept <Kbd>⏎</Kbd></Button>
}
```

### Tooltip

Use the `Kbd` component inside a `Tooltip` component to display a tooltip with a keyboard key.

### Input Group

Use the `Kbd` component inside an `InputGroupAddon` component to display a keyboard key in an input group.

## RTL Support

To enable right-to-left support, see the RTL configuration guide.

## API Reference

### Kbd

Displays a keyboard key.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | `` |

```tsx
<Kbd>Ctrl</Kbd>
```

### KbdGroup

Groups `Kbd` components together.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | `` |

```tsx
<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>B</Kbd>
</KbdGroup>
```
