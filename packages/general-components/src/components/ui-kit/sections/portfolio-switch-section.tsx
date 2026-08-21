import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { PortfolioSwitch } from '../../atoms/portfolio-switch';

function PortfolioSwitchSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.portfolioSwitch.title')}>
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <PortfolioSwitch id="portfolio-switch-default" />
          <label htmlFor="portfolio-switch-default" className="text-sm">
            {t('sections.portfolioSwitch.default')}
          </label>
        </div>
        <div className="flex items-center gap-2">
          <PortfolioSwitch id="portfolio-switch-disabled" disabled />
          <label
            htmlFor="portfolio-switch-disabled"
            className="text-sm text-muted-foreground"
          >
            {t('sections.portfolioSwitch.disabled')}
          </label>
        </div>
      </div>
    </Section>
  );
}

export { PortfolioSwitchSection };
