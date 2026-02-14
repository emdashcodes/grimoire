---
title: Input Group
source_url: https://ui.shadcn.com/docs/components/radix/input-group
---

# Input Group

Add addons, buttons, and helper content to inputs.

## Installation

```bash
pnpm dlx shadcn@latest add input-group
```

## Usage

```typescript
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
```

```jsx
<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
</InputGroup>
```

## Align

Use the `align` prop on `InputGroupAddon` to position the addon relative to the input.

For proper focus management, `InputGroupAddon` should always be placed after `InputGroupInput` or `InputGroupTextarea` in the DOM. Use the `align` prop to visually position the addon.

### inline-start

Use `align="inline-start"` to position the addon at the start of the input (default).

### inline-end

Use `align="inline-end"` to position the addon at the end of the input.

### block-start

Use `align="block-start"` to position the addon above the input.

### block-end

Use `align="block-end"` to position the addon below the input.

## Examples

The component supports various use cases including icons, text, buttons, keyboard shortcuts, dropdowns, spinners, and textareas.

## RTL Support

RTL (right-to-left) support is available. See the RTL configuration guide for implementation details.

## API Reference

### InputGroup

The main component that wraps inputs and addons.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### InputGroupAddon

Displays icons, text, buttons, or other content alongside inputs.

| Prop | Type | Default |
|------|------|---------|
| `align` | `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` | `"inline-start"` |
| `className` | `string` | — |

For `InputGroupInput`, use `inline-start` or `inline-end` alignment. For `InputGroupTextarea`, use `block-start` or `block-end` alignment.

### InputGroupButton

Displays buttons within input groups.

| Prop | Type | Default |
|------|------|---------|
| `size` | `"xs" \| "icon-xs" \| "sm" \| "icon-sm"` | `"xs"` |
| `variant` | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"ghost"` |
| `className` | `string` | — |

### InputGroupInput

Replacement for `<Input />` when building input groups. Includes pre-applied input group styles and uses the unified `data-slot="input-group-control"` for focus state handling.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

All other props are passed through to the underlying `<Input />` component.

### InputGroupTextarea

Replacement for `<Textarea />` when building input groups. Includes pre-applied textarea group styles and uses the unified `data-slot="input-group-control"` for focus state handling.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

All other props are passed through to the underlying `<Textarea />` component.

## Changelog

### 2025-10-06

Added the `min-w-0` class to the `InputGroup` component.
