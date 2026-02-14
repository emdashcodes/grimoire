---
title: Tabs
source_url: https://ui.shadcn.com/docs/components/radix/tabs
---

# Tabs

A set of layered sections of content -- known as tab panels -- that are displayed one at a time.

## Installation

```bash
pnpm dlx shadcn@latest add tabs
```

## Usage

```tsx
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
```

```tsx
<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Make changes to your account here.
  </TabsContent>
  <TabsContent value="password">
    Change your password here.
  </TabsContent>
</Tabs>
```

## Examples

### Line

Use the `variant="line"` prop on `TabsList` for a line style.

```tsx
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsLine() {
  // Implementation example
}
```

### Vertical

Use `orientation="vertical"` for vertical tabs.

```tsx
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsVertical() {
  // Implementation example
}
```

### Disabled

```tsx
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsDisabled() {
  // Implementation example
}
```

### Icons

```tsx
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppWindowIcon, CodeIcon } from "lucide-react"
```

## RTL Support

To enable RTL support in shadcn/ui, see the RTL configuration guide.

## API Reference

See the [Radix Tabs documentation](https://www.radix-ui.com/primitives/docs/components/tabs) for complete API details.
