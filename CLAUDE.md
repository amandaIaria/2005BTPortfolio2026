# Portfolio 2026 — Claude Code Guide

This file is automatically loaded by Claude Code. Reference `.github/copilot-instructions.md` for detailed conventions.

## Quick Setup

- **Node version**: See `.nvmrc`
- **Dev server**: `npm run dev` (port 3000)
- **Build**: `npm run build`
- **Test**: `npm run test`
- **Lint/format**: `npm run lint` and `npm run format`

## Stack & Key Conventions

- **React 19** (TypeScript strict mode) + **Vite 7** + **Tailwind CSS 4**
- **TanStack Router** with file-based routing (`src/routes/`)
- **shadcn/ui** for components (`packages/general-components/src/components/ui/`)
- **CVA** for component variants
- **Phosphor Icons** (`@phosphor-icons/react`)

### Code Style

- No semicolons, single quotes, trailing commas (Prettier enforced)
- Functional components using `function` declarations (not arrows)
- Path alias `@/` for all `src/` imports
- Lowercase kebab-case filenames
- Every component requires `data-component` attribute

### Design Tokens (`.src/styles.css`)

- Text: `--sea-ink`, `--sea-ink-soft`
- Accent: `--lagoon`, `--lagoon-deep`, `--palm`
- Backgrounds: `--sand`, `--foam`, `--bg-base`
- Surfaces: `--surface`, `--surface-strong`, `--header-bg`
- Dark mode: `data-theme="dark"` + `.dark` on `<html>`

## Custom Skills

Invoke with `/` in Claude Code:

| Skill                           | Purpose                                  |
| ------------------------------- | ---------------------------------------- |
| `react-tanstack-best-practices` | Type-safe routing, layouts, data loading |
| `tailwind-design-tokens`        | Color tokens, dark mode, utilities       |
| `component-testing`             | Vitest + Testing Library patterns        |
| `accessibility`                 | Semantic HTML, ARIA, a11y best practices |
| `seo-and-meta`                  | Meta tags, Open Graph, structured data   |
| `responsive-layout`             | Mobile-first, breakpoints, spacing       |
| `shade-extension`               | Extend shadcn/ui without modifying       |

## Monorepo Structure

```
apps/
  admin-portal/              # Main Vite app
packages/
  general-components/        # shadcn/ui + custom components
  feature-name/              # New features added here
```

See `.github/copilot-instructions.md` for adding new feature packages.

## Routing Notes

- Routes auto-register from `src/routes/` — never manually edit `routeTree.gen.ts`
- Root layout in `__root.tsx` renders `<Outlet />`
- Create routes with `createFileRoute()`

## Before Committing

1. Run `npm run check` (lint + format + type check)
2. Run `npm run test`
3. Verify no `console.log` or unused code
