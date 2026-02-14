---
title: Navigation Menu
source_url: https://ui.shadcn.com/docs/components/radix/navigation-menu
---

# Navigation Menu

A collection of links for navigating websites.

## Installation

```bash
pnpm dlx shadcn@latest add navigation-menu
```

## Usage

```typescript
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
```

```jsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

## Link Component

Leverage the `asChild` property to integrate a custom link component, such as Next.js `Link`:

```typescript
import Link from "next/link"
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function NavigationMenuDemo() {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link href="/docs">Documentation</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}
```

## RTL Support

To implement right-to-left language support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

## API Reference

For comprehensive API documentation, refer to the [Radix UI Navigation Menu documentation](https://www.radix-ui.com/docs/primitives/components/navigation-menu#api-reference).
