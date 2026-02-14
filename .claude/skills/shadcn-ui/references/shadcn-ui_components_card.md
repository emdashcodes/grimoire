---
title: Card
source_url: https://ui.shadcn.com/docs/components/radix/card
---

# Card

Displays a card with header, content, and footer.

## Installation

```bash
pnpm dlx shadcn@latest add card
```

## Usage

```tsx
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
```

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
```

## Examples

### Size

Use the `size="sm"` prop to set the card to a smaller, more compact appearance.

### Image

Add an image before the card header to create a card with image display.

## API Reference

### Card

The root container for card content.

| Prop | Type | Default |
|------|------|---------|
| `size` | `"default" \| "sm"` | `"default"` |
| `className` | `string` | — |

### CardHeader

Used for a title, description, and optional action.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### CardTitle

Displays the card title.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### CardDescription

Helper text positioned under the title.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### CardAction

Places content in the header's top-right area (buttons or badges).

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### CardContent

The main body of the card.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### CardFooter

Actions and secondary content at the bottom.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |
