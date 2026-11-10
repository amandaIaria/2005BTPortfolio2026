import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useActiveSection } from '../hooks/use-active-section';
import { UIKitShell } from '../components/ui-kit/ui-kit-shell';
import { WebGLTentacleWall } from '../components/webgl-tentacle-wall';
import { Section } from '../components/ui-kit/section';

export default function WebGLTentacleFooterPage() {
  const { t } = useTranslation('uiKit');
  const contentRef = useRef<HTMLDivElement>(null);
  const [tocItems, setTocItems] = useState<{ id: string; title: string }[]>([]);

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

  const activeId = useActiveSection(tocItems.map((item) => item.id));

  const headerObj = {
    kicker: t('webglTentacleFooter.kicker'),
    title: t('webglTentacleFooter.title'),
    description: t('webglTentacleFooter.description'),
  };

  return (
    <UIKitShell header={headerObj} tocItems={tocItems} activeId={activeId}>
      <div ref={contentRef} data-component="webgl-tentacle-footer-page">
        {/* h2/description only - WebGLTentacleWall stays outside Section's
          bordered/padded box so it can render full-bleed 100vh x 100vw */}
        <Section
          title={t('webglTentacleFooter.wallHeading')}
          className="overflow-hidden"
        >
          <WebGLTentacleWall tentacleCount={6} />
        </Section>
      </div>
    </UIKitShell>
  );
}
