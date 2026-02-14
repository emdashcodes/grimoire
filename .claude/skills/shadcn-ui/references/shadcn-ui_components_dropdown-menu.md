---
title: Dropdown Menu
source_url: https://ui.shadcn.com/docs/components/radix/dropdown-menu
---

# Dropdown Menu

Displays a menu to the user — such as a set of actions or functions — triggered by a button.

## Installation

```bash
pnpm dlx shadcn@latest add dropdown-menu
```

## Usage

```jsx
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## Examples

The component supports multiple use cases including:

- **Basic menus** with labels and separators
- **Submenus** using `DropdownMenuSub` for nested actions
- **Keyboard shortcuts** displayed via `DropdownMenuShortcut`
- **Icons** combined with labels for quick visual scanning
- **Checkboxes** with `DropdownMenuCheckboxItem` for toggles
- **Radio groups** with `DropdownMenuRadioGroup` for exclusive selections
- **Destructive actions** using `variant="destructive"`
- **Avatar-triggered menus** for account switching
- **Complex layouts** combining groups, icons, and submenus
- **RTL support** for right-to-left languages

## API Reference

For comprehensive API documentation, refer to the [Radix UI dropdown menu documentation](https://www.radix-ui.com/docs/primitives/components/dropdown-menu).
