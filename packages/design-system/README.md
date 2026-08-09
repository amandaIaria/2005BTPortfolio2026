# @design/system

Brand design tokens (CSS custom properties + Tailwind `@theme` scale) shared by the root app and `@general/components`.

## Usage

Imported once from the app's global stylesheet:

```css
@import '@design/system/tokens.css';
```

## Contents

- `src/tokens.css` — brand color tokens (light + `data-theme="dark"`), spacing/font-size/radius scale, font families.
- `legacy-bt-scss/` — reference-only copy of the BT-Design-System SCSS source (`github.com/amandaIaria/BT-Design-System`, path `src/assets/style/_bt`). Not built, not imported anywhere. Source material for future one-file-at-a-time translation into `tokens.css` / Tailwind utilities.

## Import order

The Google Fonts `@import url(...)` must remain the first rule in the consuming app's stylesheet (currently `src/styles.css`). `@design/system/tokens.css` itself can be imported anywhere after that, but importing it before `tailwindcss` breaks Tailwind's `@layer theme` wrapping (loses tree-shaking, unlayers all theme vars) — so it should come after the `tailwindcss`/`tw-animate-css`/`shadcn/tailwind.css` imports.
