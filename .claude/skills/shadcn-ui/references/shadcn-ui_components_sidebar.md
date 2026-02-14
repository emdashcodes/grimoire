---
title: Sidebar
source_url: https://ui.shadcn.com/docs/components/radix/sidebar
---

# Sidebar

A composable, themeable and customizable sidebar component.

## Overview

Sidebars represent some of the most complex components to build, as they are central to applications and contain numerous moving parts. This implementation provides a solid foundation that is composable, themeable, and customizable.

## Installation

```bash
pnpm dlx shadcn@latest add sidebar
```

## Structure

A `Sidebar` component comprises these parts:

- `SidebarProvider` - Manages collapsible state
- `Sidebar` - The sidebar container
- `SidebarHeader` and `SidebarFooter` - Sticky positioning at top and bottom
- `SidebarContent` - Scrollable content area
- `SidebarGroup` - Section within the content
- `SidebarTrigger` - Toggle button for the sidebar

## Usage

**app/layout.tsx**

```tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
```

**components/app-sidebar.tsx**

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
```

## SidebarProvider

Provides sidebar context to child components. Wrap your application in this provider.

### Props

| Name | Type | Description |
|------|------|-------------|
| `defaultOpen` | boolean | Initial open state |
| `open` | boolean | Controlled open state |
| `onOpenChange` | (open: boolean) => void | State change handler |

### Width Configuration

For single sidebars, modify constants in `sidebar.tsx`:

```tsx
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
```

For multiple sidebars, use CSS variables:

```tsx
<SidebarProvider
  style={{
    "--sidebar-width": "20rem",
    "--sidebar-width-mobile": "20rem",
  }}
>
  <Sidebar />
</SidebarProvider>
```

### Keyboard Shortcut

The default keyboard shortcut is `cmd+b` (Mac) or `ctrl+b` (Windows).

```tsx
const SIDEBAR_KEYBOARD_SHORTCUT = "b"
```

## Sidebar

Main component for rendering a collapsible sidebar.

### Props

| Property | Type | Description |
|----------|------|-------------|
| `side` | left \| right | Sidebar position |
| `variant` | sidebar \| floating \| inset | Visual style variant |
| `collapsible` | offcanvas \| icon \| none | Collapse behavior |

**Collapsible Modes:**

- `offcanvas` - Slides in from the edge
- `icon` - Collapses to icon-only display
- `none` - Non-collapsible sidebar

**Note:** When using `inset` variant, wrap content in `SidebarInset`:

```tsx
<SidebarProvider>
  <Sidebar variant="inset" />
  <SidebarInset>
    <main>{children}</main>
  </SidebarInset>
</SidebarProvider>
```

## useSidebar Hook

Control sidebar programmatically using this hook.

```tsx
import { useSidebar } from "@/components/ui/sidebar"

export function AppSidebar() {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()
}
```

| Property | Type | Description |
|----------|------|-------------|
| `state` | expanded \| collapsed | Current state |
| `open` | boolean | Whether sidebar is open |
| `setOpen` | (open: boolean) => void | Set open state |
| `openMobile` | boolean | Mobile open state |
| `setOpenMobile` | (open: boolean) => void | Set mobile state |
| `isMobile` | boolean | Mobile detection |
| `toggleSidebar` | () => void | Toggle on desktop and mobile |

## SidebarHeader

Sticky header area:

```tsx
<Sidebar>
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              Select Workspace
              <ChevronDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
            <DropdownMenuItem>
              <span>Acme Inc</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
</Sidebar>
```

## SidebarFooter

Sticky footer area:

```tsx
<Sidebar>
  <SidebarFooter>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <User2 /> Username
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
</Sidebar>
```

## SidebarContent

Scrollable content wrapper:

```tsx
<Sidebar>
  <SidebarContent>
    <SidebarGroup />
    <SidebarGroup />
  </SidebarContent>
</Sidebar>
```

## SidebarGroup

Section container within content:

```tsx
<SidebarGroup>
  <SidebarGroupLabel>Application</SidebarGroupLabel>
  <SidebarGroupAction>
    <Plus /> <span className="sr-only">Add Project</span>
  </SidebarGroupAction>
  <SidebarGroupContent></SidebarGroupContent>
</SidebarGroup>
```

Make groups collapsible using `Collapsible`:

```tsx
<Collapsible defaultOpen className="group/collapsible">
  <SidebarGroup>
    <SidebarGroupLabel asChild>
      <CollapsibleTrigger>
        Help
        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
      </CollapsibleTrigger>
    </SidebarGroupLabel>
    <CollapsibleContent>
      <SidebarGroupContent />
    </CollapsibleContent>
  </SidebarGroup>
</Collapsible>
```

## SidebarMenu

Menu component for sidebar groups:

```tsx
<SidebarMenu>
  {projects.map((project) => (
    <SidebarMenuItem key={project.name}>
      <SidebarMenuButton asChild>
        <a href={project.url}>
          <project.icon />
          <span>{project.name}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
</SidebarMenu>
```

## SidebarMenuButton

Menu button component. Use `asChild` to render as a different element:

```tsx
<SidebarMenuButton asChild isActive>
  <a href="#">Home</a>
</SidebarMenuButton>
```

## SidebarMenuAction

Action element within menu items:

```tsx
<SidebarMenuItem>
  <SidebarMenuButton asChild>
    <a href="#">
      <Home />
      <span>Home</span>
    </a>
  </SidebarMenuButton>
  <SidebarMenuAction>
    <Plus /> <span className="sr-only">Add Project</span>
  </SidebarMenuAction>
</SidebarMenuItem>
```

## SidebarMenuSub

Submenu component:

```tsx
<SidebarMenuItem>
  <SidebarMenuButton />
  <SidebarMenuSub>
    <SidebarMenuSubItem>
      <SidebarMenuSubButton />
    </SidebarMenuSubItem>
  </SidebarMenuSub>
</SidebarMenuItem>
```

## SidebarMenuBadge

Badge display within menu items:

```tsx
<SidebarMenuItem>
  <SidebarMenuButton />
  <SidebarMenuBadge>24</SidebarMenuBadge>
</SidebarMenuItem>
```

## SidebarMenuSkeleton

Loading placeholder for menus:

```tsx
<SidebarMenu>
  {Array.from({ length: 5 }).map((_, index) => (
    <SidebarMenuItem key={index}>
      <SidebarMenuSkeleton />
    </SidebarMenuItem>
  ))}
</SidebarMenu>
```

## SidebarTrigger

Toggle button component:

```tsx
import { useSidebar } from "@/components/ui/sidebar"

export function CustomTrigger() {
  const { toggleSidebar } = useSidebar()
  return <button onClick={toggleSidebar}>Toggle Sidebar</button>
}
```

## SidebarRail

Rail element for toggling sidebars:

```tsx
<Sidebar>
  <SidebarHeader />
  <SidebarContent>
    <SidebarGroup />
  </SidebarContent>
  <SidebarFooter />
  <SidebarRail />
</Sidebar>
```

## Controlled Sidebar

Use `open` and `onOpenChange` props for controlled state:

```tsx
export function AppSidebar() {
  const [open, setOpen] = React.useState(false)

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar />
    </SidebarProvider>
  )
}
```

## Theming

CSS variables for customization:

```css
@layer base {
  :root {
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  .dark {
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 0 0% 98%;
    --sidebar-primary-foreground: 240 5.9% 10%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}
```

## Styling

Conditional styling based on state:

```tsx
<Sidebar collapsible="icon">
  <SidebarContent>
    <SidebarGroup className="group-data-[collapsible=icon]:hidden" />
  </SidebarContent>
</Sidebar>
```

```tsx
<SidebarMenuItem>
  <SidebarMenuButton />
  <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100" />
</SidebarMenuItem>
```

## RTL Support

For RTL configuration details, see the RTL guide. Key changes include:

1. Add `dir` prop to Sidebar component
2. Add `data-side` attribute to sidebar container
3. Update positioning classes to use CSS data attributes
4. Update SidebarRail positioning for physical layout
5. Add RTL flip to SidebarTrigger icon

After applying updates, use the `dir` prop:

```tsx
<Sidebar dir="rtl" side="right">
  {/* ... */}
</Sidebar>
```

The sidebar will correctly position itself and handle interactions in both LTR and RTL layouts.
