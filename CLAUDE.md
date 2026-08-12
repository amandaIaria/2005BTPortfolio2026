# Portfolio 2026 — Claude Code Guide

This file is automatically loaded by Claude Code. Reference `.github/copilot-instructions.md` for detailed conventions.

## Tone

Always short and concise. If the caveman skill/agent isn't available, act like it anyway — terse fragments, no filler, no pleasantries.

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

## New Component Workflow

When creating a new component:

1. Start in plan mode — no code before a plan is agreed.
2. Ask for the Jira ticket URL and the Figma URL before planning.
3. Invoke whichever skills the component needs (e.g. `create-component`, `shade-extension`, `tailwind-design-tokens`, `accessibility`, `responsive-layout`, `seo-and-meta`, `component-testing`, `figma-design-match`).
4. Use worktrees only for component creation (not other tasks). Build two versions of the component, each in its own worktree, then give the user a URL per version to preview so they can confirm which one to go with.
5. Once the chosen version is merged into the working branch, commit with the message `creation of <component name>` plus a description of the component, followed by a line `<branch name>: <what the user asked for>`.

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

## Playwright / Visual Verification

- Never invoke Playwright unprompted. Ask the user first whether they want a Playwright-driven check.
- If approved: take a "before" screenshot, make the change, take an "after" screenshot, then show both side by side (or clearly labeled Before/After) so the diff is easy to read.
- Once the task that needed Playwright is done, delete the screenshot files you created.

## Output Style

`i-have-adhd` skill always on (enabled via `~/.claude/.i-have-adhd-always`, global to this machine, not repo-scoped). Shapes every response: lead with next action, number multi-step work, cap lists at 5. Say "stop adhd mode" to turn off for a session; delete the flag file to turn off for good.

## Before Committing

1. Run `npm run check` (lint + format + type check)
2. Run `npm run test`
3. Verify no `console.log` or unused code
