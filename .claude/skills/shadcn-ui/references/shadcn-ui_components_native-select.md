---
title: Native Select
source_url: https://ui.shadcn.com/docs/components/radix/native-select
---

# Native Select

A styled native HTML select element with consistent design system integration.

## Overview

The Native Select component provides a wrapper around the standard HTML `<select>` element with consistent styling across the design system. It offers better performance and native browser behavior compared to custom select implementations.

## Installation

```bash
pnpm dlx shadcn@latest add native-select
```

## Usage

```typescript
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"
```

Basic implementation:

```jsx
<NativeSelect>
  <NativeSelectOption value="">Select a fruit</NativeSelectOption>
  <NativeSelectOption value="apple">Apple</NativeSelectOption>
  <NativeSelectOption value="banana">Banana</NativeSelectOption>
  <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
  <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
</NativeSelect>
```

## Examples

### Grouped Options

Organize related choices into categories using `NativeSelectOptGroup`:

```jsx
<NativeSelect>
  <NativeSelectOptGroup label="Engineering">
    <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
    <NativeSelectOption value="backend">Backend</NativeSelectOption>
    <NativeSelectOption value="devops">DevOps</NativeSelectOption>
  </NativeSelectOptGroup>
  <NativeSelectOptGroup label="Sales">
    <NativeSelectOption value="sales-rep">Sales Rep</NativeSelectOption>
    <NativeSelectOption value="account-mgr">Account Manager</NativeSelectOption>
    <NativeSelectOption value="sales-dir">Sales Director</NativeSelectOption>
  </NativeSelectOptGroup>
</NativeSelect>
```

### Disabled State

Add the `disabled` property to prevent user interaction:

```jsx
<NativeSelect disabled>
  <NativeSelectOption value="">Select fruit</NativeSelectOption>
  <NativeSelectOption value="apple">Apple</NativeSelectOption>
</NativeSelect>
```

### Validation Error State

Use `aria-invalid` to indicate validation errors and `data-invalid` on the `Field` component:

```jsx
<NativeSelect aria-invalid="true">
  <NativeSelectOption value="">Select fruit</NativeSelectOption>
  <NativeSelectOption value="apple">Apple</NativeSelectOption>
</NativeSelect>
```

## Native Select vs Select

- **Native Select**: Provides browser-native functionality, superior performance, and optimized mobile experience
- **Select**: Offers extensive customization, animations, and complex interaction patterns

## RTL Support

RTL (right-to-left) support is available. Refer to the RTL configuration guide for setup details.

## API Reference

### NativeSelect

Main wrapper component for the native HTML select element.

```jsx
<NativeSelect>
  <NativeSelectOption value="option1">Option 1</NativeSelectOption>
  <NativeSelectOption value="option2">Option 2</NativeSelectOption>
</NativeSelect>
```

### NativeSelectOption

Individual selectable option.

| Prop | Type | Default |
|------|------|---------|
| `value` | `string` | - |
| `disabled` | `boolean` | `false` |

### NativeSelectOptGroup

Groups related options together.

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | - |
| `disabled` | `boolean` | `false` |

```jsx
<NativeSelectOptGroup label="Fruits">
  <NativeSelectOption value="apple">Apple</NativeSelectOption>
  <NativeSelectOption value="banana">Banana</NativeSelectOption>
</NativeSelectOptGroup>
```
