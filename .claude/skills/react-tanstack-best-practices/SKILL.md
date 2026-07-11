---
name: react-tanstack-best-practices
description: 'Best practices for React with TanStack Router. Use when: creating routes, configuring the router, adding navigation, preloading, layout patterns, or type-safe linking.'
---

# React + TanStack Router Best Practices

## File-Based Routing

- All routes live in `src/routes/` — the TanStack Router plugin auto-generates `routeTree.gen.ts`
- **Never** manually edit `routeTree.gen.ts`
- The root layout is `src/routes/__root.tsx` — created with `createRootRoute()`
- Page routes use `createFileRoute()`:

```tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/my-page')({
  component: MyPage,
});

function MyPage() {
  return <main>Content</main>;
}
```

- Nest routes with folders: `src/routes/settings/profile.tsx` → `/settings/profile`
- Index routes: `src/routes/settings/index.tsx` → `/settings`
- Layout routes: `src/routes/settings/route.tsx` wraps all children under `/settings`

## Router Configuration

Located in `src/router.tsx`. Current settings:

| Setting | Value | Purpose |
|---------|-------|---------|
| `scrollRestoration` | `true` | Restore scroll position on back/forward |
| `defaultPreload` | `'intent'` | Preload routes on hover/focus |
| `defaultPreloadStaleTime` | `0` | Always fresh preloads |

## Type-Safe Navigation

Always use the `<Link>` component or `useNavigate()` — never raw `<a>` tags for internal routes:

```tsx
import { Link } from '@tanstack/react-router';

// Type-safe — autocompletes valid routes
<Link to="/about">About</Link>

// With params
<Link to="/posts/$postId" params={{ postId: '123' }}>Post</Link>

// Active state styling
<Link to="/about" activeProps={{ className: 'is-active' }}>About</Link>
```

For programmatic navigation:

```tsx
const navigate = useNavigate();
navigate({ to: '/about' });
```

## Route Data Loading

Use the `loader` option to fetch data before rendering:

```tsx
export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId);
    return { post };
  },
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  return <article>{post.title}</article>;
}
```

## Layout Patterns

The root layout (`__root.tsx`) renders `<Outlet />` for child routes. Add shared UI around it:

```tsx
import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
```

## Search Params (Query Strings)

Define and validate search params per route:

```tsx
import { z } from 'zod';

export const Route = createFileRoute('/search')({
  validateSearch: z.object({
    q: z.string().default(''),
    page: z.number().default(1),
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q, page } = Route.useSearch();
  return <div>Searching: {q}, page {page}</div>;
}
```

## Route Type Registration

The router type is registered globally in `src/router.tsx`:

```tsx
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
```

This enables type-safe `<Link to="...">` autocomplete across the entire app.

## Component Conventions

- Use `function` declarations for components (not arrow expressions)
- Export the `Route` config, define the component function separately
- Keep route files focused — extract complex UI into `src/components/`
