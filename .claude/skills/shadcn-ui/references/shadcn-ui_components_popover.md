---
title: Popover
source_url: https://ui.shadcn.com/docs/components/radix/popover
---

# Popover

Displays rich content in a portal, triggered by a button.

## Installation

```bash
pnpm dlx shadcn@latest add popover
```

## Usage

```typescript
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
```

```jsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Title</PopoverTitle>
      <PopoverDescription>Description text here.</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>
```

## Examples

### Basic

A simple popover featuring a header, title, and description section.

### Align

Use the `align` prop on `PopoverContent` to manage horizontal positioning (Start, Center, End options available).

### With Form

A popover containing form input fields.

## RTL Support

RTL (right-to-left) support is available. Refer to the RTL configuration guide for implementation details.

## API Reference

See the [Radix UI Popover documentation](https://www.radix-ui.com/docs/primitives/components/popover#api-reference) for complete API specifications.
