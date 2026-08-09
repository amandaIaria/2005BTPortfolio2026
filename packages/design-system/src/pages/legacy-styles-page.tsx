import { TempNav, Separator } from '@general/components'

import { ShadowHtml } from '../components/shadow-html'
import { legacyHtml } from './legacy-styles-content'
// @ts-expect-error - Vite's ?inline suffix returns the compiled CSS as a
// string; no type declaration exists for this virtual module shape.
import legacyCss from '../../legacy-bt-scss/_bt.scss?inline'

const materialIconsImport =
  "@import url('https://fonts.googleapis.com/icon?family=Material+Icons');"

export default function LegacyStylesPage() {
  return (
    <main className="max-w-[1200px] w-full mx-auto bg-background text-foreground space-y-10 px-4 pb-16 pt-14">
      <header>
        <TempNav />
      </header>
      <div>
        <p className="island-kicker mb-2">Design System</p>
        <h1 className="display-title text-3xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
          Legacy Styles
        </h1>
        <p className="mt-3 max-w-xl text-[var(--sea-ink-soft)]">
          Rendered from the legacy BT-Design-System SCSS, compiled and
          isolated in a Shadow DOM so its resets can&apos;t affect the rest
          of this site.
        </p>
      </div>
      <Separator />
      <ShadowHtml css={materialIconsImport + legacyCss} html={legacyHtml} />
    </main>
  )
}
