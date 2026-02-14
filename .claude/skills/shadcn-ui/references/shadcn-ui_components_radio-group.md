---
title: Radio Group
source_url: https://ui.shadcn.com/docs/components/radix/radio-group
---

# Radio Group

A set of checkable buttons--known as radio buttons--where no more than one of the buttons can be checked at a time.

## Installation

```bash
pnpm dlx shadcn@latest add radio-group
```

## Usage

```jsx
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
```

```jsx
<RadioGroup defaultValue="option-one">
  <div className="flex items-center gap-3">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>
```

## Examples

### Description

Radio group items with a description using the `Field` component. Available spacing options include Default (standard spacing), Comfortable (more space between elements), and Compact (minimal spacing for dense layouts).

### Choice Card

Use `FieldLabel` to wrap the entire `Field` for a clickable card-style selection. Examples include Plus, Pro, and Enterprise tier options.

### Fieldset

Use `FieldSet` and `FieldLegend` to group radio items with a label and description. Example shows subscription plan options with yearly and lifetime savings noted.

### Disabled

Use the `disabled` prop on `RadioGroupItem` to disable individual items.

### Invalid

Use `aria-invalid` on `RadioGroupItem` and `data-invalid` on `Field` to show validation errors.

## RTL Support

RTL (right-to-left) configuration is available. Refer to the RTL configuration guide for implementation details.

## API Reference

Consult the [Radix UI Radio Group documentation](https://www.radix-ui.com/docs/primitives/components/radio-group#api-reference) for comprehensive API specifications.
