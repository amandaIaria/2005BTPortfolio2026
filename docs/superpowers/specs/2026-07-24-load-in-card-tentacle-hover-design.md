# LoadInCard Tentacle Hover — Design

## Goal

`packages/modern/src/components/load-in-card.tsx` is an unwired, generic hover-tracking wrapper (`groupHovered` state already implemented via `onHoverStart`/`onHoverEnd`). On hover, an SVG tentacle should coil in and wrap over the card. On hover-out, the same animation should play in reverse, retracting back out.

## Architecture

- Add an absolutely-positioned SVG overlay inside `LoadInCard`, stacked above `children`:
  - `className="absolute inset-0 w-full h-full pointer-events-none"`
  - `viewBox="0 0 100 100"` with `preserveAspectRatio="none"` so the path stretches to fill the card regardless of its actual pixel dimensions.
- A single `<motion.path>` inside the SVG describes an organic, squiggly coil that starts near the bottom-right corner (roughly `(85, 90)`) and curls inward across the card's face (a freeform cubic-bezier path, not a border-tracing outline).
- Draw/retract is driven by Framer Motion's `pathLength` animation, not manual `stroke-dashoffset` math:
  - `fill="none"`, `strokeLinecap="round"`
  - variants: `{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }`
  - `initial="hidden"`, `animate={groupHovered ? "visible" : "hidden"}`
  - `transition={{ duration: 0.5, ease: "easeInOut" }}`
- Reversing on hover-out is NOT a separate animation — it's the same variant toggle running backward. Framer interpolates `pathLength` back toward 0 along the identical path, which reads as the tentacle retracting the way it came in.

## Styling

- `stroke="var(--lagoon-deep)"` (existing design token per project CLAUDE.md)
- `strokeWidth={3}`

## Non-goals / constraints

- `pointer-events-none` on the SVG overlay is required so it never intercepts hover/click events meant for `children` or the card itself.
- No new component state beyond the existing `groupHovered` boolean.
- No image assets — path is hand-authored SVG coordinates in the 0–100 viewBox space.
- Not wired into any route/parent yet; this is an isolated component change only (no existing consumers to regress).

## Testing

- No automated test applicable to a purely visual SVG stroke animation.
- Manual verification in-browser: hover in (coil draws in from bottom-right), hover out (coil retracts back toward bottom-right), check it doesn't block interaction with card content.
