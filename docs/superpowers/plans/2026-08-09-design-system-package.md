# `@design/system` Package Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract brand design tokens out of root `src/styles.css` into a new workspace package `@design/system`, wire it into the root app and `@general/components`, and land a reference-only copy of legacy BT-Design-System SCSS for future translation work.

**Architecture:** New npm workspace package `packages/design-system` exporting a single `tokens.css` file (CSS custom properties + Tailwind v4 `@theme` scale). Root `src/styles.css` imports it and drops the moved blocks. `@design/system` becomes a declared dependency of the root app and of `@general/components` (no code import needed there — Tailwind compiles from the consuming app). A verbatim, unbuilt copy of external SCSS source lands in `packages/design-system/legacy-bt-scss/` for future reference.

**Tech Stack:** npm workspaces, Tailwind CSS v4 (`@theme` directive), Vite 7.

## Global Constraints

- Package manager is npm (`package-lock.json` present at root) — use `npm install`, not pnpm/yarn, even though a vestigial `pnpm.onlyBuiltDependencies` block exists in root `package.json`.
- No `sass`/Sass build step is added. `legacy-bt-scss/` is inert reference material — not imported, not processed.
- No `tsconfig.json` in `packages/design-system` — v1 ships zero `.ts` files.
- `components.json` (shadcn config) stays untouched — `shadcn add` continues targeting root `src/styles.css`.
- This is a pure refactor: no visual/behavioral change is expected. Never invoke Playwright without asking the user first (per `CLAUDE.md`).
- Before considering any task done: no `console.log`, no unused code, `npm run check` and `npm run test` both pass.

---

### Task 1: Scaffold `@design/system` package with the moved tokens

**Files:**

- Create: `packages/design-system/package.json`
- Create: `packages/design-system/README.md`
- Create: `packages/design-system/src/tokens.css`

**Interfaces:**

- Produces: an importable CSS module at `@design/system/tokens.css` (per the package's `exports` map) defining CSS custom properties `--flat-black`, `--sea-ink`, `--sea-ink-soft`, `--lagoon`, `--lagoon-deep`, `--lagoon-600`, `--lagoon-700`, `--lagoon-800`, `--palm`, `--sand`, `--foam`, `--surface`, `--surface-strong`, `--line`, `--inset-glint`, `--kicker`, `--bg-base`, `--header-bg`, `--chip-bg`, `--chip-line`, `--link-bg-hover`, `--hero-a`, `--hero-b` (light values in `:root`, dark values in `:root[data-theme='dark']`), plus a Tailwind `@theme` block defining the Spacing/Font-Size/Border-Radius scales, the `--color-*` custom-token mappings, and `--font-heading`/`--font-mono`/`--font-sans`/`--font-serif`. Not yet consumed by anything (Task 2 wires it in).

- [ ] **Step 1: Create the package directory and `package.json`**

Create `packages/design-system/package.json`:

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

- [ ] **Step 2: Create `README.md`**

Create `packages/design-system/README.md`:

````markdown
# @design/system

Brand design tokens (CSS custom properties + Tailwind `@theme` scale) shared by the root app and `@general/components`.

## Usage

Imported once from the app's global stylesheet:

```css
@import '@design/system/tokens.css';
```
````

## Contents

- `src/tokens.css` — brand color tokens (light + `data-theme="dark"`), spacing/font-size/radius scale, font families.
- `legacy-bt-scss/` — reference-only copy of the BT-Design-System SCSS source (`github.com/amandaIaria/BT-Design-System`, path `src/assets/style/_bt`). Not built, not imported anywhere. Source material for future one-file-at-a-time translation into `tokens.css` / Tailwind utilities.

````

- [ ] **Step 3: Create `src/tokens.css`**

Create `packages/design-system/src/tokens.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Text:wght@400&family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap');
@import '@fontsource-variable/jetbrains-mono';

:root {
  --flat-black: #333333;
  --sea-ink: #173a40;
  --sea-ink-soft: #416166;
  --lagoon: #4fb8b2;
  --lagoon-deep: #328f97;
  --lagoon-600: #3a9fa0;
  --lagoon-700: #2a8a8d;
  --lagoon-800: #1a757a;
  --palm: #2f6a4a;
  --sand: #e7f0e8;
  --foam: #f3faf5;
  --surface: rgba(255, 255, 255, 0.74);
  --surface-strong: rgba(255, 255, 255, 0.9);
  --line: var(--flat-black); /* rgba(23, 58, 64, 0.14);*/
  --inset-glint: rgba(255, 255, 255, 0.82);
  --kicker: rgba(47, 106, 74, 0.9);
  --bg-base: #e7f3ec;
  --header-bg: rgba(251, 255, 248, 0.84);
  --chip-bg: rgba(255, 255, 255, 0.8);
  --chip-line: rgba(47, 106, 74, 0.18);
  --link-bg-hover: rgba(255, 255, 255, 0.9);
  --hero-a: rgba(79, 184, 178, 0.36);
  --hero-b: rgba(47, 106, 74, 0.2);
}

:root[data-theme='dark'] {
  --sea-ink: #d7ece8;
  --sea-ink-soft: #afcdc8;
  --lagoon: #60d7cf;
  --lagoon-deep: #8de5db;
  --palm: #6ec89a;
  --sand: #0f1a1e;
  --foam: #101d22;
  --surface: rgba(16, 30, 34, 0.8);
  --surface-strong: rgba(15, 27, 31, 0.92);
  --line: rgba(141, 229, 219, 0.18);
  --inset-glint: rgba(194, 247, 238, 0.14);
  --kicker: #b8efe5;
  --bg-base: #0a1418;
  --header-bg: rgba(10, 20, 24, 0.8);
  --chip-bg: rgba(13, 28, 32, 0.9);
  --chip-line: rgba(141, 229, 219, 0.24);
  --link-bg-hover: rgba(24, 44, 49, 0.8);
  --hero-a: rgba(96, 215, 207, 0.18);
  --hero-b: rgba(110, 200, 154, 0.12);
}

@theme {
  /* Spacing */
  --spacing-0: 0;
  --spacing-0-5: 0.125rem;
  --spacing-1: 0.25rem;
  --spacing-1-5: 0.375rem;
  --spacing-2: 0.5rem;
  --spacing-2-5: 0.625rem;
  --spacing-3: 0.75rem;
  --spacing-3-5: 0.875rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-7: 1.75rem;
  --spacing-8: 2rem;
  --spacing-9: 2.25rem;
  --spacing-10: 2.5rem;
  --spacing-11: 2.75rem;
  --spacing-12: 3rem;
  --spacing-14: 3.5rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;
  --spacing-28: 7rem;
  --spacing-32: 8rem;
  --spacing-36: 9rem;
  --spacing-40: 10rem;
  --spacing-44: 11rem;
  --spacing-48: 12rem;
  --spacing-52: 13rem;
  --spacing-56: 14rem;
  --spacing-60: 15rem;
  --spacing-64: 16rem;
  --spacing-72: 18rem;
  --spacing-80: 20rem;
  --spacing-96: 24rem;

  /* Font Sizes */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;
  --font-size-6xl: 3.75rem;
  --font-size-7xl: 4.5rem;

  /* Border Radius */
  --radius-none: 0;
  --radius-sm: 0.375rem;
  --radius-DEFAULT: 0.625rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.875rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.125rem;
  --radius-3xl: 1.375rem;
  --radius-full: 9999px;

  /* Colors - Custom Tokens */
  --color-lagoon: var(--lagoon);
  --color-lagoon-deep: var(--lagoon-deep);
  --color-sea-ink: var(--sea-ink);
  --color-sea-ink-soft: var(--sea-ink-soft);
  --color-palm: var(--palm);
  --color-sand: var(--sand);
  --color-foam: var(--foam);
  --color-surface: var(--surface);
  --color-surface-strong: var(--surface-strong);
  --color-line: var(--line);
  --color-inset-glint: var(--inset-glint);
  --color-kicker: var(--kicker);
  --color-bg-base: var(--bg-base);
  --color-header-bg: var(--header-bg);
  --color-chip-bg: var(--chip-bg);
  --color-chip-line: var(--chip-line);
  --color-link-bg-hover: var(--link-bg-hover);
  --color-hero-a: var(--hero-a);
  --color-hero-b: var(--hero-b);

  /* Font Families */
  --font-heading: var(--font-mono);
  --font-mono: 'JetBrains Mono Variable', monospace;
  --font-sans: 'Manrope', ui-sans-serif, system-ui, sans-serif;
  --font-serif: 'DM Serif Text', serif;
}
````

- [ ] **Step 4: Verify the file contents**

Run: `grep -c -- "--" packages/design-system/src/tokens.css`
Expected: a number greater than `60` (one line per custom property plus comments; confirms the file wasn't truncated).

Run: `grep -E "\-\-(lagoon|spacing-4|font-serif|hero-b):" packages/design-system/src/tokens.css`
Expected: 4 matching lines (one per token), confirming key tokens from each moved section (brand color, spacing scale, font family, dark-adjacent brand color) are present.

- [ ] **Step 5: Commit**

```bash
git add packages/design-system
git commit -m "$(cat <<'EOF'
Scaffold @design/system package with brand tokens

Not yet wired into the app - packages/design-system/src/tokens.css
holds the moved token definitions, unconsumed until the next commit.
EOF
)"
```

---

### Task 2: Wire `@design/system` tokens into the root app and `@general/components`

**Files:**

- Modify: `src/styles.css`
- Modify: `package.json`
- Modify: `packages/general-components/package.json`

**Interfaces:**

- Consumes: `@design/system/tokens.css` (from Task 1) via `@import`.
- Produces: root app whose Tailwind build resolves the same custom properties and `@theme` scale as before the split — no visual change.

- [ ] **Step 1: Edit `src/styles.css` — imports and `:root` blocks**

Use the Edit tool on `src/styles.css`. Replace this exact block (the file's first 92 lines, from the top through the closing `}` of the commented-out `@media` block):

Old:

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Text:wght@400&family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap');
@import 'tailwindcss';
@import 'tw-animate-css';
@import 'shadcn/tailwind.css';
@import '@fontsource-variable/jetbrains-mono';

@custom-variant dark (&:is(.dark *));
@plugin "@tailwindcss/typography";

:root {
  --flat-black: #333333;
  --sea-ink: #173a40;
  --sea-ink-soft: #416166;
  --lagoon: #4fb8b2;
  --lagoon-deep: #328f97;
  --lagoon-600: #3a9fa0;
  --lagoon-700: #2a8a8d;
  --lagoon-800: #1a757a;
  --palm: #2f6a4a;
  --sand: #e7f0e8;
  --foam: #f3faf5;
  --surface: rgba(255, 255, 255, 0.74);
  --surface-strong: rgba(255, 255, 255, 0.9);
  --line: var(--flat-black); /* rgba(23, 58, 64, 0.14);*/
  --inset-glint: rgba(255, 255, 255, 0.82);
  --kicker: rgba(47, 106, 74, 0.9);
  --bg-base: #e7f3ec;
  --header-bg: rgba(251, 255, 248, 0.84);
  --chip-bg: rgba(255, 255, 255, 0.8);
  --chip-line: rgba(47, 106, 74, 0.18);
  --link-bg-hover: rgba(255, 255, 255, 0.9);
  --hero-a: rgba(79, 184, 178, 0.36);
  --hero-b: rgba(47, 106, 74, 0.2);
  --background: oklch(1 0 0);
  --foreground: var(--flat-black);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
  --body: var(--flat-black);
  --accent: var(--color-cyan-500);
  --accent-foreground: var(--lagoon-deep);
  --accent-hover: var(--lagoon-deep);
}

:root[data-theme='dark'] {
  --sea-ink: #d7ece8;
  --sea-ink-soft: #afcdc8;
  --lagoon: #60d7cf;
  --lagoon-deep: #8de5db;
  --palm: #6ec89a;
  --sand: #0f1a1e;
  --foam: #101d22;
  --surface: rgba(16, 30, 34, 0.8);
  --surface-strong: rgba(15, 27, 31, 0.92);
  --line: rgba(141, 229, 219, 0.18);
  --inset-glint: rgba(194, 247, 238, 0.14);
  --kicker: #b8efe5;
  --bg-base: #0a1418;
  --header-bg: rgba(10, 20, 24, 0.8);
  --chip-bg: rgba(13, 28, 32, 0.9);
  --chip-line: rgba(141, 229, 219, 0.24);
  --link-bg-hover: rgba(24, 44, 49, 0.8);
  --hero-a: rgba(96, 215, 207, 0.18);
  --hero-b: rgba(110, 200, 154, 0.12);
  --body: var(--color-white);
  --accent: #ff0000;
}

/* @media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    --sea-ink: #d7ece8;
    --sea-ink-soft: #afcdc8;
    --lagoon: #60d7cf;
    --lagoon-deep: #8de5db;
    --palm: #6ec89a;
    --sand: #0f1a1e;
    --foam: #101d22;
    --surface: rgba(16, 30, 34, 0.8);
    --surface-strong: rgba(15, 27, 31, 0.92);
    --line: rgba(141, 229, 219, 0.18);
    --inset-glint: rgba(194, 247, 238, 0.14);
    --kicker: #b8efe5;
    --bg-base: #0a1418;
    --header-bg: rgba(10, 20, 24, 0.8);
    --chip-bg: rgba(13, 28, 32, 0.9);
    --chip-line: rgba(141, 229, 219, 0.24);
    --link-bg-hover: rgba(24, 44, 49, 0.8);
    --hero-a: rgba(96, 215, 207, 0.18);
    --hero-b: rgba(110, 200, 154, 0.12);
  }
} */
```

New:

```css
@import 'tailwindcss';
@import 'tw-animate-css';
@import 'shadcn/tailwind.css';
@import '@design/system/tokens.css';

@custom-variant dark (&:is(.dark *));
@plugin "@tailwindcss/typography";

:root {
  --background: oklch(1 0 0);
  --foreground: var(--flat-black);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
  --body: var(--flat-black);
  --accent: var(--color-cyan-500);
  --accent-foreground: var(--lagoon-deep);
  --accent-hover: var(--lagoon-deep);
}

:root[data-theme='dark'] {
  --body: var(--color-white);
  --accent: #ff0000;
}

/* @media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    --sea-ink: #d7ece8;
    --sea-ink-soft: #afcdc8;
    --lagoon: #60d7cf;
    --lagoon-deep: #8de5db;
    --palm: #6ec89a;
    --sand: #0f1a1e;
    --foam: #101d22;
    --surface: rgba(16, 30, 34, 0.8);
    --surface-strong: rgba(15, 27, 31, 0.92);
    --line: rgba(141, 229, 219, 0.18);
    --inset-glint: rgba(194, 247, 238, 0.14);
    --kicker: #b8efe5;
    --bg-base: #0a1418;
    --header-bg: rgba(10, 20, 24, 0.8);
    --chip-bg: rgba(13, 28, 32, 0.9);
    --chip-line: rgba(141, 229, 219, 0.24);
    --link-bg-hover: rgba(24, 44, 49, 0.8);
    --hero-a: rgba(96, 215, 207, 0.18);
    --hero-b: rgba(110, 200, 154, 0.12);
  }
} */
```

Note: the `:root[data-theme='dark']` block keeps only `--body`/`--accent` — those two reference shadcn-territory vars (`--color-white`/hardcoded), unlike the rest of the brand dark overrides which moved to `tokens.css` in Task 1. This mirrors the light-mode `:root` split, where `--body`/`--accent`/`--accent-foreground`/`--accent-hover` also stayed behind.

- [ ] **Step 2: Edit `src/styles.css` — trim the `@theme` block**

Replace this exact block:

Old:

```css
@theme {
  /* Spacing */
  --spacing-0: 0;
  --spacing-0-5: 0.125rem;
  --spacing-1: 0.25rem;
  --spacing-1-5: 0.375rem;
  --spacing-2: 0.5rem;
  --spacing-2-5: 0.625rem;
  --spacing-3: 0.75rem;
  --spacing-3-5: 0.875rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-7: 1.75rem;
  --spacing-8: 2rem;
  --spacing-9: 2.25rem;
  --spacing-10: 2.5rem;
  --spacing-11: 2.75rem;
  --spacing-12: 3rem;
  --spacing-14: 3.5rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;
  --spacing-28: 7rem;
  --spacing-32: 8rem;
  --spacing-36: 9rem;
  --spacing-40: 10rem;
  --spacing-44: 11rem;
  --spacing-48: 12rem;
  --spacing-52: 13rem;
  --spacing-56: 14rem;
  --spacing-60: 15rem;
  --spacing-64: 16rem;
  --spacing-72: 18rem;
  --spacing-80: 20rem;
  --spacing-96: 24rem;

  /* Font Sizes */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;
  --font-size-6xl: 3.75rem;
  --font-size-7xl: 4.5rem;

  /* Border Radius */
  --radius-none: 0;
  --radius-sm: 0.375rem;
  --radius-DEFAULT: 0.625rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.875rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.125rem;
  --radius-3xl: 1.375rem;
  --radius-full: 9999px;

  /* Colors - Custom Tokens */
  --color-lagoon: var(--lagoon);
  --color-lagoon-deep: var(--lagoon-deep);
  --color-sea-ink: var(--sea-ink);
  --color-sea-ink-soft: var(--sea-ink-soft);
  --color-palm: var(--palm);
  --color-sand: var(--sand);
  --color-foam: var(--foam);
  --color-surface: var(--surface);
  --color-surface-strong: var(--surface-strong);
  --color-line: var(--line);
  --color-inset-glint: var(--inset-glint);
  --color-kicker: var(--kicker);
  --color-bg-base: var(--bg-base);
  --color-header-bg: var(--header-bg);
  --color-chip-bg: var(--chip-bg);
  --color-chip-line: var(--chip-line);
  --color-link-bg-hover: var(--link-bg-hover);
  --color-hero-a: var(--hero-a);
  --color-hero-b: var(--hero-b);

  /* Colors - shadcn */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent-hover: var(--accent-hover);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  /* Font Families */
  --font-heading: var(--font-mono);
  --font-mono: 'JetBrains Mono Variable', monospace;
  --font-sans: 'Manrope', ui-sans-serif, system-ui, sans-serif;
  --font-serif: 'DM Serif Text', serif;
}
```

New:

```css
@theme {
  /* Colors - shadcn */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent-hover: var(--accent-hover);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}
```

- [ ] **Step 3: Add the dependency to root `package.json`**

In `package.json`, in the `dependencies` object, add `"@design/system": "*"` immediately after `"@2005portfolio/feature": "*",` (alphabetical position, before `@fontsource-variable/jetbrains-mono`):

```json
  "dependencies": {
    "@2005portfolio/feature": "*",
    "@design/system": "*",
    "@fontsource-variable/jetbrains-mono": "^5.2.8",
```

- [ ] **Step 4: Add the dependency to `packages/general-components/package.json`**

Replace:

```json
  "dependencies": {
    "@types/dompurify": "^3.0.5",
    "dompurify": "^3.4.12"
  }
```

With:

```json
  "dependencies": {
    "@design/system": "*",
    "@types/dompurify": "^3.0.5",
    "dompurify": "^3.4.12"
  }
```

- [ ] **Step 5: Install to link the new workspace package**

Run: `npm install`
Expected: exits 0, `package-lock.json` updates to include `@design/system`, no errors.

- [ ] **Step 6: Verify the build**

Run: `npm run build`
Expected: exits 0 with no errors (in particular, no "failed to resolve import @design/system/tokens.css" or unresolved CSS custom property errors — Tailwind v4 collects `@theme` declarations across `@import`ed files, so the split theme still produces the same utility classes).

- [ ] **Step 7: Confirm no orphaned references**

Run: `grep -n "font-size-xs\|spacing-4:" src/styles.css`
Expected: no output — confirms the moved `@theme` sub-blocks are gone from the root file (they now live only in `packages/design-system/src/tokens.css`).

- [ ] **Step 8: Commit**

```bash
git add src/styles.css package.json packages/general-components/package.json package-lock.json
git commit -m "$(cat <<'EOF'
Wire @design/system tokens into the app and general-components

Root styles.css now imports the extracted tokens instead of defining
them inline; shadcn-generated vars and app-level styles are untouched.
EOF
)"
```

---

### Task 3: Copy legacy BT-Design-System SCSS as reference-only material

**Files:**

- Create: `packages/design-system/legacy-bt-scss/` (verbatim copy of an external repo's `src/assets/style/_bt/` tree)

**Interfaces:**

- Produces: a static, unbuilt SCSS tree for future translation work. Nothing in this repo imports or processes it.

- [ ] **Step 1: Clone the source repo to scratch space**

Run: `git clone --depth 1 https://github.com/amandaIaria/BT-Design-System.git /tmp/bt-design-system-src`
Expected: exits 0, directory created.

- [ ] **Step 2: Copy the `_bt` SCSS tree into the package**

Run: `mkdir -p packages/design-system/legacy-bt-scss && cp -R /tmp/bt-design-system-src/src/assets/style/_bt/. packages/design-system/legacy-bt-scss/`
Expected: exits 0.

- [ ] **Step 3: Verify the copy is byte-identical to the source**

Run: `diff -rq /tmp/bt-design-system-src/src/assets/style/_bt packages/design-system/legacy-bt-scss`
Expected: no output (no differences reported).

- [ ] **Step 4: Clean up the scratch clone**

Run: `rm -rf /tmp/bt-design-system-src`
Expected: exits 0.

- [ ] **Step 5: Confirm nothing in the app imports the copied tree**

Run: `grep -rn "legacy-bt-scss" --include="*.ts" --include="*.tsx" --include="*.css" --include="*.js" . --exclude-dir=node_modules --exclude-dir=legacy-bt-scss`
Expected: no output — confirms it's reference-only, not wired into any build.

- [ ] **Step 6: Commit**

```bash
git add packages/design-system/legacy-bt-scss
git commit -m "$(cat <<'EOF'
Add legacy BT-Design-System SCSS as reference-only material

Verbatim copy of github.com/amandaIaria/BT-Design-System's
src/assets/style/_bt tree. Not built, not imported - source material
for future one-file-at-a-time translation into tokens.css / Tailwind
utilities.
EOF
)"
```

---

### Task 4: Full repo verification

**Files:** none (verification only; may produce formatting-only diffs via `npm run check`)

**Interfaces:** none — this task confirms Tasks 1-3 didn't break anything repo-wide.

- [ ] **Step 1: Run lint, format, and type check**

Run: `npm run check`
Expected: exits 0. If it reformats any file, that's an accepted formatting-only diff — proceed to Step 3.

- [ ] **Step 2: Run the test suite**

Run: `npm run test`
Expected: exits 0, all existing tests still pass (no test targets the moved tokens directly — this confirms nothing else broke).

- [ ] **Step 3: Review and commit any formatting diff, if present**

Run: `git status`
If clean, no commit needed — plan is complete.
If `npm run check` modified files:

```bash
git add -u
git commit -m "$(cat <<'EOF'
Apply formatting from npm run check
EOF
)"
```

- [ ] **Step 4: Ask the user about a Playwright visual check**

This was a pure CSS refactor with no expected visual change. Per `CLAUDE.md`, do not invoke Playwright without asking first — ask the user now whether they want a before/after screenshot check of the running dev server (`npm run dev`) before considering this plan fully done.
