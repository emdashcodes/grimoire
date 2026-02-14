---
title: RTL
source_url: https://ui.shadcn.com/docs/rtl
---

# RTL

Right-to-left support for shadcn/ui components.

shadcn/ui components have first-class support for right-to-left (RTL) layouts. Text alignment, positioning, and directional styles automatically adapt for languages like Arabic, Hebrew, and Persian.

When you install components, the CLI automatically transforms physical positioning classes to logical equivalents, so your components work seamlessly in both LTR and RTL contexts.

## Get Started

Select your framework to get started with RTL support.

- [Next.js](/docs/rtl/next)
- [Vite](/docs/rtl/vite)
- [TanStack Start](/docs/rtl/start)

## How it works

When you add components with `rtl: true` set in your `components.json`, the shadcn CLI automatically transforms classes and props to be RTL compatible:

- Physical positioning classes like `left-*` and `right-*` are converted to logical equivalents like `start-*` and `end-*`.
- Directional props are updated to use logical values.
- Text alignment and spacing classes are adjusted accordingly.
- Supported icons are automatically flipped using `rtl:rotate-180`.

## Supported Styles

Automatic RTL transformation via the CLI is only available for projects created using `shadcn create` with the new styles (`base-nova`, `radix-nova`, etc.).

For other styles, see the Migration Guide section below.

## Font Recommendations

For the best RTL experience, it is recommended to use fonts that have proper support for your target language. Noto is a great font family for this and it pairs well with Inter and Geist.

See your framework's RTL guide under Get Started for details on installing and configuring RTL fonts.

## Animations

The CLI also handles animation classes, automatically transforming physical directional animations to their logical equivalents. For example, `slide-in-from-right` becomes `slide-in-from-end`.

This ensures animations like dropdowns, popovers, and tooltips animate in the correct direction based on the document's text direction.

### Note on tw-animate-css

There is a known issue with the `tw-animate-css` library where the logical slide utilities are not working as expected. For now, make sure you pass in the `dir` prop to portal elements.

```jsx
<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent dir="rtl">
    <div>Content</div>
  </PopoverContent>
</Popover>
```

```jsx
<Tooltip>
  <TooltipTrigger>Open</TooltipTrigger>
  <TooltipContent dir="rtl">
    <div>Content</div>
  </TooltipContent>
</Tooltip>
```

## Migrating existing components

If you have existing components installed before enabling RTL, you can migrate them using the CLI as follows:

### Run the migrate command

```bash
pnpm dlx shadcn@latest migrate rtl [path]
```

`[path]` accepts a path or glob pattern to migrate. If you don't provide a path, it will migrate all the files in the `ui` directory.

### Manual Migration (Optional)

The following components are not automatically migrated by the CLI. Follow the RTL support section for each component to manually migrate them.

- [Calendar](/docs/components/radix/calendar#rtl-support)
- [Pagination](/docs/components/radix/pagination#rtl-support)
- [Sidebar](/docs/components/radix/sidebar#rtl-support)

### Migrate Icons

Some icons like `ArrowRightIcon` or `ChevronLeftIcon` might need the `rtl:rotate-180` class to be flipped correctly. Add the `rtl:rotate-180` class to the icon component to flip it correctly.

```jsx
<ArrowRightIcon className="rtl:rotate-180" />
```

### Add direction component

```bash
pnpm dlx shadcn@latest add direction
```

### Add DirectionProvider

Follow your framework's documentation for details on how to add the `DirectionProvider` component to your project.

See the Get Started section for details on how to add the `DirectionProvider` component to your project.
