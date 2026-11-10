import { useEffect, useRef, useState } from 'react';
import { useActiveSection } from '../hooks/use-active-section';
import { UIKitContent } from '../components/ui-kit/ui-kit-content';
import { UIKitShell } from '../components/ui-kit/ui-kit-shell';
import { useTranslation } from 'react-i18next';

export default function UiKitPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [tocItems, setTocItems] = useState<{ id: string; title: string }[]>([]);
  const { t } = useTranslation('uiKit');
  useEffect(() => {
    const sections = contentRef.current?.querySelectorAll('section[id]');
    if (!sections) return;
    setTocItems(
      Array.from(sections).map((section) => ({
        id: section.id,
        title: section.querySelector('h2')?.textContent ?? section.id,
      })),
    );
  }, []);

  const headerObj = {
    kicker: t('page.kicker'),
    title: t('page.title'),
    descriptionBefore: t('page.descriptionBefore'),
    descriptionCode: t('page.descriptionCode'),
    descriptionAfter: t('page.descriptionAfter'),
  };

  const activeId = useActiveSection(tocItems.map((item) => item.id));

  return (
    <UIKitShell header={headerObj} tocItems={tocItems} activeId={activeId}>
      <UIKitContent ref={contentRef} />
    </UIKitShell>
  );
}
