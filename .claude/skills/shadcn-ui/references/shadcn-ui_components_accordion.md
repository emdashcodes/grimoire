---
title: Accordion
source_url: https://ui.shadcn.com/docs/components/radix/accordion
---

# Accordion

A vertically stacked set of interactive headings that each reveal a section of content.

## Installation

```bash
pnpm dlx shadcn@latest add accordion
```

## Usage

```typescript
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
```

```jsx
<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

## Examples

### Basic

A basic accordion that shows one item at a time. The first item is open by default.

### Multiple

Use `type="multiple"` to allow multiple items to be open simultaneously.

### Disabled

Use the `disabled` prop on `AccordionItem` to disable individual items.

### Borders

Add `border` to the `Accordion` and `border-b last:border-b-0` to the `AccordionItem` to add borders to the items.

### Card

Wrap the `Accordion` in a `Card` component.

## RTL

To enable right-to-left support in shadcn/ui, refer to the RTL configuration guide.

## API Reference

See the Radix UI documentation for additional API information.
