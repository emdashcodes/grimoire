---
title: Slider
source_url: https://ui.shadcn.com/docs/components/radix/slider
---

# Slider

An input where the user selects a value from within a given range.

## Installation

```bash
pnpm dlx shadcn@latest add slider
```

## Usage

```typescript
import { Slider } from "@/components/ui/slider"
```

```jsx
<Slider defaultValue={[33]} max={100} step={1} />
```

## Examples

### Range

Use an array with two values to create a range slider.

```jsx
import { Slider } from "@/components/ui/slider"

export function SliderRange() {
  // Implementation with two-value array
}
```

### Multiple Thumbs

Use an array with multiple values to display multiple draggable handles.

```jsx
import { Slider } from "@/components/ui/slider"

export function SliderMultiple() {
  // Implementation with multiple values
}
```

### Vertical

Add `orientation="vertical"` to display the slider vertically.

```jsx
import { Slider } from "@/components/ui/slider"

export function SliderVertical() {
  // Implementation with vertical orientation
}
```

### Controlled

Manage slider state programmatically.

```jsx
"use client"

import * as React from "react"

export function SliderControlled() {
  // Controlled component implementation
}
```

### Disabled

Use the `disabled` prop to prevent user interaction.

```jsx
import { Slider } from "@/components/ui/slider"

export function SliderDisabled() {
  // Disabled state implementation
}
```

## RTL Support

RTL (right-to-left) support is available. See the [RTL configuration guide](/docs/rtl) for setup instructions.

## API Reference

For complete API documentation, reference the [Radix UI Slider documentation](https://www.radix-ui.com/docs/primitives/components/slider#api-reference).
