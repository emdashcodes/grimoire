import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        grimoire: {
          bg: 'var(--grimoire-bg)',
          surface: 'var(--grimoire-surface)',
          'surface-hover': 'var(--grimoire-surface-hover)',
          border: 'var(--grimoire-border)',
          text: 'var(--grimoire-text)',
          'text-muted': 'var(--grimoire-text-muted)',
          accent: 'var(--grimoire-accent)',
          'accent-hover': 'var(--grimoire-accent-hover)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
