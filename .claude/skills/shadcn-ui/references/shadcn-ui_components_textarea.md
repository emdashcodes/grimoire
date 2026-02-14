---
title: Textarea
source_url: https://ui.shadcn.com/docs/components/radix/textarea
---

# Textarea

Displays a form textarea or a component that looks like a textarea.

## Installation

```bash
pnpm dlx shadcn@latest add textarea
```

## Usage

```tsx
import { Textarea } from "@/components/ui/textarea"
```

```tsx
<Textarea />
```

## Examples

### Field

Combine with `Field`, `FieldLabel`, and `FieldDescription` to create a textarea with accompanying label and description text.

**Message** field with helper text: "Enter your message below."

### Disabled State

Apply the `disabled` prop to disable the textarea. Add the `data-disabled` attribute to the `Field` component to style the disabled state.

### Invalid State

Use the `aria-invalid` prop to mark the textarea as invalid. Add the `data-invalid` attribute to the `Field` component to apply invalid styling.

**Message** field with error message: "Please enter a valid message."

### With Button

Pair the textarea with a `Button` component to create a message input with a submit button.

Example shows a textarea with a "Send message" button.

## RTL Support

To enable right-to-left language support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).
