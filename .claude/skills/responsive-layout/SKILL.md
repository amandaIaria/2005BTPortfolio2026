---
name: responsive-layout
description: 'Use when building responsive layouts, handling breakpoints, mobile-first design, container patterns, or adapting components across screen sizes. Covers Tailwind v4 responsive patterns and project layout conventions.'
---

# Responsive Layout

## Mobile-First Approach

Write base styles for mobile, then layer on larger breakpoints:

```tsx
// Mobile: single column, smaller padding
// sm+: two columns, more padding
<section className="grid gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
```

## Tailwind Breakpoints

| Prefix | Min Width | Typical Use |
|--------|-----------|-------------|
| *(none)* | 0px | Mobile base |
| `sm:` | 640px | Large phones / small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large screens |

The project primarily uses `sm:` and `lg:` breakpoints.

## Page Container

Use `.page-wrap` for all page-level content — it handles max-width and centering:

```tsx
<main className="page-wrap px-4 pb-8 pt-14">
  {/* page content */}
</main>
```

Don't set your own `max-width` or `mx-auto` when inside `.page-wrap`.

## Common Layout Patterns

### Hero Section
```tsx
<section className="island-shell rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
  <h1 className="text-4xl sm:text-6xl">Headline</h1>
  <p className="text-base sm:text-lg">Subtext</p>
</section>
```

### Feature Cards Grid
```tsx
<section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  {items.map((item) => (
    <article className="island-shell feature-card rounded-2xl p-5">
      ...
    </article>
  ))}
</section>
```

### Navigation (Header Pattern)
Mobile: full-width nav wraps below logo. Desktop: inline.
```tsx
<nav className="flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
  {/* Logo */}
  <h2 className="flex-shrink-0">...</h2>

  {/* Actions — move right on mobile, inline on desktop */}
  <div className="ml-auto sm:ml-0">...</div>

  {/* Nav links — full width on mobile, inline on desktop */}
  <div className="order-3 w-full sm:order-2 sm:w-auto">
    ...
  </div>
</nav>
```

### Hide/Show by Breakpoint
```tsx
// Hidden on mobile, visible on sm+
<a className="hidden sm:block">Desktop only link</a>

// Visible on mobile only
<button className="sm:hidden">Mobile menu</button>
```

## Spacing Scale

Follow the project's existing spacing patterns:

| Context | Mobile | Desktop |
|---------|--------|---------|
| Page horizontal padding | `px-4` | `px-6` or `px-10` |
| Section vertical padding | `py-10` | `py-14` |
| Card padding | `p-5` | `p-5` to `p-6` |
| Section gap | `mt-8` | `mt-8` |
| Grid gap | `gap-4` | `gap-4` |

## Flex vs Grid

- **Flex** for single-axis layouts: nav bars, button groups, inline elements
- **Grid** for two-dimensional layouts: card grids, page layouts

```tsx
// Flex — button row
<div className="flex flex-wrap gap-3">
  <Button>Primary</Button>
  <Button variant="outline">Secondary</Button>
</div>

// Grid — card layout
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {cards}
</div>
```

## Rules

1. **Always start mobile-first** — base styles are mobile, breakpoints add complexity
2. **Use `.page-wrap`** for page containers — don't create new container utilities
3. **Don't hardcode widths** on content — use `max-w-*` or grid/flex to constrain
4. **Test at 320px, 640px, 1024px** — project's primary breakpoint range
5. **Keep vertical rhythm consistent** — use the spacing scale above
6. **Prefer `gap` over margin** for spacing between siblings in flex/grid
