import { useCallback, useState } from 'react';
import { ShadowHtml } from '../components/shadow-html';
import { legacyHtml } from './legacy-styles-content';
import legacyCss from '../../../design-system/legacy-bt-scss/_bt.scss?inline';
import { UIKitShell } from '../components/ui-kit/ui-kit-shell';
import { useTranslation } from 'react-i18next';
import { useActiveSection } from '../hooks/use-active-section';

const materialIconsImport =
  "@import url('https://fonts.googleapis.com/icon?family=Material+Icons');";

const legacyBaseStyles = `:host { font-size: 16px; line-height: 24px; font-family: 'Open Sans', sans-serif; color: #333333; }`;

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// CSS drops any @import that lands after a non-import rule. legacyCss is NOT
// import-free - Vite hoists its own leading remote @import (the legacy
// design's Open Sans/Roboto Slab Google Fonts URL) to the very start of the
// compiled string. Both @imports (materialIconsImport and legacyCss's own)
// must stay contiguous at the top; legacyBaseStyles (a plain rule, not an
// @import) must come last. This exact bug has recurred multiple times in
// this codebase - reorder with care.

export default function LegacyStylesPage() {
  const { t } = useTranslation('uiKit');
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);
  const [tocItems, setTocItems] = useState<{ id: string; title: string }[]>([]);

  const handleShadowReady = useCallback((root: ShadowRoot) => {
    const headings = Array.from(root.querySelectorAll('h2'));
    setTocItems(
      headings.map((heading) => {
        const title = heading.textContent;
        const id = slugify(title);
        heading.id = id;
        return { id, title };
      }),
    );
    setShadowRoot(root);
  }, []);

  const activeId = useActiveSection(
    tocItems.map((item) => item.id),
    shadowRoot ?? document,
  );

  const handleNavClick = (event: React.MouseEvent<HTMLElement>) => {
    const anchor = (event.target as HTMLElement).closest('a[href^="#"]');
    const id = anchor?.getAttribute('href')?.slice(1);
    const target = id && shadowRoot?.querySelector(`#${CSS.escape(id)}`);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const headerObj = {
    kicker: t('legacyStyles.kicker'),
    title: t('legacyStyles.title'),
    description: t('legacyStyles.description'),
  };

  return (
    <UIKitShell
      header={headerObj}
      tocItems={tocItems}
      activeId={activeId}
      onNavClick={handleNavClick}
    >
      <ShadowHtml
        css={materialIconsImport + legacyCss + legacyBaseStyles}
        html={legacyHtml}
        onReady={handleShadowReady}
      />
    </UIKitShell>
  );
}
