---
title: Progress
source_url: https://ui.shadcn.com/docs/components/radix/progress
---

# Progress

Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.

## Installation

```bash
pnpm dlx shadcn@latest add progress
```

## Usage

```typescript
import { Progress } from "@/components/ui/progress"
```

```jsx
<Progress value={33} />
```

## Examples

### Label

Use a `Field` component to add a label to the progress bar.

```typescript
import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"
```

### Controlled

A progress bar that can be controlled by a slider.

```typescript
"use client"

import * as React from "react"
```

## RTL Support

To enable right-to-left language support in shadcn/ui, see the RTL configuration guide.

## API Reference

See the [Radix UI Progress documentation](https://www.radix-ui.com/docs/primitives/components/progress#api-reference) for complete API specifications and available props.
