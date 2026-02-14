---
title: Switch
source_url: https://ui.shadcn.com/docs/components/radix/switch
---

# Switch

A control that allows the user to toggle between checked and not checked.

## Installation

```bash
pnpm dlx shadcn@latest add switch
```

## Usage

```tsx
import { Switch } from "@/components/ui/switch"
```

```tsx
<Switch />
```

## Examples

### Description

Share across devices

Focus is shared across devices, and turns off when you leave the app.

### Choice Card

Card-style selection where `FieldLabel` wraps the entire `Field` for a clickable card pattern.

**Share across devices**
Focus is shared across devices, and turns off when you leave the app.

**Enable notifications**
Receive notifications when focus mode is enabled or disabled.

### Disabled

Add the `disabled` prop to the `Switch` component to disable the switch. Add the `data-disabled` prop to the `Field` component for styling.

### Invalid

Add the `aria-invalid` prop to the `Switch` component to indicate an invalid state. Add the `data-invalid` prop to the `Field` component for styling.

Accept terms and conditions

You must accept the terms and conditions to continue.

### Size

Use the `size` prop to change the size of the switch.

- Small
- Default

## RTL

To enable RTL support in shadcn/ui, see the RTL configuration guide.

## API Reference

See the [Radix Switch documentation](https://www.radix-ui.com/primitives/docs/components/switch).
