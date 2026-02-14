---
title: Dark Mode
source_url: https://ui.shadcn.com/docs/dark-mode
---

# Dark Mode

Adding dark mode to your site.

## Framework Guides

The page provides dark mode implementation guides for multiple frameworks:

- **Next.js** - Specific setup instructions for Next.js projects
- **Vite** - Configuration for Vite-based applications
- **Astro** - Dark mode integration for Astro sites
- **Remix** - Implementation guidance for Remix framework

## Key Implementation Details

The page demonstrates theme detection and application through JavaScript:

```javascript
if (localStorage.theme === 'dark' ||
    ((!('theme' in localStorage) || localStorage.theme === 'system') &&
     window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.querySelector('meta[name="theme-color"]')
    .setAttribute('content', '#09090b')
}
```

This code checks localStorage for theme preference or falls back to system-level color scheme detection, then updates the theme-color meta tag accordingly.
