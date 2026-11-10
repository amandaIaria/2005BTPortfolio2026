import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { PortfolioSeparator } from '../../atoms/portfolio-separator';

function PortfolioSeparatorSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.portfolioSeparator.title')}>
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-sm text-[var(--sea-ink-soft)]">
            {t('sections.portfolioSeparator.horizontalLabel')}
          </p>
          <PortfolioSeparator />
        </div>
        <div className="flex h-8 items-center gap-4">
          <span className="text-sm">
            {t('sections.portfolioSeparator.itemA')}
          </span>
          <PortfolioSeparator orientation="vertical" />
          <span className="text-sm">
            {t('sections.portfolioSeparator.itemB')}
          </span>
          <PortfolioSeparator orientation="vertical" />
          <span className="text-sm">
            {t('sections.portfolioSeparator.itemC')}
          </span>
        </div>
      </div>
    </Section>
  );
}

export { PortfolioSeparatorSection };
