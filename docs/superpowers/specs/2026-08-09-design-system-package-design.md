# `@design/system` Package — Design

## Goal

Extract brand design tokens (currently living in root `src/styles.css`) into a new workspace package, `packages/design-system`, consumed by the root app and tied into `@general/components`. v1 ships tokens only — no components, no primitives. Also land a reference-only copy of legacy SCSS from an external design system for future Tailwind translation work.

## New package

```
packages/design-system/
  package.json
  README.md
  src/
    tokens.css
  legacy-bt-scss/        # verbatim copy, reference-only, not built or imported
```

`package.json`:

```json
{
  "name": "@design/system",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "exports": {
    "./tokens.css": "./src/tokens.css"
  }
}
```

No `tsconfig.json` — zero `.ts` files in v1, nothing to compile. Picked up automatically by the root `workspaces: ["packages/*"]` glob.

## Token boundary

**Moves from root `src/styles.css` into `design-system/src/tokens.css`:**

- Font `@import` lines (Google Fonts URL, `@fontsource-variable/jetbrains-mono`) — required by the font-family tokens below
- `:root` brand var block: `--flat-black`, `--sea-ink`, `--sea-ink-soft`, `--lagoon`, `--lagoon-deep`, `--lagoon-600/700/800`, `--palm`, `--sand`, `--foam`, `--surface`, `--surface-strong`, `--line`, `--inset-glint`, `--kicker`, `--bg-base`, `--header-bg`, `--chip-bg`, `--chip-line`, `--link-bg-hover`, `--hero-a`, `--hero-b`
- `:root[data-theme='dark']` override block (dark values for the same brand vars)
- `@theme` sub-blocks: Spacing, Font Sizes, Border Radius, "Colors - Custom Tokens" (`--color-lagoon` … `--color-hero-b`), Font Families

**Stays in root `src/styles.css`:**

- `@import 'tailwindcss'` / `'tw-animate-css'` / `'shadcn/tailwind.css'`, `@custom-variant dark`, `@plugin "@tailwindcss/typography"`
- shadcn-generated `:root` vars (`--background`, `--card`, `--popover`, `--primary` … `--sidebar-ring`) and the `.dark` class block — `components.json` points `shadcn add` regeneration at this file; these stay put
- `--accent`, `--accent-foreground`, `--accent-hover`, `--body` — live in the shadcn `:root` block but reference brand vars via `var()`; cross-file custom-property resolution works regardless of which imported file defines the var, so no untangling needed
- `@theme` "Colors - shadcn" sub-block
- `@layer base`, `@layer components`, `@utility` blocks — app-level styles, not tokens

Net effect: the single `@theme {}` block in root splits into two `@theme {}` blocks across two files. Valid in Tailwind v4 — all `@theme` declarations are collected at build time regardless of source file.

## Consumption wiring

- Root `src/styles.css`: add `@import '@design/system/tokens.css';` immediately after `@import 'tailwindcss';`, before the `shadcn/tailwind.css` import. Delete the moved content.
- Root `package.json` and `packages/general-components/package.json`: add `"@design/system": "*"` as a dependency. `@general/components` has no build step of its own (consumers import `.tsx` directly, per its `exports` map) — Tailwind classes are compiled by whichever app consumes it, and the root `tailwind.config.ts` content globs (`./packages/**/*.{js,ts,jsx,tsx}`) already cover it. The dependency documents the coupling and unblocks future JS-exported primitives; it does not require an explicit CSS import inside `@general/components`.
- `components.json` is unchanged.

## Legacy SCSS reference (BT-Design-System)

Source: `https://github.com/amandaIaria/BT-Design-System`, path `src/assets/style/_bt/`. An ITCSS-structured SCSS tree (settings → tools → generic → elements → objects → components → utility) with real design tokens in `_settings/_brand.scss` (`$colors`, `$brandColors`, `$stateColors`, `$fontFamily`, `$size`, `$breakpoints`, `$borderRadius`) plus a full component layer (atoms/molecules/organisms/templates) and utility classes.

v1 action: copy the `_bt/` tree verbatim into `packages/design-system/legacy-bt-scss/`. Not imported by any build, not processed by Sass, no `sass` dependency added. Pure reference for future one-file-at-a-time translation into `tokens.css` / Tailwind utilities — that translation work is explicitly out of scope for this pass.

## Non-goals (v1)

- No typography/spacing/icon-wrapper primitive components — tokens only, primitives are follow-up work once this layer is proven
- No translation of BT SCSS tokens or components into Tailwind — copy-in only
- No new build tooling (Sass, PostCSS changes) — `legacy-bt-scss/` is inert reference material
- No change to how `shadcn add` resolves its target file

## Migration & verification steps

1. Create `packages/design-system/` with `package.json`, `README.md`, `src/tokens.css`
2. Cut the token blocks listed above out of root `src/styles.css` into `tokens.css`
3. Edit root `src/styles.css`: add the new `@import`, remove moved content
4. Add `"@design/system": "*"` to root and `general-components` `package.json` dependencies
5. Copy `_bt/` SCSS tree into `packages/design-system/legacy-bt-scss/`
6. `npm install` to link the new workspace package
7. Pure refactor — no visual change expected. Ask before any Playwright before/after check (per `CLAUDE.md`)
8. `npm run check` and `npm run test`
9. Review diff, commit
