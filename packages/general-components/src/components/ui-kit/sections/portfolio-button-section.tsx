import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { PortfolioButton } from '../../atoms/portfolio-button';

function PortfolioButtonSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.portfolioButton.title')}>
      <div className="flex flex-wrap gap-3">
        <PortfolioButton>
          {t('sections.portfolioButton.default')}
        </PortfolioButton>
        <PortfolioButton variant="secondary">
          {t('sections.portfolioButton.secondary')}
        </PortfolioButton>
        <PortfolioButton variant="outline">
          {t('sections.portfolioButton.outline')}
        </PortfolioButton>
        <PortfolioButton variant="ghost">
          {t('sections.portfolioButton.ghost')}
        </PortfolioButton>
        <PortfolioButton variant="destructive">
          {t('sections.portfolioButton.destructive')}
        </PortfolioButton>
        <PortfolioButton variant="link">
          {t('sections.portfolioButton.link')}
        </PortfolioButton>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <PortfolioButton size="xs">
          {t('sections.portfolioButton.extraSmall')}
        </PortfolioButton>
        <PortfolioButton size="sm">
          {t('sections.portfolioButton.small')}
        </PortfolioButton>
        <PortfolioButton size="default">
          {t('sections.portfolioButton.default')}
        </PortfolioButton>
        <PortfolioButton size="lg">
          {t('sections.portfolioButton.large')}
        </PortfolioButton>
        <PortfolioButton disabled>
          {t('sections.portfolioButton.disabled')}
        </PortfolioButton>
      </div>
    </Section>
  );
}

export { PortfolioButtonSection };
