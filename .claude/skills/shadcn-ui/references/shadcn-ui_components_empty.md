---
title: Empty
source_url: https://ui.shadcn.com/docs/components/radix/empty
---

# Empty

Use the Empty component to display an empty state.

```tsx
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven't created any projects yet. Get started by creating your
          first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Create Project</Button>
        <Button variant="outline">Import Project</Button>
      </EmptyContent>
    </Empty>
  )
}
```

## Installation

```bash
pnpm dlx shadcn@latest add empty
```

## Usage

```tsx
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
```

```tsx
<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Icon />
    </EmptyMedia>
    <EmptyTitle>No data</EmptyTitle>
    <EmptyDescription>No data found</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Add data</Button>
  </EmptyContent>
</Empty>
```

## Examples

### Outline

Use the `border` utility class to create an outline empty state.

### Background

Use the `bg-*` and `bg-gradient-*` utilities to add a background to the empty state.

### Avatar

Use the `EmptyMedia` component to display an avatar in the empty state.

### Avatar Group

Use the `EmptyMedia` component to display an avatar group in the empty state.

### InputGroup

You can add an `InputGroup` component to the `EmptyContent` component.

## RTL

To enable RTL support in shadcn/ui, see the RTL configuration guide.

## API Reference

### Empty

The main component of the empty state. Wraps the `EmptyHeader` and `EmptyContent` components.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

```tsx
<Empty>
  <EmptyHeader />
  <EmptyContent />
</Empty>
```

### EmptyHeader

The `EmptyHeader` component wraps the empty media, title, and description.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

```tsx
<EmptyHeader>
  <EmptyMedia />
  <EmptyTitle />
  <EmptyDescription />
</EmptyHeader>
```

### EmptyMedia

Use the `EmptyMedia` component to display the media of the empty state such as an icon or an image. You can also use it to display other components such as an avatar.

| Prop | Type | Default |
|---------|------|---------|
| `variant` | `"default" \| "icon"` | `default` |
| `className` | `string` | — |

```tsx
<EmptyMedia variant="icon">
  <Icon />
</EmptyMedia>
```

```tsx
<EmptyMedia>
  <Avatar>
    <AvatarImage src="..." />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</EmptyMedia>
```

### EmptyTitle

Use the `EmptyTitle` component to display the title of the empty state.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

```tsx
<EmptyTitle>No data</EmptyTitle>
```

### EmptyDescription

Use the `EmptyDescription` component to display the description of the empty state.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

```tsx
<EmptyDescription>You do not have any notifications.</EmptyDescription>
```

### EmptyContent

Use the `EmptyContent` component to display the content of the empty state such as a button, input or a link.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

```tsx
<EmptyContent>
  <Button>Add Project</Button>
</EmptyContent>
```
