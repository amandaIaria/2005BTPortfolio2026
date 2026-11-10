import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { ImageModal } from '../../image-modal';

function ImageModalSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.imageModal.title')}>
      <div className="flex flex-wrap gap-8">
        <div className="max-w-[200px]">
          <ImageModal
            src="/placeholder-man.jpg"
            alt={t('sections.imageModal.placeholderAlt')}
            className="rounded-md"
          />
        </div>
        <div className="max-w-[200px]">
          <ImageModal
            variant="compare"
            before={{
              src: '/placeholder-man.jpg',
              alt: t('sections.imageModal.beforeAlt'),
            }}
            after={{
              src: '/temp-header.jpg',
              alt: t('sections.imageModal.afterAlt'),
            }}
            className="rounded-md"
          />
        </div>
      </div>
    </Section>
  );
}

export { ImageModalSection };
