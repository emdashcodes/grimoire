---
title: Checkbox
source_url: https://ui.shadcn.com/docs/components/radix/checkbox
---

# Checkbox

A control that allows the user to toggle between checked and not checked.

## Installation

```bash
pnpm dlx shadcn@latest add checkbox
```

## Usage

```tsx
import { Checkbox } from "@/components/ui/checkbox"
```

```tsx
<Checkbox />
```

## Checked State

For uncontrolled checkboxes, use `defaultChecked`. To control the state, use `checked` and `onCheckedChange`:

```tsx
import * as React from "react"

export function Example() {
  const [checked, setChecked] = React.useState(false)

  return <Checkbox checked={checked} onCheckedChange={setChecked} />
}
```

## Invalid State

Set `aria-invalid` on the checkbox and `data-invalid` on the field wrapper to display invalid styling.

## Examples

### Basic

Pair the checkbox with `Field` and `FieldLabel` for proper layout and labeling.

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
```

### Description

Use `FieldContent` and `FieldDescription` for helper text.

### Disabled

Use the `disabled` prop to prevent interaction and add `data-disabled` to the `<Field>` component.

### Group

Use multiple fields to create a checkbox list.

### Table

The checkbox component works within table layouts for selecting rows.

## RTL Support

RTL support is available. See the RTL configuration guide for implementation details.

## API Reference

Refer to the Radix UI documentation for complete API reference information.
