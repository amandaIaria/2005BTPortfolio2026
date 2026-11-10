import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { AnimatedTitle } from '../../2005/animated-title';

function AnimatedTitleSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.animatedTitle.title')}>
      <div className="space-y-6">
        <AnimatedTitle className="text-2xl">
          {t('sections.animatedTitle.hover')}
        </AnimatedTitle>
        <AnimatedTitle className="text-3xl font-bold">
          {t('sections.animatedTitle.large')}
        </AnimatedTitle>
        <AnimatedTitle className="text-xl">
          {t('sections.animatedTitle.small')}
        </AnimatedTitle>
      </div>
    </Section>
  );
}

export { AnimatedTitleSection };
