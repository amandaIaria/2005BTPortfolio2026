import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { Separator } from '../../ui/separator';

function SeparatorSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.separator.title')}>
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-sm text-[var(--sea-ink-soft)]">
            {t('sections.separator.horizontalLabel')}
          </p>
          <Separator />
        </div>
        <div className="flex h-8 items-center gap-4">
          <span className="text-sm">{t('sections.separator.itemA')}</span>
          <Separator orientation="vertical" />
          <span className="text-sm">{t('sections.separator.itemB')}</span>
          <Separator orientation="vertical" />
          <span className="text-sm">{t('sections.separator.itemC')}</span>
        </div>
      </div>
    </Section>
  );
}

export { SeparatorSection };
