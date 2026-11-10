import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useActiveSection } from '../hooks/use-active-section';
import { UIKitShell } from '../components/ui-kit/ui-kit-shell';
import { Section } from '../components/ui-kit/section';
import { Hero } from '../components/ui/hero';
import { PortfolioHero } from '../components/atoms/portfolio-hero';

export default function HerosPage() {
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
    kicker: t('heros.kicker'),
    title: t('heros.title'),
    description: t('heros.description'),
  };

  const heroProps = {
    image: { src: '/placeholder-man.jpg', alt: t('heros.imageAlt') },
    topText: t('heros.topText'),
    bottomText: t('heros.bottomText'),
    caption: t('heros.caption'),
    heading: t('heros.heading'),
    hiddenH1: t('heros.hiddenH1'),
    className: 'relative h-[70vh] w-full',
  };

  return (
    <UIKitShell header={headerObj} tocItems={tocItems} activeId={activeId}>
      <div ref={contentRef} data-component="heros-page" className="space-y-10">
        <Section title={t('heros.heroSectionTitle')}>
          <Hero {...heroProps} />
        </Section>
        <Section title={t('heros.portfolioHeroSectionTitle')}>
          <PortfolioHero {...heroProps} />
        </Section>
      </div>
    </UIKitShell>
  );
}
