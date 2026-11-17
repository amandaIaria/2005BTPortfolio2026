import { useEffect, useRef, useState } from 'react';
import { useActiveSection } from '../hooks/use-active-section';
import { UIKitContent } from '../components/ui-kit/ui-kit-content';
import { UIKitShell } from '../components/ui-kit/ui-kit-shell';
import { useTranslation } from 'react-i18next';
import { useUIkitNavigation } from '../hooks/use-uikit-navigation';

export default function UiKitPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation('uiKit');
  const {activeId, tocItems} = useUIkitNavigation(contentRef);

  const headerObj = {
    kicker: t('page.kicker'),
    title: t('page.title'),
    descriptionBefore: t('page.descriptionBefore'),
    descriptionCode: t('page.descriptionCode'),
    descriptionAfter: t('page.descriptionAfter'),
  };

  

  return (
    <UIKitShell header={headerObj} tocItems={tocItems} activeId={activeId}>
      <UIKitContent ref={contentRef} />
    </UIKitShell>
  );
}
