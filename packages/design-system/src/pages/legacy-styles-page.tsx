import { TempNav, Separator } from '@general/components';

import { ShadowHtml } from '../components/shadow-html';
import { legacyHtml } from './legacy-styles-content';
import legacyCss from '../../legacy-bt-scss/_bt.scss?inline';

const materialIconsImport =
  "@import url('https://fonts.googleapis.com/icon?family=Material+Icons');";

const legacyBaseStyles = `:host { font-size: 16px; line-height: 24px; font-family: 'Open Sans', sans-serif; color: #333333; }`;

// CSS drops any @import that lands after a non-import rule. legacyCss is NOT
// import-free - Vite hoists its own leading remote @import (the legacy
// design's Open Sans/Roboto Slab Google Fonts URL) to the very start of the
// compiled string. Both @imports (materialIconsImport and legacyCss's own)
// must stay contiguous at the top; legacyBaseStyles (a plain rule, not an
// @import) must come last. This exact bug has recurred multiple times in
// this codebase - reorder with care.

export default function LegacyStylesPage() {
  return (
    <main className="max-w-[1200px] w-full mx-auto bg-background text-foreground space-y-10 px-4 pb-16 pt-14">
      <header>
        <TempNav />
      </header>
      <div>
        <p className="island-kicker mb-2">Design System</p>
        <h1 className="display-title text-3xl tracking-tight text-accent md:text-5xl">
          Legacy Styles
        </h1>
        <p className="mt-3 max-w-xl text-[var(--sea-ink-soft)]">
          Rendered from the legacy BT-Design-System SCSS, compiled and isolated
          in a Shadow DOM so its resets can&apos;t affect the rest of this site.
        </p>
      </div>
      <Separator />
      <ShadowHtml
        css={materialIconsImport + legacyCss + legacyBaseStyles}
        html={legacyHtml}
      />
    </main>
  );
}
