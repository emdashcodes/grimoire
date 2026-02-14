---
title: Typography
source_url: https://ui.shadcn.com/docs/components/radix/typography
---

# Typography

Styles for headings, paragraphs, lists, and more.

shadcn/ui does not ship any typography styles by default. This page provides examples of how to use utility classes to style your text.

## Typography Components

### h1

```tsx
export function TypographyH1() {
  return (
    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      Taxing Laughter: The Joke Tax Chronicles
    </h1>
  )
}
```

### h2

```tsx
export function TypographyH2() {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      The People of the Kingdom
    </h2>
  )
}
```

### h3

```tsx
export function TypographyH3() {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      The Joke Tax
    </h3>
  )
}
```

### h4

```tsx
export function TypographyH4() {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      People stopped telling jokes
    </h4>
  )
}
```

### p

```tsx
export function TypographyP() {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6">
      The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.
    </p>
  )
}
```

### blockquote

```tsx
export function TypographyBlockquote() {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">
      "After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."
    </blockquote>
  )
}
```

### table

```tsx
export function TypographyTable() {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left">King's Treasury</th>
            <th className="text-left">People's happiness</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td>Empty</td>
            <td>Overflowing</td>
          </tr>
          <tr className="border-b">
            <td>Modest</td>
            <td>Satisfied</td>
          </tr>
          <tr>
            <td>Full</td>
            <td>Ecstatic</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
```

### list

```tsx
export function TypographyList() {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      <li>1st level of puns: 5 gold coins</li>
      <li>2nd level of jokes: 10 gold coins</li>
      <li>3rd level of one-liners: 20 gold coins</li>
    </ul>
  )
}
```

### Inline code

```tsx
export function TypographyInlineCode() {
  return (
    <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      @radix-ui/react-alert-dialog
    </code>
  )
}
```

### Lead

```tsx
export function TypographyLead() {
  return (
    <p className="text-muted-foreground text-xl">
      A modal dialog that interrupts the user with important content and expects a response.
    </p>
  )
}
```

### Large

```tsx
export function TypographyLarge() {
  return <div className="text-lg font-semibold">Are you absolutely sure?</div>
}
```

### Small

```tsx
export function TypographySmall() {
  return (
    <small className="text-sm leading-none font-medium">Email address</small>
  )
}
```

### Muted

```tsx
export function TypographyMuted() {
  return (
    <p className="text-muted-foreground text-sm">Enter your email address.</p>
  )
}
```

## RTL Support

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).
