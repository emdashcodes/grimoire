---
title: Item
source_url: https://ui.shadcn.com/docs/components/radix/item
---

# Item

A versatile component for displaying content with media, title, description, and actions.

## Overview

The `Item` component is a straightforward flex container that can house nearly any type of content. Use it to display a title, description, and actions. Group it with the `ItemGroup` component to create a list of items.

## Installation

```bash
pnpm dlx shadcn@latest add item
```

## Usage

```typescript
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
```

```jsx
<Item>
  <ItemMedia variant="icon">
    <Icon />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Title</ItemTitle>
    <ItemDescription>Description</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button>Action</Button>
  </ItemActions>
</Item>
```

## Item vs Field

Use `Field` if you need to display a form input such as a checkbox, input, radio, or select.

If you only need to display content such as a title, description, and actions, use `Item`.

## Variants

### Default Variant

Transparent background with no border.

### Outline Variant

Outlined style with a visible border.

### Muted Variant

Muted background for secondary content.

## Sizes

### Default Size

The standard size for most use cases.

### Small Size

A compact size for dense layouts.

### Extra Small Size

The most compact size available.

## Examples

### Icon

Use `ItemMedia` with `variant="icon"` to display an icon.

### Avatar

You can use `ItemMedia` with `variant="avatar"` to display an avatar.

### Image

Use `ItemMedia` with `variant="image"` to display an image.

### Group

Use `ItemGroup` to group related items together.

### Header

Use `ItemHeader` to add a header above the item content.

### Link

Use the `asChild` prop to render the item as a link. The hover and focus states will be applied to the anchor element.

```jsx
<Item asChild>
  <a href="/dashboard">
    <ItemMedia variant="icon">
      <HomeIcon />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Dashboard</ItemTitle>
      <ItemDescription>Overview of your account and activity.</ItemDescription>
    </ItemContent>
  </a>
</Item>
```

### Dropdown

Select component functionality with Item.

## RTL Support

To enable RTL support in shadcn/ui, refer to the RTL configuration guide.

## API Reference

### Item

The main component for displaying content with media, title, description, and actions.

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"default" \| "outline" \| "muted"` | `"default"` |
| `size` | `"default" \| "sm" \| "xs"` | `"default"` |
| `asChild` | `boolean` | `false` |

### ItemGroup

A container that groups related items together with consistent styling.

```jsx
<ItemGroup>
  <Item />
  <Item />
</ItemGroup>
```

### ItemSeparator

A separator between items in a group.

```jsx
<ItemGroup>
  <Item />
  <ItemSeparator />
  <Item />
</ItemGroup>
```

### ItemMedia

Use `ItemMedia` to display media content such as icons, images, or avatars.

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"default" \| "icon" \| "image"` | `"default"` |

### ItemContent

Wraps the title and description of the item.

```jsx
<ItemContent>
  <ItemTitle>Title</ItemTitle>
  <ItemDescription>Description</ItemDescription>
</ItemContent>
```

### ItemTitle

Displays the title of the item.

```jsx
<ItemTitle>Item Title</ItemTitle>
```

### ItemDescription

Displays the description of the item.

```jsx
<ItemDescription>Item description</ItemDescription>
```

### ItemActions

Container for action buttons or other interactive elements.

```jsx
<ItemActions>
  <Button>Action</Button>
</ItemActions>
```

### ItemHeader

Displays a header above the item content.

```jsx
<Item>
  <ItemHeader>Header</ItemHeader>
  <ItemContent>...</ItemContent>
</Item>
```

### ItemFooter

Displays a footer below the item content.

```jsx
<Item>
  <ItemContent>...</ItemContent>
  <ItemFooter>Footer</ItemFooter>
</Item>
```
