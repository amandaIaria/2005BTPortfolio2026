# Modal with Confirmation Cookie — Design

## Goal

A reusable `Modal` component (title + description) with two types: `info` (always shows) and `confirmation` (once dismissed via the OK button, remembers via a cookie and never shows again for a week).

## New files

- `packages/general-components/src/lib/cookies.ts` — native `document.cookie` helpers, no new dependency:
  - `getCookie(name: string): string | undefined`
  - `setCookie(name: string, value: string, days: number): void` (sets `path=/; SameSite=Lax; max-age=<days*86400>`)
- `packages/general-components/src/components/modal.tsx` — the `Modal` component, built on the existing `Dialog`/`DialogContent`/`DialogHeader`/`DialogTitle`/`DialogDescription`/`DialogFooter` primitives from `./ui/dialog` (unmodified).

## Props

```ts
type ModalProps = {
  id: string; // cookie key becomes `modal-dismissed-${id}`
  title: string;
  description: string;
  type?: 'confirmation' | 'info'; // default 'info'
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
```

Parent owns `open`/`onOpenChange`, same controlled pattern as the base `Dialog`.

## Behavior

- Cookie key: `` `modal-dismissed-${id}` ``.
- `const dismissed = type === 'confirmation' && Boolean(getCookie(cookieKey))`, computed on render (client-only component; `getCookie` returns `undefined` safely if `document` isn't available).
- Dialog's actual `open` = `open && !dismissed`.
- `useEffect`: if `open === true` and `dismissed`, call `onOpenChange(false)` once (keeps parent state truthful — nothing is silently open).
- Footer renders a single `Button` labeled `OK`. `onClick`:
  1. If `type === 'confirmation'`, `setCookie(cookieKey, '1', 7)`.
  2. `onOpenChange(false)`.
- The `DialogContent` default close affordances (X button, overlay click, Escape) close via `onOpenChange` as normal but do **not** touch the cookie — only the explicit OK button sets it.
- `info` type never reads or writes cookies.

## Non-goals

- No confirm/cancel two-button variant — both types render a single OK button; "confirmation" only describes the cookie behavior, not a yes/no choice.
- No customizable OK label/i18n wiring — out of scope for this component; can be added later if a caller needs it.
- No SSR cookie reading — this is a client-rendered dialog, `getCookie` is called in the browser only.

## Testing

- Component test (Vitest + Testing Library, per `component-testing` skill conventions):
  - `info` type: opens/closes via `onOpenChange`, never writes a cookie.
  - `confirmation` type: clicking OK sets the `modal-dismissed-<id>` cookie and calls `onOpenChange(false)`.
  - `confirmation` type with the cookie already present: effect fires `onOpenChange(false)` and dialog content does not render.
  - Closing via the X button does not set the cookie.
