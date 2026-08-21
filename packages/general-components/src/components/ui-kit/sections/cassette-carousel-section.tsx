import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { CassetteCarousel } from '../../2005/cassette-carousel';

function CassetteCarouselSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.cassetteCarousel.title')}>
      <div className="space-y-6">
        <div>
          <p className="mb-2 text-sm text-[var(--sea-ink-soft)]">
            {t('sections.cassetteCarousel.horizontalLabel')}
          </p>
          <CassetteCarousel
            slides={[
              {
                id: '1',
                label: t('sections.cassetteCarousel.sideALabel'),
                sublabel: t('sections.cassetteCarousel.sideASublabel'),
                modalContent: (
                  <p>{t('sections.cassetteCarousel.sideAContent')}</p>
                ),
              },
              {
                id: '2',
                label: t('sections.cassetteCarousel.sideBLabel'),
                sublabel: t('sections.cassetteCarousel.sideBSublabel'),
                modalContent: (
                  <p>{t('sections.cassetteCarousel.sideBContent')}</p>
                ),
              },
              {
                id: '3',
                label: t('sections.cassetteCarousel.demoLabel'),
                sublabel: t('sections.cassetteCarousel.demoSublabel'),
                modalContent: (
                  <p>{t('sections.cassetteCarousel.demoContent')}</p>
                ),
              },
              {
                id: '4',
                label: t('sections.cassetteCarousel.loFiLabel'),
                sublabel: t('sections.cassetteCarousel.loFiSublabel'),
                modalContent: (
                  <p>{t('sections.cassetteCarousel.loFiContent')}</p>
                ),
              },
            ]}
          />
        </div>
        <div>
          <p className="mb-2 text-sm text-[var(--sea-ink-soft)]">
            {t('sections.cassetteCarousel.verticalLabel')}
          </p>
          <CassetteCarousel
            orientation="vertical"
            className="h-64"
            slides={[
              {
                id: '1',
                label: t('sections.cassetteCarousel.track1Label'),
                sublabel: t('sections.cassetteCarousel.track1Sublabel'),
              },
              {
                id: '2',
                label: t('sections.cassetteCarousel.track2Label'),
                sublabel: t('sections.cassetteCarousel.track2Sublabel'),
              },
              {
                id: '3',
                label: t('sections.cassetteCarousel.track3Label'),
                sublabel: t('sections.cassetteCarousel.track3Sublabel'),
              },
            ]}
          />
        </div>
      </div>
    </Section>
  );
}

export { CassetteCarouselSection };
