---
name: shade-extension
description: 'Use when creating custom component variations, extending shadcn/ui components, or wrapping base UI primitives with project-specific styles. Covers buttons, cards, and other shadcn components.'
argument-hint: '<original component name> — the shadcn base component to extend (e.g., button, card, dialog)'
---

# Extending shadcn/ui Components

Never modify files in `src/components/ui/` — those are managed by shadcn and will be overwritten on updates. Create wrapper components in `src/components/` instead.

## Pattern: Compose, Don't Modify

Wrap the base shadcn component and layer your custom styles or props on top:

```tsx
import { Button } from '@/components/ui/button';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

function PillButton({ className, ...props }: ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn(
        'rounded-full px-5 py-2.5 text-sm font-semibold',
        className,
      )}
      {...props}
    />
  );
}

export { PillButton };
```

## Rules

1. **File location**: `src/components/<ComponentName>.tsx` — never inside `ui/`
2. **Extend via props**: Use `ComponentProps<typeof BaseComponent>` to inherit the full prop type
3. **Preserve className merging**: Always spread `className` through `cn()` so consumers can still override
4. **Preserve all base props**: Spread `...props` onto the base component
5. **Use `function` declarations** for components, not arrow expressions
6. **Use project design tokens** (`var(--sea-ink)`, `var(--lagoon)`, etc.) for custom colours — don't hardcode hex values
7. **Naming**: Use descriptive names that indicate the variant purpose (e.g., `PillButton`, `GhostIconButton`, `FeatureCard`)

## Examples

### Button with project-specific styling

```tsx
import { Button } from '@/components/ui/button';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

function LagoonButton({ className, ...props }: ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn(
        'rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] text-[var(--lagoon-deep)] hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]',
        className,
      )}
      {...props}
    />
  );
}

export { LagoonButton };
```

### Card with extra behaviour

```tsx
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

function FeatureCard({
  title,
  description,
  className,
  children,
  ...props
}: ComponentProps<typeof Card> & {
  title: string;
  description?: string;
}) {
  return (
    <Card className={cn('feature-card', className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {children}
    </Card>
  );
}

export { FeatureCard };
```

### Adding a new variant without touching the base

If you need a one-off variant, just pass `className` directly — no wrapper needed:

```tsx
<Button className="rounded-full bg-[var(--palm)] text-white">
  Save
</Button>
```

Create a wrapper component only when the variant is reused across multiple files.
