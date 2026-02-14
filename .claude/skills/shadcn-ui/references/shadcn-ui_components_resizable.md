---
title: Resizable
source_url: https://ui.shadcn.com/docs/components/radix/resizable
---

# Resizable

Accessible resizable panel groups and layouts with keyboard support.

## About

The `Resizable` component is built on top of [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) by [bvaughn](https://github.com/bvaughn).

## Installation

```bash
pnpm dlx shadcn@latest add resizable
```

## Usage

```typescript
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
```

```jsx
<ResizablePanelGroup orientation="horizontal">
  <ResizablePanel>One</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Two</ResizablePanel>
</ResizablePanelGroup>
```

## Examples

### Vertical

Use `orientation="vertical"` for vertical resizing.

### Handle

Use the `withHandle` prop on `ResizableHandle` to show a visible handle.

## RTL Support

To enable RTL support in shadcn/ui, refer to the RTL configuration guide.

## API Reference

See the [react-resizable-panels documentation](https://github.com/bvaughn/react-resizable-panels/tree/main/packages/react-resizable-panels) for complete API details.

## Changelog

### 2025-02-02 -- react-resizable-panels v4

Updated to `react-resizable-panels` v4. Notable changes for users of primitives directly:

| v3 | v4 |
|---|---|
| `PanelGroup` | `Group` |
| `PanelResizeHandle` | `Separator` |
| `direction` prop | `orientation` prop |
| `defaultSize={50}` | `defaultSize="50%"` |
| `onLayout` | `onLayoutChange` |
| `ImperativePanelHandle` | `PanelImperativeHandle` |
| `ref` prop on Panel | `panelRef` prop |
| `data-panel-group-direction` | `aria-orientation` |

The shadcn/ui wrapper components remain unchanged.
