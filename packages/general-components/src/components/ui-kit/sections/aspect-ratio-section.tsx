import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { AspectRatio } from '../../ui/aspect-ratio';

function AspectRatioSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.aspectRatio.title')}>
      <div className="w-full max-w-md">
        <AspectRatio ratio={16 / 9}>
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-[var(--lagoon)]/10 text-[var(--lagoon-deep)]">
            {t('sections.aspectRatio.label')}
          </div>
        </AspectRatio>
      </div>
    </Section>
  );
}

export { AspectRatioSection };
