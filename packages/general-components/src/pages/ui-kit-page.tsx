import { useEffect, useRef, useState } from 'react';
import { useActiveSection } from '../hooks/use-active-section';
import { UIKitHeader } from '../components/ui-kit/ui-kit-header';
import { UIKitContent } from '../components/ui-kit/ui-kit-content';
import { UIKitFooter } from '../components/ui-kit/ui-kit-footer';
import { UIKitSticky } from '../components/ui-kit/ui-kit-sticky';
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
    <>
      <main className="relative z-10 max-w-300 w-full mx-auto bg-background text-foreground space-y-10 px-4 pb-16 pt-14">
        <UIKitHeader header={headerObj} />

        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[240px_1fr]">
          <UIKitSticky tocItems={tocItems} activeId={activeId} />

          <UIKitContent ref={contentRef} />
        </div>
      </main>
      <UIKitFooter />
    </>
  );
}
