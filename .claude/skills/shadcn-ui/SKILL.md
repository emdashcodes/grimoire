---
name: shadcn-ui
description: Use this skill when building UI with shadcn/ui components, configuring shadcn/ui theming or styling, adding shadcn/ui components to a project, working with shadcn/ui forms (React Hook Form or TanStack Form), or answering questions about shadcn/ui APIs, patterns, and CLI commands.
allowed-tools: Read
---

# shadcn/ui

## Overview

shadcn/ui is a component distribution system — not a traditional component library. It gives you actual component source code that you own and customize directly. Components are built on Radix UI primitives with Tailwind CSS styling, installed via CLI into your project's `components/ui/` directory.

## When to Use This Skill

Activate this skill when:

- Building or customizing UI components with shadcn/ui
- Adding new shadcn/ui components to a project (`shadcn add ...`)
- Configuring theming, dark mode, or CSS variables for shadcn/ui
- Working with forms using shadcn/ui + React Hook Form or TanStack Form
- Building data tables, charts, sidebars, or other complex shadcn/ui patterns
- Setting up shadcn/ui in a new project or monorepo
- Looking up component APIs, props, variants, or usage patterns

## Quick Reference

```bash
# Initialize shadcn/ui in a project
pnpm dlx shadcn@latest init

# Add a component
pnpm dlx shadcn@latest add button

# Add multiple components
pnpm dlx shadcn@latest add button card dialog
```

```tsx
// Standard import pattern — all components from @/components/ui/
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

// cn utility for conditional classes
import { cn } from "@/lib/utils"
```

```tsx
// Typical component usage
<Button variant="outline" size="sm">Click me</Button>
<Badge variant="secondary">Status</Badge>
<Input placeholder="Type here..." />
```

**Key conventions:**
- Components live in `components/ui/` — you own and edit them directly
- Use `cn()` utility for merging Tailwind classes conditionally
- Config in `components.json` at project root
- Tailwind CSS v4 is current; v3 docs at v3.shadcn.com

## Getting Started

### Introduction

Core philosophy: open code, composition, distribution, beautiful defaults, AI-ready.

**Reference**: `references/shadcn-ui_introduction.md`

**When to reference**: When explaining shadcn/ui's approach or why it differs from traditional component libraries.

### Installation

Framework-specific setup (Next.js, Vite, Remix, Astro, etc.) and `shadcn init` walkthrough.

**Reference**: `references/shadcn-ui_installation.md`

**When to reference**: When setting up shadcn/ui in a new project or adding it to an existing framework.

### CLI

Commands: `init`, `add`, `diff`, `build`. Options for each command including template selection, base colors, and monorepo support.

**Reference**: `references/shadcn-ui_cli.md`

**When to reference**: When running shadcn CLI commands, troubleshooting installation, or building custom registries.

### components.json Configuration

Full schema for `components.json` — style, RSC support, Tailwind config, path aliases, icon library, and registry URLs.

**Reference**: `references/shadcn-ui_components-json.md`

**When to reference**: When configuring project paths, changing icon libraries, setting up custom registries, or troubleshooting import path issues.

### Components Overview

Index of all available components with links.

**Reference**: `references/shadcn-ui_components-overview.md`

**When to reference**: When browsing available components or checking if a specific component exists.

## Theming & Styling

### Theming

CSS variables for colors, spacing, and radii. How to customize the design system with `@theme` in Tailwind v4.

**Reference**: `references/shadcn-ui_theming.md`

**When to reference**: When customizing colors, creating theme variants, or understanding the CSS variable naming convention.

### Dark Mode

Setup for dark mode with `next-themes` or class-based toggling.

**Reference**: `references/shadcn-ui_dark-mode.md`

**When to reference**: When adding dark mode toggle or configuring theme persistence.

## Configuration

### JavaScript (Non-TypeScript)

Using shadcn/ui without TypeScript — JSX setup and configuration.

**Reference**: `references/shadcn-ui_javascript.md`

**When to reference**: When working in a JavaScript-only project without TypeScript.

### Monorepo

Setting up shadcn/ui in Turborepo or other monorepo structures with shared UI packages.

**Reference**: `references/shadcn-ui_monorepo.md`

**When to reference**: When configuring shadcn/ui across multiple packages in a monorepo.

### RTL Support

Right-to-left layout configuration, logical properties, and per-component RTL patterns.

**Reference**: `references/shadcn-ui_rtl.md`

**When to reference**: When building interfaces that support Arabic, Hebrew, or other RTL languages.

### MCP Server

shadcn/ui's official MCP server for AI-assisted component generation and management.

**Reference**: `references/shadcn-ui_mcp.md`

**When to reference**: When integrating shadcn/ui with AI tools or using the MCP server for component operations.

### Legacy (Tailwind v3)

Pointer to v3.shadcn.com for projects still on Tailwind CSS v3.

**Reference**: `references/shadcn-ui_legacy.md`

**When to reference**: When working with a Tailwind v3 project and need v3-compatible docs.

## Forms

### Forms Overview

Approach to form building — composing Field, Label, Input, and validation components.

**Reference**: `references/shadcn-ui_forms.md`

**When to reference**: When deciding which form library to use with shadcn/ui.

### React Hook Form

Complete integration guide with Zod validation, Field component, error handling, and complex form patterns (select, checkbox, switch, textarea, combobox, date picker).

**Reference**: `references/shadcn-ui_forms_react-hook-form.md`

**When to reference**: When building forms with React Hook Form + shadcn/ui, especially for validation patterns and Field component usage.

### TanStack Form

Integration with TanStack Form including validation, field arrays, and complex form patterns.

**Reference**: `references/shadcn-ui_forms_tanstack-form.md`

**When to reference**: When building forms with TanStack Form + shadcn/ui.

## Components — Inputs & Form Controls

### Button

Variants (default, outline, ghost, destructive, secondary, link), sizes (xs, sm, default, lg, icon), `asChild` prop, spinner loading state, icon placement with `data-icon`.

**Reference**: `references/shadcn-ui_components_button.md`

**When to reference**: When adding buttons, customizing button variants, or creating button-like links with `asChild`.

### Button Group

Grouping multiple buttons together with shared borders and spacing.

**Reference**: `references/shadcn-ui_components_button-group.md`

**When to reference**: When creating toolbar-style button groups (e.g., Archive/Report/Snooze).

### Input, Input Group, Input OTP

Text input with variants, input groups (prefix/suffix icons, addons), and OTP/verification code input.

**References**: `references/shadcn-ui_components_input.md`, `references/shadcn-ui_components_input-group.md`, `references/shadcn-ui_components_input-otp.md`

**When to reference**: When building text inputs, search bars with icons, or verification code fields.

### Textarea

Multi-line text input with Field integration.

**Reference**: `references/shadcn-ui_components_textarea.md`

**When to reference**: When adding multi-line text areas to forms.

### Select & Native Select

Radix-based custom select and native HTML select. Groups, alignment, scrollable, disabled/invalid states.

**References**: `references/shadcn-ui_components_select.md`, `references/shadcn-ui_components_native-select.md`

**When to reference**: When building dropdown selectors — use Select for styled dropdowns, Native Select for mobile-optimized or accessible fallbacks.

### Checkbox, Radio Group, Switch

Toggle controls for forms — single checkboxes, radio button groups, and on/off switches. All integrate with Field component.

**References**: `references/shadcn-ui_components_checkbox.md`, `references/shadcn-ui_components_radio-group.md`, `references/shadcn-ui_components_switch.md`

**When to reference**: When adding boolean or choice-based form controls.

### Slider

Range input with single or multiple thumbs, vertical orientation, controlled state.

**Reference**: `references/shadcn-ui_components_slider.md`

**When to reference**: When building range sliders or numeric range selectors.

### Toggle & Toggle Group

Two-state pressed/unpressed buttons, individually or as groups.

**References**: `references/shadcn-ui_components_toggle.md`, `references/shadcn-ui_components_toggle-group.md`

**When to reference**: When building toggle controls like bold/italic toolbars or view mode switches.

### Label & Field

Form label component and Field wrapper (combines label, description, error message, and form control).

**References**: `references/shadcn-ui_components_label.md`, `references/shadcn-ui_components_field.md`

**When to reference**: When building form layouts with labels, descriptions, and validation error messages.

### Calendar & Date Picker

Calendar component (React Day Picker v9) and date picker built on Calendar + Popover.

**References**: `references/shadcn-ui_components_calendar.md`, `references/shadcn-ui_components_date-picker.md`

**When to reference**: When adding date selection — calendar for inline display, date picker for popover-triggered selection.

### Combobox

Searchable dropdown built on Command + Popover. Supports filtering, custom rendering, and form integration.

**Reference**: `references/shadcn-ui_components_combobox.md`

**When to reference**: When building autocomplete/typeahead search inputs or searchable selects.

## Components — Navigation

### Breadcrumb

Page navigation breadcrumbs with customizable separators, dropdown for collapsed items, and responsive patterns.

**Reference**: `references/shadcn-ui_components_breadcrumb.md`

### Tabs

Tabbed interface with line variant, vertical orientation, icons, and disabled states.

**Reference**: `references/shadcn-ui_components_tabs.md`

### Navigation Menu

Top-level site navigation with dropdowns, viewport animations, and responsive patterns.

**Reference**: `references/shadcn-ui_components_navigation-menu.md`

### Menubar

Desktop application-style menu bar (File, Edit, View pattern).

**Reference**: `references/shadcn-ui_components_menubar.md`

### Pagination

Page navigation with previous/next and numbered page links.

**Reference**: `references/shadcn-ui_components_pagination.md`

### Command

Command palette / search interface (cmdk-based). Supports groups, shortcuts, and dialog mode.

**Reference**: `references/shadcn-ui_components_command.md`

## Components — Data Display

### Table & Data Table

Basic HTML table styling and comprehensive data table guide with TanStack Table (sorting, filtering, pagination, row selection, column visibility).

**References**: `references/shadcn-ui_components_table.md`, `references/shadcn-ui_components_data-table.md`

**When to reference**: When building any tabular data display. Data Table reference is extensive (~24KB) — read it for complex table features.

### Chart

Charting with Recharts — area, bar, line, pie, radar, and radial charts with shadcn/ui theming integration.

**Reference**: `references/shadcn-ui_components_chart.md`

**When to reference**: When adding data visualizations or charts to a project.

### Avatar & Badge

User avatars (image + fallback) and status badges (default, secondary, destructive, outline variants).

**References**: `references/shadcn-ui_components_avatar.md`, `references/shadcn-ui_components_badge.md`

### Skeleton & Spinner

Loading state placeholders (skeleton shapes) and animated loading spinners.

**References**: `references/shadcn-ui_components_skeleton.md`, `references/shadcn-ui_components_spinner.md`

### Progress

Progress bar with determinate and indeterminate states.

**Reference**: `references/shadcn-ui_components_progress.md`

### Typography & Kbd

Typography utility classes (h1-h4, p, blockquote, lists, lead, muted) and keyboard shortcut display component.

**References**: `references/shadcn-ui_components_typography.md`, `references/shadcn-ui_components_kbd.md`

### Empty & Item

Empty state placeholder component and generic item component for lists.

**References**: `references/shadcn-ui_components_empty.md`, `references/shadcn-ui_components_item.md`

### Carousel

Embla Carousel integration with horizontal/vertical orientation, autoplay, and custom controls.

**Reference**: `references/shadcn-ui_components_carousel.md`

## Components — Overlays & Dialogs

### Dialog & Alert Dialog

Modal dialog (closeable) and alert dialog (requires explicit action to dismiss). Both support custom content, headers, footers.

**References**: `references/shadcn-ui_components_dialog.md`, `references/shadcn-ui_components_alert-dialog.md`

**When to reference**: When building modal windows — Dialog for general content, Alert Dialog for confirmations that block interaction.

### Drawer & Sheet

Drawer slides from bottom (mobile-optimized via Vaul), Sheet slides from any edge (top/right/bottom/left, extends Dialog).

**References**: `references/shadcn-ui_components_drawer.md`, `references/shadcn-ui_components_sheet.md`

**When to reference**: When building slide-out panels — Drawer for mobile bottom sheets, Sheet for side panels.

### Popover & Hover Card

Popover for click-triggered floating content, Hover Card for hover-triggered preview cards.

**References**: `references/shadcn-ui_components_popover.md`, `references/shadcn-ui_components_hover-card.md`

### Tooltip

Hover/focus tooltip with side positioning, keyboard shortcuts, and `TooltipProvider` setup.

**Reference**: `references/shadcn-ui_components_tooltip.md`

### Dropdown Menu & Context Menu

Dropdown menu (click-triggered) and context menu (right-click-triggered). Submenus, checkboxes, radio groups, keyboard shortcuts.

**References**: `references/shadcn-ui_components_dropdown-menu.md`, `references/shadcn-ui_components_context-menu.md`

## Components — Feedback

### Alert

Static alert banners with destructive/default variants and icon support.

**Reference**: `references/shadcn-ui_components_alert.md`

### Sonner (Toast Notifications)

Toast notifications with types (success, info, warning, error, promise), positioning, and custom styling.

**Reference**: `references/shadcn-ui_components_sonner.md`

**When to reference**: When adding toast/notification messages. This replaces the deprecated Toast component.

### Toast (Deprecated)

Legacy toast component — use Sonner instead.

**Reference**: `references/shadcn-ui_components_toast.md`

## Components — Layout & Structure

### Accordion

Expandable/collapsible content sections. Single or multiple panels open simultaneously.

**Reference**: `references/shadcn-ui_components_accordion.md`

### Collapsible

Simple show/hide toggle for content.

**Reference**: `references/shadcn-ui_components_collapsible.md`

### Resizable

Resizable panel groups using react-resizable-panels v4. Horizontal/vertical, persistent sizes, keyboard support.

**Reference**: `references/shadcn-ui_components_resizable.md`

### Scroll Area

Custom cross-browser scrollbar styling with horizontal and vertical scrolling.

**Reference**: `references/shadcn-ui_components_scroll-area.md`

### Separator

Visual divider between content sections, horizontal or vertical.

**Reference**: `references/shadcn-ui_components_separator.md`

### Aspect Ratio

Maintain consistent width-to-height ratios for images or video.

**Reference**: `references/shadcn-ui_components_aspect-ratio.md`

### Sidebar

Full application sidebar system with provider, header/footer/content, collapsible modes (offcanvas, icon, none), theming, mobile support, and hooks.

**Reference**: `references/shadcn-ui_components_sidebar.md`

**When to reference**: When building app-level sidebar navigation. This is one of the most complex components — the reference covers the full provider/layout system.

### Direction

RTL/LTR direction provider for wrapping components that need directional awareness.

**Reference**: `references/shadcn-ui_components_direction.md`

## Reference Documentation Index

All documentation is available in the `references/` directory:

**Getting Started**:
- `shadcn-ui_introduction.md` - Philosophy and core concepts
- `shadcn-ui_installation.md` - Framework-specific setup
- `shadcn-ui_cli.md` - CLI commands (init, add, diff, build)
- `shadcn-ui_components-json.md` - Project configuration schema
- `shadcn-ui_components-overview.md` - Component index

**Theming & Configuration**:
- `shadcn-ui_theming.md` - CSS variables and color system
- `shadcn-ui_dark-mode.md` - Dark mode setup
- `shadcn-ui_javascript.md` - Non-TypeScript usage
- `shadcn-ui_monorepo.md` - Monorepo configuration
- `shadcn-ui_rtl.md` - Right-to-left support
- `shadcn-ui_mcp.md` - MCP server for AI integration
- `shadcn-ui_legacy.md` - Tailwind v3 docs pointer

**Forms**:
- `shadcn-ui_forms.md` - Forms overview
- `shadcn-ui_forms_react-hook-form.md` - React Hook Form integration
- `shadcn-ui_forms_tanstack-form.md` - TanStack Form integration

**Inputs & Form Controls**:
- `shadcn-ui_components_button.md` - Button variants and sizes
- `shadcn-ui_components_button-group.md` - Grouped buttons
- `shadcn-ui_components_input.md` - Text input
- `shadcn-ui_components_input-group.md` - Input with addons
- `shadcn-ui_components_input-otp.md` - OTP/verification input
- `shadcn-ui_components_textarea.md` - Multi-line input
- `shadcn-ui_components_select.md` - Custom select dropdown
- `shadcn-ui_components_native-select.md` - Native HTML select
- `shadcn-ui_components_checkbox.md` - Checkbox
- `shadcn-ui_components_radio-group.md` - Radio buttons
- `shadcn-ui_components_switch.md` - Toggle switch
- `shadcn-ui_components_slider.md` - Range slider
- `shadcn-ui_components_toggle.md` - Toggle button
- `shadcn-ui_components_toggle-group.md` - Toggle button group
- `shadcn-ui_components_label.md` - Form label
- `shadcn-ui_components_field.md` - Form field wrapper
- `shadcn-ui_components_calendar.md` - Calendar picker
- `shadcn-ui_components_date-picker.md` - Date picker
- `shadcn-ui_components_combobox.md` - Searchable select

**Navigation**:
- `shadcn-ui_components_breadcrumb.md` - Breadcrumb navigation
- `shadcn-ui_components_tabs.md` - Tab interface
- `shadcn-ui_components_navigation-menu.md` - Site navigation
- `shadcn-ui_components_menubar.md` - Application menu bar
- `shadcn-ui_components_pagination.md` - Page navigation
- `shadcn-ui_components_command.md` - Command palette

**Data Display**:
- `shadcn-ui_components_table.md` - Basic table
- `shadcn-ui_components_data-table.md` - Advanced data table (TanStack Table)
- `shadcn-ui_components_chart.md` - Charts (Recharts)
- `shadcn-ui_components_avatar.md` - User avatar
- `shadcn-ui_components_badge.md` - Status badge
- `shadcn-ui_components_skeleton.md` - Loading skeleton
- `shadcn-ui_components_spinner.md` - Loading spinner
- `shadcn-ui_components_progress.md` - Progress bar
- `shadcn-ui_components_typography.md` - Typography utilities
- `shadcn-ui_components_kbd.md` - Keyboard shortcut display
- `shadcn-ui_components_empty.md` - Empty state
- `shadcn-ui_components_item.md` - List item
- `shadcn-ui_components_carousel.md` - Carousel/slider

**Overlays & Dialogs**:
- `shadcn-ui_components_dialog.md` - Modal dialog
- `shadcn-ui_components_alert-dialog.md` - Confirmation dialog
- `shadcn-ui_components_drawer.md` - Bottom drawer (Vaul)
- `shadcn-ui_components_sheet.md` - Side panel
- `shadcn-ui_components_popover.md` - Click popover
- `shadcn-ui_components_hover-card.md` - Hover preview
- `shadcn-ui_components_tooltip.md` - Tooltip
- `shadcn-ui_components_dropdown-menu.md` - Dropdown menu
- `shadcn-ui_components_context-menu.md` - Right-click menu

**Feedback**:
- `shadcn-ui_components_alert.md` - Alert banner
- `shadcn-ui_components_sonner.md` - Toast notifications (recommended)
- `shadcn-ui_components_toast.md` - Toast (deprecated, use Sonner)

**Layout & Structure**:
- `shadcn-ui_components_accordion.md` - Expandable sections
- `shadcn-ui_components_collapsible.md` - Show/hide toggle
- `shadcn-ui_components_resizable.md` - Resizable panels
- `shadcn-ui_components_scroll-area.md` - Custom scrollbar
- `shadcn-ui_components_separator.md` - Content divider
- `shadcn-ui_components_aspect-ratio.md` - Aspect ratio container
- `shadcn-ui_components_sidebar.md` - Application sidebar
- `shadcn-ui_components_direction.md` - RTL/LTR provider
