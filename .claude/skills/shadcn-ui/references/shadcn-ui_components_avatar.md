---
title: Avatar
source_url: https://ui.shadcn.com/docs/components/radix/avatar
---

# Avatar

An image element with a fallback for representing the user.

## Installation

```bash
pnpm dlx shadcn@latest add avatar
```

## Usage

```typescript
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
```

```jsx
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

## Examples

### Basic

A basic avatar component with an image and a fallback.

### Badge

Use the `AvatarBadge` component to add a badge to the avatar. The badge is positioned at the bottom right.

Customize the badge with the `className` prop for custom colors, sizes, and other styling.

```jsx
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
  <AvatarBadge className="bg-green-600 dark:bg-green-800" />
</Avatar>
```

### Badge with Icon

You can also use an icon inside `<AvatarBadge>`.

### Avatar Group

Use the `AvatarGroup` component to display a group of avatars.

### Avatar Group Count

Use `<AvatarGroupCount>` to add a count indicator to the group.

### Avatar Group with Icon

You can use an icon inside `<AvatarGroupCount>`.

### Sizes

Use the `size` prop to change the avatar size.

### Dropdown

You can use the `Avatar` component as a trigger for a dropdown menu.

## RTL

To enable RTL support in shadcn/ui, see the RTL configuration guide.

## API Reference

### Avatar

The root component that wraps the avatar image and fallback.

| Prop | Type | Default |
|------|------|---------|
| `size` | `"default" \| "sm" \| "lg"` | `"default"` |
| `className` | `string` | — |

### AvatarImage

Displays the avatar image. Accepts all Radix UI Avatar Image props.

| Prop | Type | Default |
|------|------|---------|
| `src` | `string` | — |
| `alt` | `string` | — |
| `className` | `string` | — |

### AvatarFallback

Displays a fallback when the image fails to load. Accepts all Radix UI Avatar Fallback props.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### AvatarBadge

Displays a badge indicator on the avatar, typically positioned at the bottom right.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### AvatarGroup

Displays a group of avatars with overlapping styling.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### AvatarGroupCount

Displays a count indicator in an avatar group, typically showing the number of additional avatars.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

For more information about Radix UI Avatar props, see the Radix UI documentation.
