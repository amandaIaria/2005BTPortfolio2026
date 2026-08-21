import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { PortfolioBadge } from '../../atoms/portfolio-badge';

function PortfolioBadgeSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.portfolioBadge.title')}>
      <div className="flex flex-wrap gap-3">
        <PortfolioBadge>{t('sections.portfolioBadge.default')}</PortfolioBadge>
        <PortfolioBadge variant="secondary">
          {t('sections.portfolioBadge.secondary')}
        </PortfolioBadge>
        <PortfolioBadge variant="success">
          {t('sections.portfolioBadge.success')}
        </PortfolioBadge>
        <PortfolioBadge variant="destructive">
          {t('sections.portfolioBadge.destructive')}
        </PortfolioBadge>
        <PortfolioBadge variant="outline">
          {t('sections.portfolioBadge.outline')}
        </PortfolioBadge>
      </div>
    </Section>
  );
}

export { PortfolioBadgeSection };
