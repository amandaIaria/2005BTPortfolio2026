import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { ImageComparison } from '../../image-comparison';

function ImageComparisonSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.imageComparison.title')}>
      <div className="max-w-md">
        <ImageComparison
          before={{
            src: '/placeholder-man.jpg',
            alt: t('sections.imageComparison.beforeAlt'),
          }}
          after={{
            src: '/temp-header.jpg',
            alt: t('sections.imageComparison.afterAlt'),
          }}
          className="aspect-square rounded-md"
        />
      </div>
    </Section>
  );
}

export { ImageComparisonSection };
