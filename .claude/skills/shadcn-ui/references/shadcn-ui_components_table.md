---
title: Table
source_url: https://ui.shadcn.com/docs/components/radix/table
---

# Table

A responsive table component.

## Overview

The Table component provides a structured way to display tabular data with semantic HTML elements and consistent styling.

## Installation

```bash
pnpm dlx shadcn@latest add table
```

## Usage

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
```

Basic table structure:

```tsx
<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Examples

### Footer

Add a footer section using the `<TableFooter />` component to display summary information or totals.

### Actions

Incorporate action buttons within table rows using the `<DropdownMenu />` component for contextual operations on each row.

## Data Table

For advanced functionality including sorting, filtering, and pagination, utilize the `<Table />` component alongside [@tanstack/react-table](https://tanstack.com/table/v8).

Refer to the comprehensive [Data Table documentation](/docs/components/data-table) for implementation details.

## RTL Support

To implement right-to-left language support, consult the [RTL configuration guide](/docs/rtl).
