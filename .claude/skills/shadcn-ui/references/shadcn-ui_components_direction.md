---
title: Direction
source_url: https://ui.shadcn.com/docs/components/radix/direction
---

# Direction

A provider component that sets the text direction for your application.

## Overview

The `DirectionProvider` component is used to establish the text direction (`ltr` or `rtl`) for your application. This capability is essential for supporting right-to-left languages such as Arabic, Hebrew, and Persian.

A preview of the component in RTL mode is available, with language selection options to demonstrate different configurations. Additional RTL examples can be found in the RTL sections throughout the component documentation.

## Installation

```bash
pnpm dlx shadcn@latest add direction
```

## Usage

```typescript
import { DirectionProvider } from "@/components/ui/direction"
```

```jsx
<html dir="rtl">
  <body>
    <DirectionProvider direction="rtl">
      {/* Your app content */}
    </DirectionProvider>
  </body>
</html>
```

## useDirection Hook

The `useDirection` hook retrieves the current text direction setting for the application.

```typescript
import { useDirection } from "@/components/ui/direction"

function MyComponent() {
  const direction = useDirection()
  return <div>Current direction: {direction}</div>
}
```
