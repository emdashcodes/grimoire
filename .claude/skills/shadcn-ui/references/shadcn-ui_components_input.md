---
title: Input
source_url: https://ui.shadcn.com/docs/components/radix/input
---

# Input

A text input component for forms and user data entry with built-in styling and accessibility features.

## Installation

```bash
pnpm dlx shadcn@latest add input
```

## Usage

```javascript
import { Input } from "@/components/ui/input"
```

```jsx
<Input />
```

## Examples

### Basic

```jsx
import { Input } from "@/components/ui/input"

export function InputBasic() {
  // Component implementation
}
```

### Field

Combine with `Field`, `FieldLabel`, and `FieldDescription` components to create an input with accompanying label and helper text.

```jsx
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
```

### Field Group

Use `FieldGroup` to display multiple `Field` blocks and construct forms.

```jsx
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldGroup
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
```

### Disabled

Apply the `disabled` prop to disable the input. Style disabled states by adding the `data-disabled` attribute to the `Field` component.

```jsx
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
```

### Invalid

Use the `aria-invalid` prop to mark the input as invalid. Apply the `data-invalid` attribute to the `Field` component for styling.

```jsx
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
```

### File

Apply `type="file"` to create a file upload input.

```jsx
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
```

### Inline

Use `Field` with `orientation="horizontal"` for side-by-side layouts. Pair with `Button` for search inputs.

```jsx
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
```

### Grid

Arrange multiple inputs in grid layouts for organized forms.

```jsx
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
```

### Required

Indicate mandatory fields using the `required` attribute.

```jsx
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
```

### Badge

Include `Badge` in labels to highlight recommended or special fields.

```jsx
import { Badge } from "@/components/ui/badge"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
```

### Input Group

Use `InputGroup` to add icons, text, or buttons within inputs.

```jsx
import { Field, FieldLabel } from "@/components/ui/field"
import { InputGroup } from "@/components/ui/input-group"
import { Input } from "@/components/ui/input"
```

### Button Group

Use `ButtonGroup` to attach buttons to inputs.

```jsx
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
```

### Form

A comprehensive form example combining multiple inputs, select elements, and submit buttons.

```jsx
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
```

## RTL

Enable RTL support by following the RTL configuration guide documentation.
