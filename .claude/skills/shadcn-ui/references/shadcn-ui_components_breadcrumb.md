---
title: Breadcrumb
source_url: https://ui.shadcn.com/docs/components/radix/breadcrumb
---

# Breadcrumb

Displays the path to the current resource using a hierarchy of links.

## Installation

```bash
pnpm dlx shadcn@latest add breadcrumb
```

## Usage

```typescript
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
```

```jsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## Examples

### Basic

A basic breadcrumb with a home link and a components link.

### Custom Separator

Compose `<BreadcrumbSeparator />` with custom children to override the default separator icon.

### Dropdown

Combine `<BreadcrumbItem />` with `<DropdownMenu />` to create a dropdown within the breadcrumb.

### Collapsed

Use `<BreadcrumbEllipsis />` to display a collapsed state when the breadcrumb exceeds optimal length.

### Link Component

Apply the `asChild` prop on `<BreadcrumbLink />` to integrate a custom link component from your routing solution.

## RTL

To enable RTL support in shadcn/ui, see the RTL configuration guide.

## API Reference

### Breadcrumb

The root navigation element that wraps all breadcrumb components.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### BreadcrumbList

Displays the ordered list of breadcrumb items.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### BreadcrumbItem

Wraps individual breadcrumb items.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### BreadcrumbLink

Displays a clickable link in the breadcrumb.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### BreadcrumbPage

Displays the current page in the breadcrumb (non-clickable).

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### BreadcrumbSeparator

Displays a separator between breadcrumb items. Custom children override the default separator icon.

| Prop | Type | Default |
|------|------|---------|
| `children` | `React.ReactNode` | — |
| `className` | `string` | — |

### BreadcrumbEllipsis

Displays an ellipsis indicator for collapsed breadcrumb items.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |
