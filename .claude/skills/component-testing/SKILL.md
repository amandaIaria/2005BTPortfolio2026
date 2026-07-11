---
name: component-testing
description: 'Use when writing tests, setting up test files, testing React components, route components, theme toggle, or shadcn wrappers. Covers Vitest and Testing Library patterns.'
---

# Component Testing

## Setup

- **Test runner**: Vitest (`npm run test`)
- **DOM environment**: jsdom
- **Utilities**: `@testing-library/react` + `@testing-library/dom`

## File Conventions

- Test files go next to the component: `src/components/Header.test.tsx`
- Route tests go next to the route: `src/routes/index.test.tsx`
- Use `.test.tsx` suffix (not `.spec.tsx`)

## Basic Component Test

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Header from '@/components/header';

// TanStack Router components need a router wrapper
import { createRouter, createMemoryHistory, RouterProvider } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen';

function renderWithRouter(component: React.ReactNode, { initialPath = '/' } = {}) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [initialPath] }),
  });

  return render(<RouterProvider router={router} />);
}

describe('Header', () => {
  it('renders navigation links', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
```

## Testing shadcn Wrapper Components

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { PillButton } from '@/components/PillButton';

describe('PillButton', () => {
  it('renders children', () => {
    render(<PillButton>Click me</PillButton>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('forwards click handler', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<PillButton onClick={onClick}>Click</PillButton>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('passes through variant props', () => {
    render(<PillButton variant="outline">Outline</PillButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

## Testing ThemeToggle

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, beforeEach } from 'vitest';

import ThemeToggle from '@/components/theme-toggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
  });

  it('cycles through light → dark → auto', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    await user.click(button); // auto → light
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    await user.click(button); // light → dark
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    await user.click(button); // dark → auto
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
  });
});
```

## Rules

1. **Query by role first** — `getByRole`, `getByLabelText` over `getByTestId`
2. **Use `userEvent` over `fireEvent`** — simulates real user interactions
3. **Don't test shadcn internals** — test your wrapper's behaviour, not the base component
4. **Clean up DOM state** in `beforeEach` for theme/localStorage tests
5. **Wrap route components** with `RouterProvider` — they need router context
6. **Run `npm run test`** to execute all tests
