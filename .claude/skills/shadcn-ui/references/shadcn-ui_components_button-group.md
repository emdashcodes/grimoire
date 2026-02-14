---
title: Button Group
source_url: https://ui.shadcn.com/docs/components/radix/button-group
---

# Button Group

A container that groups related buttons together with consistent styling.

## Installation

```bash
pnpm dlx shadcn@latest add button-group
```

## Usage

```typescript
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
```

```jsx
<ButtonGroup>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>
```

## Accessibility

- The `ButtonGroup` component has the `role` attribute set to `group`
- Use Tab to navigate between the buttons in the group
- Use `aria-label` or `aria-labelledby` to label the button group

```jsx
<ButtonGroup aria-label="Button group">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>
```

## ButtonGroup vs ToggleGroup

- Use `ButtonGroup` when grouping buttons that perform an action
- Use `ToggleGroup` when grouping buttons that toggle a state

## Examples

### Orientation

Set the `orientation` prop to change the button group layout.

### Size

Control button sizes using the `size` prop on individual buttons.

### Nested

Nest `<ButtonGroup>` components to create button groups with spacing.

### Separator

The `ButtonGroupSeparator` component visually divides buttons within a group. Buttons with `outline` variant don't need a separator since they have a border.

### Split

Create a split button group by adding two buttons separated by `ButtonGroupSeparator`.

### Input

Wrap an `Input` component with buttons.

### Input Group

Wrap an `InputGroup` component to create complex input layouts.

### Dropdown Menu

Create a split button group with a `DropdownMenu` component.

### Select

Pair with a `Select` component.

### Popover

Use with a `Popover` component.

## RTL Support

To enable right-to-left support, see the RTL configuration guide.

## API Reference

### ButtonGroup

Container that groups related buttons with consistent styling.

| Prop | Type | Default |
|------|------|---------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |

Nest multiple button groups to create complex layouts with spacing.

### ButtonGroupSeparator

Visually divides buttons within a group.

| Prop | Type | Default |
|------|------|---------|
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` |

### ButtonGroupText

Display text within a button group.

| Prop | Type | Default |
|------|------|---------|
| `asChild` | `boolean` | `false` |

Use the `asChild` prop to render a custom component as text, such as a label.
