---
title: Hover Card
source_url: https://ui.shadcn.com/docs/components/radix/hover-card
---

# Hover Card

For sighted users to preview content available behind a link.

## Installation

```bash
pnpm dlx shadcn@latest add hover-card
```

## Usage

```typescript
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
```

```jsx
<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent>
    The React Framework – created and maintained by @vercel.
  </HoverCardContent>
</HoverCard>
```

## Trigger Delays

Control when the card opens and closes using `openDelay` and `closeDelay` props on the `HoverCard` component:

```jsx
<HoverCard openDelay={100} closeDelay={200}>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent>Content</HoverCardContent>
</HoverCard>
```

## Positioning

Use the `side` and `align` props on `HoverCardContent` to control placement:

```jsx
<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent side="top" align="start">
    Content
  </HoverCardContent>
</HoverCard>
```

## RTL Support

To enable RTL support in shadcn/ui, see the RTL configuration guide.

## API Reference

See the Radix UI documentation for comprehensive API reference information.
