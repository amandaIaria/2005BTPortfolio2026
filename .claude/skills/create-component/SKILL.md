---
name: create-component
description: Create custom React components following project conventions. Use when: building new UI components, feature components, or component variations.
---

# Creating Custom React Components

## File Structure

Create components in `packages/general-components/src/components/` (shared) or `src/components/` (app-specific).

File naming: lowercase kebab-case, e.g., `theme-toggle.tsx`, `image-header.tsx`

## Component Template

```tsx
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@general/lib/utils';

const componentVariants = cva('base-styles', {
  variants: {
    variant: {
      default: 'default-styles',
      secondary: 'secondary-styles',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export interface ComponentProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Custom props here
}

const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      data-component="component-name"
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  ),
);
Component.displayName = 'Component';

export { Component, componentVariants };
```

## Conventions

- Use `function` declarations for components (not arrow functions)
- Root element must have `data-component="kebab-case-name"` attribute
- Use CVA for variant-based styling
- Always use `cn()` from `@general/lib/utils` to merge classes
- Export component + variants separately
- Use `forwardRef` if the component wraps a DOM element
- Strict TypeScript: annotate all props, no `any`
- Props interface extends HTML element attrs + CVA variant props

## Imports

```tsx
// UI utilities
import { cn } from '@general/lib/utils';

// Icons
import { IconName } from '@phosphor-icons/react';

// Styling
import { cva, type VariantProps } from 'class-variance-authority';

// Shared components
import { OtherComponent } from '@general/components';

// App components
import { LocalComponent } from '@/components';
```

## Tailwind Classes

- Use design tokens: `text-[var(--sea-ink)]`, `bg-[var(--sand)]`
- Dark mode: both `data-theme="dark"` attribute and `.dark` class applied automatically
- Spacing: use standard Tailwind scale (no custom spacing unless documented in `tailwind-design-tokens` skill)
- Custom layout classes: `.page-wrap`, `.island-shell`, `.feature-card`, `.display-title`

## Exporting from Package

Add to `packages/general-components/src/index.ts`:

```tsx
export {
  Component,
  componentVariants,
  type ComponentProps,
} from './components/component-name';
```

Then import in app:

```tsx
import { Component } from '@general/components';
```

## Example: Button Component

```tsx
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@general/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[var(--lagoon)] text-white hover:bg-[var(--lagoon-deep)]',
        outline:
          'border border-[var(--sea-ink)] text-[var(--sea-ink)] hover:bg-[var(--foam)]',
        ghost: 'hover:bg-[var(--foam)] text-[var(--sea-ink)]',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      data-component="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  ),
);
Button.displayName = 'Button';

export { Button, buttonVariants };
```

## Accessibility

- Use semantic HTML: `<button>`, `<nav>`, `<main>`, etc.
- Add ARIA attributes where needed: `aria-label`, `aria-expanded`, `role`
- Ensure keyboard navigation works
- Use Radix primitives for complex interactions (Dialog, Popover, etc.)
- See `accessibility` skill for detailed patterns

## Testing

Add test file next to component: `component-name.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import { Component } from './component-name';

describe('Component', () => {
  it('renders', () => {
    render(<Component />);
    expect(screen.getByTestId('component-name')).toBeInTheDocument();
  });
});
```

## UI Kit Demo

After creating, add live example to `packages/general-components/src/pages/ui-kit-page.tsx`:

```tsx
<Section title="ComponentName">
  <Component variant="default" />
  <Component variant="secondary" />
</Section>
```
