---
title: Pagination
source_url: https://ui.shadcn.com/docs/components/radix/pagination
---

# Pagination

Pagination with page navigation, next and previous links.

## Installation

```bash
pnpm dlx shadcn@latest add pagination
```

## Usage

```typescript
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
```

```jsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

## Examples

### Simple

A simple pagination with only page numbers.

### Icons Only

Use just the previous and next buttons without page numbers. This is useful for data tables with a rows per page selector.

## Next.js Integration

By default the `<PaginationLink />` component renders an `<a />` tag.

To use the Next.js `<Link />` component, update `pagination.tsx`:

```typescript
+ import Link from "next/link"
  - type PaginationLinkProps = ... & React.ComponentProps<"a">
  + type PaginationLinkProps = ... & React.ComponentProps<typeof Link>
  const PaginationLink = ({...props }: ) => (
    <PaginationItem>
  -   <a>
  +   <Link>
        // ...
  -   </a>
  +   </Link>
    </PaginationItem>
  )
```

**Note:** The CLI will eventually automate this configuration.

## RTL Support

To enable RTL support in shadcn/ui, see the RTL configuration guide.

## Changelog

### RTL Support

When upgrading from a previous version, apply updates to add the `text` prop:

**Update `PaginationPrevious`:**

```typescript
function PaginationPrevious({
    className,
+   text = "Previous",
    ...props
- }: React.ComponentProps<typeof PaginationLink>) {
+ }: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
    return (
      <PaginationLink
        aria-label="Go to previous page"
        size="default"
        className={cn("cn-pagination-previous", className)}
        {...props}
      >
        <ChevronLeftIcon />
        <span className="cn-pagination-previous-text hidden sm:block">
-         Previous
+         {text}
        </span>
      </PaginationLink>
    )
  }
```

**Update `PaginationNext`:**

```typescript
function PaginationNext({
    className,
+   text = "Next",
    ...props
- }: React.ComponentProps<typeof PaginationLink>) {
+ }: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
    return (
      <PaginationLink
        aria-label="Go to next page"
        size="default"
        className={cn("cn-pagination-next", className)}
        {...props}
      >
-       <span className="cn-pagination-next-text hidden sm:block">Next</span>
+       <span className="cn-pagination-next-text hidden sm:block">{text}</span>
        <ChevronRightIcon />
      </PaginationLink>
    )
  }
```
