---
title: Aspect Ratio
source_url: https://ui.shadcn.com/docs/components/radix/aspect-ratio
---

# Aspect Ratio

Displays content within a desired ratio.

## Installation

```bash
pnpm dlx shadcn@latest add aspect-ratio
```

## Usage

```jsx
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
```

```jsx
<AspectRatio ratio={16 / 9}>
  <Image src="..." alt="Image" className="rounded-md object-cover" />
</AspectRatio>
```

## Examples

### Square

A square aspect ratio component using the `ratio={1 / 1}` prop, useful for displaying images in square format.

### Portrait

A portrait aspect ratio component using the `ratio={9 / 16}` prop, useful for displaying images in portrait format.

## RTL Support

To enable RTL support in shadcn/ui, see the RTL configuration guide.

## API Reference

### AspectRatio

The component displays content within a desired ratio.

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `ratio` | `number` | — | Yes |
| `className` | `string` | — | No |

For additional information, see the [Radix UI documentation](https://www.radix-ui.com/primitives/docs/components/aspect-ratio#api-reference).
