# Portfolio 2026 — Project Guidelines

## Stack

- **React 19** with TypeScript (strict mode)
- **Vite 7** dev server and bundler
- **Tailwind CSS 4** via `@tailwindcss/vite` (native integration, no config file)
- **TanStack Router** with file-based routing and auto code-splitting
- **shadcn/ui** (Radix + Lyra style) for UI primitives
- **Phosphor Icons** (`@phosphor-icons/react`) as the icon library
- **CVA** (`class-variance-authority`) for component variants

## Code Style

- No semicolons, single quotes, trailing commas everywhere (Prettier enforced)
- Use `@/` path alias for all imports from `src/` (e.g., `import { cn } from '@/lib/utils'`)
- File names are lowercase kebab-case (e.g., `theme-toggle.tsx`, `navigation-menu.tsx`)
- Functional components only — use `function` declarations, not arrow expressions, for components
- Strict TypeScript: no unused locals, no unused parameters, no fallthrough switch cases

## Routing

- Routes live in `src/routes/` — TanStack Router auto-generates `routeTree.gen.ts`
- **Never** manually edit `routeTree.gen.ts`
- Create routes with `createFileRoute()` from `@tanstack/react-router`
- Root layout is in `__root.tsx` — renders `<Outlet />` for child routes

## Adding a New Feature Package

Follow these steps each time you need to add a new feature to the monorepo.

### Step 1: Create Package Directory Structure

```bash
# Replace 'feature-name' with your feature name (e.g., customer-profile)
mkdir -p packages/<feature-name>/src/routes
```

### Step 2: Create package.json

Create `packages/<feature-name>/package.json`:

```json
{
  "name": "@2005portfilio2026bt/<feature-name>",
  "version": "1.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "peerDependencies": {
    "react": "^19.0.0",
    "@tanstack/react-router": "^1.0.0"
  }
}
```

### Step 3: Create the Route Component

Create `packages/<feature-name>/src/routes/<feature-name>.tsx`:

```typescript
import { createRoute, type AnyRoute } from '@tanstack/react-router'

export const <featureName>Route = createRoute({
  getParentRoute: () => (null as unknown as AnyRoute),
  path: '<feature-name>',
  component: () => <div><Feature Name> Feature</div>,
})
```

### Step 4: Export from Index

Create `packages/<feature-name>/src/index.ts`:

```typescript
export * from "./routes/<feature-name>";
```

### Step 5: Link Package to Main App

1. Add to `apps/admin-portal/package.json` dependencies:
   ```json
   "@admin-portal/<feature-name>": "*"
   ```

2. Install the new package:
   ```bash
   npm install
   ```

### Step 6: Register the Route

Create `apps/admin-portal/src/routes/<feature-name>.tsx`:

```typescript
import { createFileRoute } from "@tanstack/react-router";
import { <featureName>Route } from "@admin-portal/<feature-name>";

export const Route = createFileRoute("/<feature-name>")({
  component: <featureName>Route.options.component,
});
```

## AI Assistants

### GitHub Copilot

This file (`.github/copilot-instructions.md`) is automatically loaded into Copilot's context for every chat request. Custom prompts and agents can be added in `.github/prompts/` and `.github/agents/`.

### Claude

When using Claude (via Claude Code or the API), point it to this file for project context:

```
Read .github/copilot-instructions.md for project conventions before making changes.
```

### Available Skills

| Skill | Purpose |
|-------|---------|
| `react-tanstack-best-practices` | Type-safe routing, preloading, layout patterns, navigation, route data loading |
| `tailwind-design-tokens` | Project colour tokens, dark mode, custom utility classes, typography |
| `component-testing` | Vitest + Testing Library patterns for components, routes, theme toggle |
| `accessibility` | Semantic HTML, keyboard nav, ARIA, colour contrast, Radix a11y |
| `seo-and-meta` | Page titles, Open Graph, structured data, route-level head management |
| `responsive-layout` | Mobile-first patterns, breakpoints, grid/flex, project spacing conventions |
| `shade-extension` | Extend shadcn/ui components without modifying originals — invoke with `/shade-extension <component>` |

Invoke in Copilot chat with `/<skill-name>`.


## Components

- Custom app components go in `src/components/`
- shadcn/ui components live in `packages/general-components/src/components/ui/` — a local workspace package
- Import UI components from the package: `import { Button } from '@general/components/button'`
- Import utilities from the package: `import { cn } from '@general/lib/utils'`
- Add new shadcn components via `npx shadcn@latest add <name>` (they land in the package per `components.json`)
- The parent/root element of every component must include a `data-component` attribute with the component name in kebab-case:

```tsx
function ImageHeader({ ... }: ImageHeaderProps) {
  return (
    <div data-component="image-header" className={cn('relative', className)}>
      ...
    </div>
  );
}
```

## Styling

- Tailwind utility classes are the primary styling approach
- Custom design tokens are CSS variables defined in `src/styles.css`:
  - Text: `--sea-ink`, `--sea-ink-soft`
  - Accent: `--lagoon`, `--lagoon-deep`, `--palm`
  - Backgrounds: `--sand`, `--foam`, `--bg-base`
  - Surfaces: `--surface`, `--surface-strong`, `--header-bg`
- Dark mode uses both `data-theme="dark"` attribute and `.dark` class on `<html>`
- Typography: Manrope (sans), Fraunces (display/serif), JetBrains Mono (monospace)
- Custom layout classes: `.page-wrap`, `.island-shell`, `.feature-card`, `.display-title`, `.island-kicker`

## Commands

| Task         | Command                   |
| ------------ | ------------------------- |
| Dev server   | `npm run dev` (port 3000) |
| Build        | `npm run build`           |
| Preview      | `npm run preview`         |
| Test         | `npm run test`            |
| Lint check   | `npm run lint`            |
| Format check | `npm run format`          |
| Fix all      | `npm run check`           |
