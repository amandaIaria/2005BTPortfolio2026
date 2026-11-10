# General Components Package Instructions

Development guide for @general/components - UI component library for portfolio and internal demos.

## Quick Start

```bash
npm run dev              # Start dev server (localhost:3000)
npm run check          # Lint + format + type check
npm run build          # Build package
```

## Package Structure

```
src/
├── components/
│   ├── ui/                  # shadcn/ui + custom primitives
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── switch.tsx
│   │   ├── separator.tsx
│   │   └── ...
│   │
│   ├── slider/              # Carousel component (modular)
│   │   ├── INSTRUCTIONS.md  # See this for slider details
│   │   ├── types.ts
│   │   ├── slide-content.tsx
│   │   ├── slide-pane.tsx
│   │   ├── slider-pagination.tsx
│   │   ├── slider-container.tsx
│   │   └── index.ts
│   │
│   ├── animated-title.tsx    # Title with swiggle underline animation
│   ├── app-header.tsx        # Header with theme toggle
│   ├── cassette-carousel.tsx # Cassette-style carousel
│   ├── animated-footer.tsx   # Animated footer text
│   ├── tentacle-footer.tsx   # SVG tentacle animation
│   ├── webgl-tentacle-*      # WebGL canvas versions
│   ├── sprite-animation.tsx  # Sprite sheet animator
│   ├── playlist.tsx          # YouTube playlist embed
│   └── temp-nav.tsx          # Navigation component
│
├── hooks/
│   ├── use-slider.ts         # Slider state machine (index, direction, isTransitioning)
│   └── use-avoid-overlap.ts  # Overlap detection for positioned elements
│
├── pages/
│   ├── ui-kit-page.tsx       # Component showcase (all components)
│   └── slider-page.tsx       # Full-viewport slider demo
│
├── lib/
│   └── utils.ts              # cn() for Tailwind class merging
│
└── index.ts                  # Public API barrel export
```

## Component Categories

### UI Primitives (shadcn/ui)

- Button, Badge, Card, Dialog, Switch, Separator, Skeleton
- ScrollArea, AspectRatio, Tooltip, NavigationMenu
- Direction provider for RTL support

**Use for:** Base layout, forms, interactive controls

### Custom Components

- **Slider:** Carousel with vertical transitions, pagination, a11y
- **AnimatedTitle:** Title with animated teal underline on hover
- **AppHeader:** Header with theme toggle + navigation
- **CassetteCarousel:** Audio cassette UI with modal content
- **Playlist:** YouTube embed with multiple videos
- **AnimatedFooter:** Text with animation effects
- **TentacleFooter:** SVG-based animated footer
- **WebGLTentacleWall:** WebGL canvas animations
- **SpriteAnimation:** Sprite sheet frame animator

**Use for:** Feature-specific, visually distinct components

## Design Tokens & Theming

All colors via CSS custom properties in `src/styles.css`:

```css
--sea-ink              /* Primary dark text */
--sea-ink-soft         /* Secondary text */
--lagoon              /* Teal accent */
--lagoon-deep         /* Darker teal */
--palm                /* Green accent */
--sand                /* Light background */
--foam                /* Lighter background */
--bg-base             /* Page background */
--surface             /* Card/panel background */
--surface-strong      /* Darker surface */
--header-bg           /* Header background */
--line                /* Divider color */
```

Dark mode: `.dark` class on `<html>` or `data-theme="dark"`.

## Conventions

### File Naming

- Lowercase kebab-case: `animated-title.tsx`, `use-slider.ts`
- Folder components have `index.ts`: `slider/index.ts` exports all subcomponents

### Component Exports

Every component:

```tsx
export function ComponentName() { ... }
export type ComponentNameProps = { ... }
```

Default exports avoided. Barrel export in `index.ts`:

```tsx
export { ComponentName } from './component-name';
export type { ComponentNameProps } from './component-name';
```

### Data Attributes

All components have `data-component` attribute for CSS scoping:

```tsx
<section data-component="slider" ... />
```

Enables stylesheet isolation and debugging.

### Tailwind + CVA

- Use Tailwind utilities for layout/spacing/sizing
- Use CVA for variant-heavy components (Button, Badge)
- Dark mode: `dark:` prefix for all color tokens
- Container queries: `@container/name` for responsive subcomponents

### TypeScript

- Strict mode enabled
- Props interface pattern (not PropTypes)
- Export types for consumed components
- Omit `React.HTMLAttributes<T>` if extending DOM elements unnecessarily

### Accessibility

- Semantic HTML (section, nav, button, not div everywhere)
- ARIA roles only when semantics insufficient
- aria-label/aria-labelledby for interactive controls
- Live regions (aria-live) for dynamic content
- Color not sole differentiator

## Development Patterns

### Creating a New Component

1. Create folder or file in `components/`:

```tsx
// components/my-component.tsx
import { cn } from '@general/lib/utils';

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary';
  // ...
}

export function MyComponent({
  variant = 'primary',
  className,
  ...props
}: MyComponentProps) {
  return (
    <div
      data-component="my-component"
      className={cn('base-styles', className)}
      {...props}
    >
      Content
    </div>
  );
}
```

2. Add to `index.ts`:

```tsx
export { MyComponent } from './my-component';
export type { MyComponentProps } from './my-component';
```

3. Add to `pages/ui-kit-page.tsx` Section for demos

4. Test: `npm run dev` → localhost:3000/ui-kit

### Using Subcomponents (like Slider)

Create folder with focused files:

- `types.ts` - TypeScript interfaces
- `subcomponent-1.tsx` - First responsibility
- `subcomponent-2.tsx` - Second responsibility
- `container.tsx` - Logic/orchestration (or main file)
- `index.ts` - Barrel export all

Each file: single responsibility. Container owns state if needed.

### Adding a Hook

```typescript
// hooks/use-my-hook.ts
export interface UseMyHookOptions {
  // ...
}

export interface UseMyHookResult {
  // ...
}

export function useMyHook(options: UseMyHookOptions): UseMyHookResult {
  // ...
}
```

Export in `index.ts` of package and main `index.ts`.

## Testing

### Visual Testing

- `npm run dev` → localhost:3000/ui-kit (all components)
- localhost:3000/ui-kit/slider (full-viewport slider demo)
- Localhost:3000/modern (modern variant)

### Checklist

- [ ] Component renders without errors
- [ ] Props work as documented
- [ ] Dark mode styles apply correctly
- [ ] Responsive behavior at @lg breakpoint (use DevTools)
- [ ] Keyboard navigation (if applicable)
- [ ] Screen reader announces content (if applicable)
- [ ] No console errors/warnings

### Running Tests

```bash
npm run test              # Vitest suite
npm run test -- --watch  # Watch mode
```

## Build & Publishing

```bash
npm run build            # Builds all packages
npm run check           # Must pass before commit
```

Component is published to npm registry via CI/CD on merge to main.

## Dependencies

### Key Packages

- `react` 19 - UI framework
- `tailwindcss` 4 - Utility-first CSS
- `class-variance-authority` - Component variants
- `@radix-ui/*` - Headless primitives (Dialog, Tooltip, etc.)
- `@phosphor-icons/react` - Icon set
- `@floating-ui/react` - Positioning engine (Tooltip, Popover)

### Development

- `vite` - Build tool
- `vitest` - Test runner
- `prettier` - Code formatter
- `eslint` - Linter
- `typescript` - Type checking

## Common Tasks

### Update a Component

1. Edit component file
2. Update Props interface if signatures changed
3. Run `npm run check`
4. Test at localhost:3000/ui-kit
5. Commit with description

### Add a New Subcomponent to Slider

1. Create `slider/new-component.tsx`
2. Export from `slider/index.ts`
3. Import in `slider-container.tsx` if needed
4. Use in container JSX
5. Run `npm run check`
6. Test transitions/interactions

### Dark Mode Issues

- Check CSS custom property has dark: value in `src/styles.css`
- Verify component uses `dark:` Tailwind prefix
- Test with DevTools: toggle `data-theme="dark"` on `<html>`

### Responsive Issues

- Check `@container` breakpoint (default `@lg`)
- Use DevTools container query inspector
- Mobile image behavior: should appear at `@lg:hidden`
- Pagination dots should recenter on resize (ResizeObserver)

## Debugging

### Component Not Rendering

1. Check `index.ts` exports
2. Check import path in consuming file
3. Check TypeScript types compile (`npm run check`)
4. Browser DevTools: React tab → component tree

### Styles Not Applied

1. Check Tailwind class spelling
2. Check dark mode variant if testing dark theme
3. Check specificity (inline style wins, use `!important` rarely)
4. Check `@container` is named and detected by DevTools

### Animations Not Working

1. Check prefers-reduced-motion: `(prefers-reduced-motion: reduce)` must have fallback
2. Check transition duration/easing in CSS
3. Check transform/opacity properties exist on DOM
4. DevTools: disable animations under Rendering tab

## Resources

- **Slider Details:** See `src/components/slider/INSTRUCTIONS.md`
- **Project Conventions:** See `CLAUDE.md` in root
- **Tailwind Utilities:** https://tailwindcss.com/docs
- **Radix Primitives:** https://radix-ui.com/docs
- **CVA:** https://cva.style/docs
