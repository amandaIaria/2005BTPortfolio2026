---
name: accessibility
description: 'Use when building UI components, adding interactive elements, handling focus, keyboard navigation, ARIA attributes, colour contrast, or screen reader support. Covers Radix a11y, semantic HTML, and portfolio accessibility.'
---

# Accessibility

## Semantic HTML

Always use the correct HTML element for the job:

| Element | When to use |
|---------|-------------|
| `<main>` | Primary page content (one per page) |
| `<nav>` | Navigation blocks |
| `<header>` | Page or section header |
| `<footer>` | Page or section footer |
| `<section>` | Thematic grouping with a heading |
| `<article>` | Self-contained content (cards, posts) |
| `<button>` | Interactive actions — **never** `<div onClick>` |
| `<a>` | Navigation to a URL — **never** `<button>` for links |

## Radix/shadcn Components

Radix primitives handle most a11y automatically. Preserve these built-in behaviours:

- **Dialog**: Focus trapping, Escape to close, `aria-labelledby` via `DialogTitle`
- **NavigationMenu**: Arrow key navigation, `aria-expanded` states
- **ScrollArea**: Accessible scrollbar with keyboard support
- **Button**: Proper `disabled` state, focus ring via `focus-visible`

**Don't override** Radix's keyboard handling or ARIA attributes unless you have a specific reason.

## Keyboard Navigation

- All interactive elements must be reachable via Tab
- Use `focus-visible:` (not `focus:`) for focus indicators — the project's shadcn buttons already do this
- Custom interactive elements need explicit `tabIndex={0}` and `onKeyDown` handlers
- The ThemeToggle cycles modes on click — ensure it also works on Enter/Space (the `<button>` element handles this natively)

## Images and Icons

```tsx
// Decorative icons — hide from screen readers
<svg aria-hidden="true" ...>

// Meaningful images — always add alt text
<img alt="Screenshot of the portfolio home page" src="..." />

// Icon-only buttons — add screen reader label
<button aria-label="Toggle theme">
  <SunIcon aria-hidden="true" />
</button>

// Or use sr-only text (already used in Header.tsx)
<a href="...">
  <span className="sr-only">Follow on X</span>
  <svg aria-hidden="true" ...>
</a>
```

## Colour Contrast

The project tokens have been designed with contrast in mind:

- `--sea-ink` on `--bg-base` / `--foam` — high contrast
- `--sea-ink-soft` — use only for secondary/supplementary text, not small text
- `--lagoon-deep` — sufficient contrast for link text on light backgrounds

When adding new colours:
- Body text: minimum 4.5:1 contrast ratio (WCAG AA)
- Large text (18px+ bold or 24px+): minimum 3:1
- Interactive elements: minimum 3:1 against adjacent colours

## Forms and Inputs

```tsx
// Always associate labels with inputs
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// Or use aria-label for visual-label-free inputs
<input aria-label="Search" type="search" placeholder="Search..." />

// Error states
<input aria-invalid="true" aria-describedby="email-error" />
<p id="email-error" role="alert">Please enter a valid email</p>
```

## Motion and Animation

The project uses `.rise-in` and `tw-animate-css`. Respect motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  .rise-in {
    animation: none;
  }
}
```

When adding new animations, wrap them in a reduced-motion check or use Tailwind's `motion-safe:` / `motion-reduce:` variants:

```tsx
<div className="motion-safe:animate-fade-in">Content</div>
```

## Checklist for New Components

1. Can all functionality be used with keyboard only?
2. Does the component use semantic HTML elements?
3. Are decorative elements hidden (`aria-hidden="true"`)?
4. Do interactive elements have visible focus indicators?
5. Is text contrast at least 4.5:1?
6. Are animations respecting `prefers-reduced-motion`?
