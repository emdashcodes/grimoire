---
title: Calendar
source_url: https://ui.shadcn.com/docs/components/radix/calendar
---

# Calendar

A calendar component that allows users to select a date or a range of dates.

## Blocks

A collection of 30+ calendar blocks is available in the [Blocks Library](/blocks/calendar) page for building custom calendar components.

## Installation

```bash
pnpm dlx shadcn@latest add calendar
```

## Usage

```tsx
import { Calendar } from "@/components/ui/calendar"
```

```tsx
const [date, setDate] = React.useState<Date | undefined>(new Date())
return (
  <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-lg border"
  />
)
```

See the [React DayPicker](https://react-day-picker.js.org) documentation for more information.

## About

The Calendar component is built on top of React DayPicker.

## Date Picker

You can use the `<Calendar>` component to build a date picker. See the [Date Picker](/docs/components/radix/date-picker) page for more information.

## Persian / Hijri / Jalali Calendar

To use the Persian calendar, edit `components/ui/calendar.tsx` and replace `react-day-picker` with `react-day-picker/persian`.

```tsx
- import { DayPicker } from "react-day-picker"
+ import { DayPicker } from "react-day-picker/persian"
```

## Selected Date (With TimeZone)

The Calendar component accepts a `timeZone` prop to ensure dates are displayed and selected in the user's local timezone.

```tsx
export function CalendarWithTimezone() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [timeZone, setTimeZone] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [])

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      timeZone={timeZone}
    />
  )
}
```

**Note:** If you notice a selected date offset (for example, selecting the 20th highlights the 19th), make sure the `timeZone` prop is set to the user's local timezone.

**Why client-side?** The timezone is detected using `Intl.DateTimeFormat().resolvedOptions().timeZone` inside a `useEffect` to ensure compatibility with server-side rendering.

## Examples

### Basic

A basic calendar component. Use `className="rounded-lg border"` to style the calendar.

### Range Calendar

Use the `mode="range"` prop to enable range selection.

### Month and Year Selector

Use `captionLayout="dropdown"` to show month and year dropdowns.

### Presets

Calendar with preset date buttons: Today, Tomorrow, In 3 days, In a week, In 2 weeks.

### Date and Time Picker

Calendar with Start Time and End Time inputs.

### Booked dates

Calendar showing booked dates.

### Custom Cell Size

You can customize the size of calendar cells using the `--cell-size` CSS variable. You can also make it responsive by using breakpoint-specific values:

```tsx
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-lg border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
/>
```

Or use fixed values:

```tsx
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-lg border [--cell-size:2.75rem] md:[--cell-size:3rem]"
/>
```

### Week Numbers

Use `showWeekNumber` to show week numbers.

## RTL

To enable RTL support in shadcn/ui, see the RTL configuration guide.

See also the Hijri Guide for enabling the Persian / Hijri / Jalali calendar.

### Arabic (RTL)

When using RTL, import the locale from `react-day-picker/locale` and pass both the `locale` and `dir` props to the Calendar component:

```tsx
import { arSA } from "react-day-picker/locale"

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  locale={arSA}
  dir="rtl"
/>
```

## API Reference

See the [React DayPicker](https://react-day-picker.js.org) documentation for more information on the `Calendar` component.

## Changelog

### RTL Support

If you're upgrading from a previous version of the `Calendar` component, you'll need to apply the following updates to add locale support:

### Import the `Locale` type

Add `Locale` to your imports from `react-day-picker`:

```tsx
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
+ type Locale,
} from "react-day-picker"
```

### Add `locale` prop to the Calendar component

Add the `locale` prop to the component's props:

```tsx
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
+ locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
```

### Pass `locale` to DayPicker

Pass the `locale` prop to the `DayPicker` component:

```tsx
<DayPicker
  showOutsideDays={showOutsideDays}
  className={cn(...)}
  captionLayout={captionLayout}
+ locale={locale}
  formatters={{
    formatMonthDropdown: (date) =>
-     date.toLocaleString("default", { month: "short" }),
+     date.toLocaleString(locale?.code, { month: "short" }),
    ...formatters,
  }}
```

### Update CalendarDayButton to accept locale

Update the `CalendarDayButton` component signature and pass `locale`:

```tsx
function CalendarDayButton({
  className,
  day,
  modifiers,
+ locale,
  ...props
- }: React.ComponentProps<typeof DayButton>) {
+ }: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
```

### Update date formatting in CalendarDayButton

Use `locale?.code` in the date formatting:

```tsx
<Button
  variant="ghost"
  size="icon"
- data-day={day.date.toLocaleDateString()}
+ data-day={day.date.toLocaleDateString(locale?.code)}
  ...
/>
```

### Pass locale to DayButton component

Update the `DayButton` component usage to pass the `locale` prop:

```tsx
components={{
  ...
- DayButton: CalendarDayButton,
+ DayButton: ({ ...props }) => (
+   <CalendarDayButton locale={locale} {...props} />
+ ),
  ...
}}
```

### Update RTL-aware CSS classes

Replace directional classes with logical properties for better RTL support:

```tsx
// In the day classNames:
- [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)
+ [&:last-child[data-selected=true]_button]:rounded-e-(--cell-radius)
- [&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)
+ [&:nth-child(2)[data-selected=true]_button]:rounded-s-(--cell-radius)
- [&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)
+ [&:first-child[data-selected=true]_button]:rounded-s-(--cell-radius)

// In range_start classNames:
- rounded-l-(--cell-radius) ... after:right-0
+ rounded-s-(--cell-radius) ... after:end-0

// In range_end classNames:
- rounded-r-(--cell-radius) ... after:left-0
+ rounded-e-(--cell-radius) ... after:start-0

// In CalendarDayButton className:
- data-[range-end=true]:rounded-r-(--cell-radius)
+ data-[range-end=true]:rounded-e-(--cell-radius)
- data-[range-start=true]:rounded-l-(--cell-radius)
+ data-[range-start=true]:rounded-s-(--cell-radius)
```

After applying these changes, you can use the `locale` prop to provide locale-specific formatting:

```tsx
import { enUS } from "react-day-picker/locale"

<Calendar mode="single" selected={date} onSelect={setDate} locale={enUS} />
```
