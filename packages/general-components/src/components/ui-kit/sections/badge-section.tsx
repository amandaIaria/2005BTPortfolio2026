import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { Badge } from '../../ui/badge';

function BadgeSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.badge.title')}>
      <div className="flex flex-wrap gap-3">
        <Badge>{t('sections.badge.default')}</Badge>
        <Badge variant="secondary">{t('sections.badge.secondary')}</Badge>
        <Badge variant="destructive">{t('sections.badge.destructive')}</Badge>
        <Badge variant="outline">{t('sections.badge.outline')}</Badge>
      </div>
    </Section>
  );
}

export { BadgeSection };
