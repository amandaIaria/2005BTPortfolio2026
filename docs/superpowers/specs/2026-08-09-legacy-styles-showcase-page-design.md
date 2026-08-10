# Legacy Styles Showcase Page — Design

## Goal

A new `/ui-kit/legacy-styles` route showing the pasted legacy BT-Design-System HTML, styled by compiling the `legacy-bt-scss/` reference tree (added in the `@design/system` package work) to real CSS for the first time. The page component lives in `packages/design-system` (its first React content); the route lives under `src/routes/ui-kit/`, matching the header/title treatment of the existing `UiKitPage`.

No Jira ticket / Figma URL for this one — content is a verbatim legacy-HTML port with nothing to compare design-wise, so `CLAUDE.md`'s two-worktree-version New Component Workflow is skipped by explicit user choice.

## Package additions (`packages/design-system`)

First React content in this package — add:

```json
{
  "name": "@design/system",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "exports": {
    "./tokens.css": "./src/tokens.css",
    "./pages/*": "./src/pages/*"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "sass": "^1.83.0"
  }
}
```

`sass` enables Vite's built-in SCSS compilation (no extra config) — needed to compile `legacy-bt-scss/_bt.scss` for the first time. `_bt.scss`'s partials use old-style Sass `@import` (deprecated in modern Dart Sass but still functional) — expect deprecation warnings in build output, not errors.

New directories: `packages/design-system/src/components/` and `packages/design-system/src/pages/`.

## Style isolation: Shadow DOM

The legacy SCSS ships its own global resets (`_generic/_generic.scss`, `_elements/_elements.scss`) targeting bare `body`/`html`/`*` selectors. Loaded normally, these would bleed into every other route in this SPA. Shadow DOM gives free isolation both directions: selectors like `body`/`html` inside shadow-root CSS don't match anything (no real `<body>` inside a shadow tree), and the app's own Tailwind/shadcn styles can't reach into the shadow tree either.

**New file:** `packages/design-system/src/components/shadow-html.tsx`

```tsx
import { useEffect, useRef } from 'react';

type ShadowHtmlProps = {
  css: string;
  html: string;
  className?: string;
};

export function ShadowHtml({ css, html, className }: ShadowHtmlProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const root = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
    root.innerHTML = `<style>${css}</style>${html}`;
  }, [css, html]);

  return (
    <div data-component="shadow-html" ref={hostRef} className={className} />
  );
}
```

Generic and reusable — not specific to this one page. `attachShadow` is idempotent-guarded via `host.shadowRoot ?? host.attachShadow(...)` so re-renders (e.g. React StrictMode double-invoke) don't throw on re-attaching.

## CSS delivery

Vite's `?inline` import suffix returns compiled CSS as a string instead of auto-injecting it into `<head>` — exactly what a shadow-root `<style>` tag needs:

```tsx
import legacyCss from '../../legacy-bt-scss/_bt.scss?inline';
```

This is a relative import inside `packages/design-system` itself, so no package.json `exports` entry for `legacy-bt-scss` is needed (only cross-package imports need an exports entry).

**Material Icons:** the Alerts section markup uses `<i class="material-icons">error</i>` (and `check`/`info`/`close`) as icon ligatures. Nothing in this project currently loads that font. Add it as a literal `@import url(...)` prepended to the CSS string passed into `ShadowHtml`:

```tsx
const materialIconsImport =
  "@import url('https://fonts.googleapis.com/icon?family=Material+Icons');"

<ShadowHtml css={materialIconsImport + legacyCss} html={legacyHtml} />
```

`legacyCss` itself contains zero literal `@import` statements (Sass compilation already expanded/inlined everything at build time), so prepending the one remaining runtime `@import` keeps it validly positioned as the stylesheet's first rule — no repeat of the import-ordering bug hit earlier in the `@design/system` tokens work.

## Page component

**New file:** `packages/design-system/src/pages/legacy-styles-page.tsx`

Shell mirrors `UiKitPage`'s header treatment: `TempNav`, kicker label ("Design System" or similar), `h1` title, description paragraph, `Separator` — then `<ShadowHtml>` as the body, fed the pasted HTML (stored as a template-literal constant in this file) and the combined CSS string above.

## Route wiring

**New file:** `src/routes/ui-kit/legacy-styles.tsx` (same shape as `src/routes/ui-kit/slider.tsx`):

```tsx
import { createFileRoute } from '@tanstack/react-router';
import LegacyStylesPage from '@design/pages/legacy-styles-page';

export const Route = createFileRoute('/ui-kit/legacy-styles')({
  component: LegacyStylesPage,
});
```

**Modify** root `tsconfig.json`: add `"@design/pages/*": ["./packages/design-system/src/pages/*"]` to `compilerOptions.paths`, matching the existing `@general/pages/*` entry exactly. This repo resolves package subpath imports via tsconfig `paths` + the `vite-tsconfig-paths` plugin (already a root devDependency), not bare package.json `exports` lookups — the `exports` entry from the Package Additions section above matches sibling-package shape for consistency but isn't what actually resolves the import at build/type-check time.

## Non-goals

- No legacy JS behavior — the textarea's `data-min-rows` auto-grow, any legacy form validation/interactivity: markup and CSS only, static.
- No sanitization (DOMPurify etc.) of the injected HTML — it's a fixed, developer-authored string compiled into the bundle, not runtime user input; same trust level as writing JSX directly in this file.
- No changes to `UiKitPage` itself — the new page replicates its header shell inline rather than extracting a shared layout component, to avoid touching already-shipped code for a single new consumer.
- No translation of legacy SCSS to Tailwind — this page compiles and uses the legacy CSS as-is, unrelated to the separate future translation work noted in `@design/system`'s README.

## Testing

Component test (Vitest + Testing Library + jsdom, per `component-testing` skill conventions), for `shadow-html.tsx`:

- Renders a host `<div data-component="shadow-html">`.
- After mount, `host.shadowRoot` exists and its `innerHTML` contains both the injected `<style>` tag and the passed-in HTML content.
- Re-rendering with new `css`/`html` props updates the shadow root's content (doesn't throw on re-`attachShadow`).

Smoke test for `legacy-styles-page.tsx`: renders without throwing, contains the `shadow-html` host element.
