---
title: Date Picker
source_url: https://ui.shadcn.com/docs/components/radix/date-picker
---

# Date Picker

A date picker component with range and presets.

## Installation

The Date Picker is built using a composition of the `<Popover />` and the `<Calendar />` components.

See installation instructions for the Popover and the Calendar components.

## Usage

```tsx
"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  )
}
```

See the React DayPicker documentation for more information.

## Examples

### Basic

A basic date picker component.

### Range Picker

A date picker component for selecting a range of dates.

### Date of Birth

A date picker component for selecting a date of birth. This component includes a dropdown caption layout for date and month selection.

### Input

A date picker component with an input field for selecting a date.

### Time Picker

A date picker component with a time input field for selecting a time.

### Natural Language Picker

This component uses the `chrono-node` library to parse natural language dates.

## RTL

To enable RTL support in shadcn/ui, see the RTL configuration guide.
