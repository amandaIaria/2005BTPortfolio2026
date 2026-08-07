#!/bin/bash
node -e '
const msg = [
  "Portfolio 2026 conventions reminder:",
  "- Stack: React 19 (TS strict) + Vite 7 + Tailwind CSS 4 + TanStack Router (file-based routing in src/routes/).",
  "- Style: no semicolons, single quotes, trailing commas. Functional components via `function` declarations, not arrows.",
  "- Imports: use `@/` alias for src/ imports. Filenames: lowercase kebab-case.",
  "- Every component requires a `data-component` attribute.",
  "- Use design tokens from src/styles.css (--sea-ink, --lagoon, --sand, --surface, etc.) instead of raw colors.",
  "- Never manually edit routeTree.gen.ts.",
  "- Before claiming a task done: run `npm run check` and `npm run test`; verify no console.log or unused code.",
].join("\n")
process.stdout.write(JSON.stringify({hookSpecificOutput:{hookEventName:"SessionStart",additionalContext:msg}}))
'
