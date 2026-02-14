---
title: Toggle Group
source_url: https://ui.shadcn.com/docs/components/radix/toggle-group
---

# Toggle Group

A set of two-state buttons that can be toggled on or off.

## Installation

```bash
pnpm dlx shadcn@latest add toggle-group
```

## Usage

```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

<ToggleGroup type="single">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
  <ToggleGroupItem value="c">C</ToggleGroupItem>
</ToggleGroup>
```

## Examples

### Outline

Use `variant="outline"` for an outline-styled toggle group.

### Size

Adjust toggle group dimensions using the `size` prop with options like small, medium, or large.

### Spacing

Add gaps between items with the `spacing` property to customize layout density.

### Vertical

Apply `orientation="vertical"` to stack toggle items vertically instead of horizontally.

### Disabled

Disable entire groups or individual items to prevent user interaction.

### Custom

Create specialized toggle groups with custom styling, icons, and content combinations.

## RTL Support

Enable RTL functionality by following the RTL configuration guide to support right-to-left languages like Arabic and Hebrew.

## API Reference

See the [Radix Toggle Group documentation](https://www.radix-ui.com/primitives/docs/components/toggle-group) for detailed prop specifications and behavior.
