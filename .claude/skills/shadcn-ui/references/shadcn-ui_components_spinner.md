---
title: Spinner
source_url: https://ui.shadcn.com/docs/components/radix/spinner
---

# Spinner

An indicator that can be used to show a loading state.

## Installation

```bash
pnpm dlx shadcn@latest add spinner
```

## Usage

```typescript
import { Spinner } from "@/components/ui/spinner"
```

```jsx
<Spinner />
```

## Customization

Replace the default spinner icon with any other icon by editing the `Spinner` component.

```typescript
import { LoaderIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
```

## Examples

### Size

Use the `size-*` utility class to change the spinner dimensions.

### Button

Add a spinner to a button to indicate loading state. Use `data-icon="inline-start"` to position at the beginning or `data-icon="inline-end"` for the end.

### Badge

Add a spinner to a badge for loading indication using the same positioning props.

### Input Group

Combine the spinner with input groups to show validation or processing status.

### Empty

Display a spinner within an empty state component while processing user requests.

## RTL Support

Enable RTL support by following the RTL configuration guide in the documentation.
