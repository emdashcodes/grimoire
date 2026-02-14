---
title: Alert
source_url: https://ui.shadcn.com/docs/components/radix/alert
---

# Alert

Displays a callout for user attention.

## Installation

```bash
pnpm dlx shadcn@latest add alert
```

## Usage

```typescript
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
```

```jsx
<Alert>
  <InfoIcon />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the cli.
  </AlertDescription>
  <AlertAction>
    <Button variant="outline">Enable</Button>
  </AlertAction>
</Alert>
```

## Examples

### Basic

A foundational alert displaying an icon, title, and description.

**Success Example:**
- Title: "Account updated successfully"
- Content: "Your profile information has been saved. Changes will be reflected immediately."

### Destructive

Use `variant="destructive"` for error or warning alerts.

**Example:**
- Title: "Payment failed"
- Content: "Your payment could not be processed. Please check your payment method and try again."

### Action

Use `AlertAction` to include a button or interactive element.

**Example:**
- Title: "Dark mode is now available"
- Content: "Enable it under your profile settings to get started."
- Action: Enable button

### Custom Colors

Customize alert appearance by adding custom classes like `bg-amber-50 dark:bg-amber-950` to the Alert component.

**Example:**
- Title: "Your subscription will expire in 3 days."
- Content: "Renew now to avoid service interruption or upgrade to a paid plan."

## API Reference

### Alert

Displays a callout for user attention.

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"default" \| "destructive"` | `"default"` |

### AlertTitle

Displays the title of the alert.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### AlertDescription

Displays the description or content of the alert.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

### AlertAction

Displays an action element positioned in the top-right corner.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | — |

## RTL Support

For right-to-left language support, refer to the RTL configuration guide at `/docs/rtl`.
