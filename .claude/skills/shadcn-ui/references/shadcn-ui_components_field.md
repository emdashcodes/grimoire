---
title: Field
source_url: https://ui.shadcn.com/docs/components/radix/field
---

# Field

Combine labels, controls, and help text to compose accessible form fields and grouped inputs.

## Installation

```bash
pnpm dlx shadcn@latest add field
```

## Usage

```typescript
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
```

```jsx
<FieldSet>
  <FieldLegend>Profile</FieldLegend>
  <FieldDescription>This appears on invoices and emails.</FieldDescription>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="name">Full name</FieldLabel>
      <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
      <FieldDescription>This appears on invoices and emails.</FieldDescription>
    </Field>
    <Field>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" autoComplete="off" aria-invalid />
      <FieldError>Choose another username.</FieldError>
    </Field>
    <Field orientation="horizontal">
      <Switch id="newsletter" />
      <FieldLabel htmlFor="newsletter">Subscribe to the newsletter</FieldLabel>
    </Field>
  </FieldGroup>
</FieldSet>
```

## Anatomy

The Field family supports composing accessible forms. A standard field structure:

```jsx
<Field>
  <FieldLabel htmlFor="input-id">Label</FieldLabel>
  {/* Input, Select, Switch, etc. */}
  <FieldDescription>Optional helper text.</FieldDescription>
  <FieldError>Validation message.</FieldError>
</Field>
```

**Components:**
- `Field`: Core wrapper for individual fields
- `FieldContent`: Flex column grouping label and description (optional)
- `FieldGroup`: Stacks related fields with consistent spacing
- `FieldSet` + `FieldLegend`: Semantic grouping for related field sets

## Form Integration

See the Forms documentation for building forms using the Field component with React Hook Form or Tanstack Form.

## Responsive Layout

- **Vertical fields**: Default orientation stacks label, control, and helper text for mobile-first layouts
- **Horizontal fields**: Set `orientation="horizontal"` on Field to align label and control side-by-side
- **Responsive fields**: Set `orientation="responsive"` for automatic column layout switching in container-aware parents

## Validation and Errors

- Add `data-invalid` to Field to activate error state styling
- Add `aria-invalid` on input elements for assistive technologies
- Render `FieldError` after the control to maintain proper alignment

```jsx
<Field data-invalid>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" type="email" aria-invalid />
  <FieldError>Enter a valid email address.</FieldError>
</Field>
```

## Accessibility

- `FieldSet` and `FieldLegend` group related controls for keyboard and assistive tech users
- `Field` outputs `role="group"` so nested controls inherit labeling from `FieldLabel` and `FieldLegend`
- Apply `FieldSeparator` selectively to maintain clear section boundaries for screen readers

## API Reference

### FieldSet

Container rendering a semantic fieldset with spacing presets.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### FieldLegend

Legend element for a FieldSet. Use the label variant to align with label sizing.

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"legend" \| "label"` | `"legend"` |
| `className` | `string` | — |

### FieldGroup

Layout wrapper stacking Field components with container query support for responsive orientations.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### Field

Core wrapper providing orientation control, invalid state styling, and spacing.

| Prop | Type | Default |
|------|------|---------|
| `orientation` | `"vertical" \| "horizontal" \| "responsive"` | `"vertical"` |
| `className` | `string` | — |
| `data-invalid` | `boolean` | — |

### FieldContent

Flex column grouping control and descriptions when label sits beside control.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### FieldLabel

Label styled for both direct inputs and nested Field children.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |
| `asChild` | `boolean` | `false` |

### FieldTitle

Title with label styling inside FieldContent.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### FieldDescription

Helper text slot with automatic line balancing for horizontal layouts.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### FieldSeparator

Visual divider separating sections inside FieldGroup with optional inline content.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### FieldError

Accessible error container accepting children or errors array (from react-hook-form).

| Prop | Type | Default |
|------|------|---------|
| `errors` | `Array<{ message?: string } \| undefined>` | — |
| `className` | `string` | — |

Accepts validators implementing Standard Schema, including Zod, Valibot, and ArkType.
