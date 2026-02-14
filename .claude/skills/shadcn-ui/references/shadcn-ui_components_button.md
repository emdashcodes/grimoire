---
title: Button
source_url: https://ui.shadcn.com/docs/components/radix/button
---

# Button

Displays a button or a component that looks like a button.

## Installation

```bash
pnpm dlx shadcn@latest add button
```

## Usage

```typescript
import { Button } from "@/components/ui/button"
```

```jsx
<Button variant="outline">Button</Button>
```

## Cursor

Tailwind v4 transitioned from `cursor: pointer` to `cursor: default` for button elements.

To restore pointer cursor behavior, add this to your CSS:

```css
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

## Examples

### Size

Adjust button dimensions using the `size` prop:

- Extra Small (`xs`)
- Small (`sm`)
- Default
- Large (`lg`)

```typescript
import { Button } from "@/components/ui/button"
import { ArrowUpRightIcon } from "lucide-react"
```

### Variants

**Default**
```jsx
<Button>Button</Button>
```

**Outline**
```jsx
<Button variant="outline">Outline</Button>
```

**Secondary**
```jsx
<Button variant="secondary">Secondary</Button>
```

**Ghost**
```jsx
<Button variant="ghost">Ghost</Button>
```

**Destructive**
```jsx
<Button variant="destructive">Destructive</Button>
```

**Link**
```jsx
<Button variant="link">Link</Button>
```

### Icon Button

```typescript
import { Button } from "@/components/ui/button"
import { CircleFadingArrowUpIcon } from "lucide-react"
```

### With Icon

Include `data-icon="inline-start"` or `data-icon="inline-end"` for proper spacing:

```typescript
import { Button } from "@/components/ui/button"
import { IconGitBranch } from "@tabler/icons-react"
```

### Rounded

Apply `rounded-full` class for pill-shaped buttons:

```typescript
import { Button } from "@/components/ui/button"
import { ArrowUpIcon } from "lucide-react"
```

### Spinner

Use `<Spinner />` component inside for loading states. Add `data-icon` attributes for alignment:

```typescript
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
```

### Button Group

Combine multiple buttons using `ButtonGroup`. See [Button Group documentation](/docs/components/radix/button-group).

### Link as Button

Use `asChild` prop to style other components as buttons:

```typescript
import Link from "next/link"
import { Button } from "@/components/ui/button"
```

```jsx
<Link href="/login">
  <Button asChild>Login</Button>
</Link>
```

## RTL Support

Enable RTL through the RTL configuration guide.

## API Reference

### Button

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"default" \| "outline" \| "ghost" \| "destructive" \| "secondary" \| "link"` | `"default"` |
| `size` | `"default" \| "xs" \| "sm" \| "lg" \| "icon" \| "icon-xs" \| "icon-sm" \| "icon-lg"` | `"default"` |
| `asChild` | `boolean` | `false` |
