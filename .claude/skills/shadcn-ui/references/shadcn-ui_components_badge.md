---
title: Badge
source_url: https://ui.shadcn.com/docs/components/radix/badge
---

# Badge

Displays a badge or a component that looks like a badge.

## Installation

```bash
pnpm dlx shadcn@latest add badge
```

## Usage

```typescript
import { Badge } from "@/components/ui/badge"
```

```jsx
<Badge variant="default | outline | secondary | destructive">Badge</Badge>
```

## Examples

### Variants

Use the `variant` prop to change the badge's appearance.

Available variants:
- `default`
- `secondary`
- `destructive`
- `outline`
- `ghost`

### With Icon

Render an icon inside the badge using `data-icon` attribute:
- `data-icon="inline-start"` - renders icon on the left
- `data-icon="inline-end"` - renders icon on the right

```jsx
import { Badge } from "@/components/ui/badge"
import { BadgeCheck, BookmarkIcon } from "lucide-react"
```

### With Spinner

You can include a spinner inside the badge. Remember to add `data-icon="inline-start"` or `data-icon="inline-end"` to the spinner element.

```jsx
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
```

### Link

Use the `asChild` prop to render a link as a badge.

```jsx
import { Badge } from "@/components/ui/badge"
import { ArrowUpRightIcon } from "lucide-react"
```

### Custom Colors

Customize badge colors by adding custom classes like `bg-green-50 dark:bg-green-800` to the Badge component.

Available color options: Blue, Green, Sky, Purple, Red

## RTL Support

To enable right-to-left language support, follow the RTL configuration guide.

## API Reference

### Badge Component

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"default" \| "secondary" \| "destructive" \| "outline" \| "ghost" \| "link"` | `"default"` |
| `className` | `string` | — |
