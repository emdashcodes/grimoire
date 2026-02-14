---
title: Label
source_url: https://ui.shadcn.com/docs/components/radix/label
---

# Label

Renders an accessible label associated with controls.

## Installation

```bash
pnpm dlx shadcn@latest add label
```

## Usage

```jsx
import { Label } from "@/components/ui/label"
```

```jsx
<Label htmlFor="email">Your email address</Label>
```

## Label in Field

For form fields, use the `Field` component which includes built-in `FieldLabel`, `FieldDescription`, and `FieldError` components.

```jsx
<Field>
   <FieldLabel htmlFor="email">Your email address</FieldLabel>
   <Input id="email" />
</Field>
```

## RTL Support

To enable RTL support in shadcn/ui, see the RTL configuration guide at `/docs/rtl`.

## API Reference

See the [Radix UI Label](https://www.radix-ui.com/docs/primitives/components/label#api-reference) documentation for more information.
