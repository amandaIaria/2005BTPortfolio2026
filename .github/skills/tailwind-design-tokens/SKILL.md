---
name: tailwind-design-tokens
description: 'Use when styling components, choosing colours, applying dark mode, or using custom CSS variables. Covers project design tokens, Tailwind v4 patterns, and theme consistency.'
---

# Tailwind Design Tokens

## Token System

All custom tokens are CSS variables in `src/styles.css`. Always use tokens instead of raw hex values.

### Colour Tokens

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--sea-ink` | `#173a40` | `#d7ece8` | Primary text |
| `--sea-ink-soft` | `#416166` | `#afcdc8` | Secondary/muted text |
| `--lagoon` | `#4fb8b2` | `#60d7cf` | Accent colour |
| `--lagoon-deep` | `#328f97` | `#8de5db` | Links, interactive accent |
| `--palm` | `#2f6a4a` | `#6ec89a` | Success / nature accent |
| `--sand` | `#e7f0e8` | `#0f1a1e` | Light background fill |
| `--foam` | `#f3faf5` | `#101d22` | Lighter background |
| `--bg-base` | `#e7f3ec` | `#0a1418` | Page background |

### Surface & UI Tokens

| Token | Usage |
|-------|-------|
| `--surface` | Card/panel background (semi-transparent) |
| `--surface-strong` | Elevated surface (higher opacity) |
| `--header-bg` | Sticky header background (blur-backed) |
| `--line` | Borders and dividers |
| `--chip-bg` | Tag/chip background |
| `--chip-line` | Tag/chip border |
| `--link-bg-hover` | Link hover background |
| `--kicker` | Small label text |

### shadcn Tokens (OKLCH)

shadcn/ui uses its own OKLCH-based tokens (`--primary`, `--secondary`, `--muted`, etc.) also defined in `src/styles.css`. Use these for shadcn components. Use the project tokens above for custom components.

## How to Use Tokens

In Tailwind classes, reference tokens with `var()` in arbitrary values:

```tsx
// Text colour
<p className="text-[var(--sea-ink)]">Primary text</p>
<p className="text-[var(--sea-ink-soft)]">Secondary text</p>

// Background
<div className="bg-[var(--surface)]">Card</div>

// Border
<div className="border border-[var(--line)]">Bordered</div>
```

## Dark Mode

The project uses a dual dark-mode strategy:

1. **Class-based**: `.dark` on `<html>` — for Tailwind's `dark:` variant
2. **Attribute-based**: `data-theme="dark"` on `<html>` — for CSS variable swaps
3. **System fallback**: `prefers-color-scheme` media query when no explicit theme is set

The custom variant is configured as:
```css
@custom-variant dark (&:is(.dark *));
```

**All project tokens automatically swap** between light and dark values — you don't need `dark:` prefixes when using `var(--token)`. Use `dark:` only for Tailwind utility overrides:

```tsx
// NO dark: needed — token auto-swaps
<p className="text-[var(--sea-ink)]">Always correct</p>

// dark: IS needed for non-token utilities
<div className="bg-white dark:bg-gray-900">Needs dark prefix</div>
```

## Custom Utility Classes

Use these project-defined classes from `src/styles.css`:

| Class | Purpose |
|-------|---------|
| `.page-wrap` | Main content container (max-width, centered) |
| `.island-shell` | Primary card with gradient, shadow, backdrop blur |
| `.feature-card` | Lighter card with hover lift effect |
| `.display-title` | Fraunces serif display heading |
| `.island-kicker` | Small uppercase label (0.16em tracking) |
| `.nav-link` | Navigation link base style |
| `.nav-link.is-active` | Active navigation state |
| `.rise-in` | Entrance animation |

## Typography

| Font | Variable | Usage |
|------|----------|-------|
| Manrope | `--font-sans` (default) | Body text, UI |
| Fraunces | `.display-title` | Headlines, display |
| JetBrains Mono | `font-mono` | Code blocks |

## Rules

1. **Never hardcode hex colours** — always use `var(--token)` or Tailwind's built-in scale
2. **Don't duplicate token definitions** — all tokens live in `src/styles.css`
3. **Prefer project tokens** for custom components, shadcn tokens for shadcn components
4. **Don't add `dark:` for token-based styles** — they auto-swap
