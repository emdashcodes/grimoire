---
title: Input OTP
source_url: https://ui.shadcn.com/docs/components/radix/input-otp
---

# Input OTP

Accessible one-time password component with copy paste functionality.

## About

Input OTP is built on top of [input-otp](https://github.com/guilhermerodz/input-otp) by [@guilherme_rodz](https://twitter.com/guilherme_rodz).

## Installation

```bash
pnpm dlx shadcn@latest add input-otp
```

## Usage

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
```

```tsx
<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```

## Pattern

Define custom patterns for OTP input validation using the `pattern` prop.

```tsx
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
  {/* ... */}
</InputOTP>
```

## Examples

### Separator

Use `<InputOTPSeparator />` to add visual separation between input groups.

### Disabled

Apply the `disabled` prop to disable user input.

### Controlled

Manage input state using `value` and `onChange` props.

### Invalid

Apply `aria-invalid` to slots for displaying error states.

### Four Digits

Common PIN code pattern using `pattern={REGEXP_ONLY_DIGITS}`.

### Alphanumeric

Accept both letters and numbers with `REGEXP_ONLY_DIGITS_AND_CHARS`.

### Form

Complete form example with verification code input and submission.

## RTL Support

Enable right-to-left language support through the RTL configuration guide.

## API Reference

See the [input-otp documentation](https://input-otp.rodz.dev) for comprehensive API details.
