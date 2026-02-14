---
title: Select
source_url: https://ui.shadcn.com/docs/components/radix/select
---

# Select

Displays a list of options for the user to pick from -- triggered by a button.

## Installation

```bash
pnpm dlx shadcn@latest add select
```

## Usage

```jsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
```

```jsx
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="light">Light</SelectItem>
      <SelectItem value="dark">Dark</SelectItem>
      <SelectItem value="system">System</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

## Examples

### Align Item With Trigger

Utilize the `position` prop on `SelectContent` to manage alignment. When set to `position="item-aligned"` (the default), the popup positions with the selected item appearing above the trigger. When `position="popper"` is used, the popup aligns to the trigger edge.

### Groups

Use `SelectGroup`, `SelectLabel`, and `SelectSeparator` to structure items.

### Scrollable

A select component that accommodates numerous items with scrolling functionality.

### Disabled

A select component in a disabled state.

### Invalid

Add the `data-invalid` attribute to the `Field` component and the `aria-invalid` attribute to the `SelectTrigger` component to display an error state.

```jsx
<Field data-invalid>
  <FieldLabel>Fruit</FieldLabel>
  <SelectTrigger aria-invalid>
    <SelectValue />
  </SelectTrigger>
</Field>
```

## RTL

For RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

## API Reference

See the [Radix UI Select](https://www.radix-ui.com/docs/primitives/components/select#api-reference) documentation for comprehensive API details.
