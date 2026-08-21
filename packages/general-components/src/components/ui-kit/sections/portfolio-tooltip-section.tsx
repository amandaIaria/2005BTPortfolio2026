import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import {
  PortfolioTooltip,
  PortfolioTooltipTrigger,
  PortfolioTooltipContent,
} from '../../atoms/portfolio-tooltip';

function PortfolioTooltipSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.portfolioTooltip.title')}>
      <div className="flex flex-wrap gap-4">
        <PortfolioTooltip>
          <PortfolioTooltipTrigger asChild>
            <Button variant="outline">
              {t('sections.portfolioTooltip.hoverMe')}
            </Button>
          </PortfolioTooltipTrigger>
          <PortfolioTooltipContent>
            {t('sections.portfolioTooltip.hoverContent')}
          </PortfolioTooltipContent>
        </PortfolioTooltip>
        <PortfolioTooltip>
          <PortfolioTooltipTrigger asChild>
            <Button variant="secondary">
              {t('sections.portfolioTooltip.withDelay')}
            </Button>
          </PortfolioTooltipTrigger>
          <PortfolioTooltipContent side="bottom">
            {t('sections.portfolioTooltip.delayContent')}
          </PortfolioTooltipContent>
        </PortfolioTooltip>
        <PortfolioTooltip>
          <PortfolioTooltipTrigger asChild>
            <Badge variant="outline" className="cursor-default">
              {t('sections.portfolioTooltip.badgeTooltip')}
            </Badge>
          </PortfolioTooltipTrigger>
          <PortfolioTooltipContent side="right">
            {t('sections.portfolioTooltip.badgeContent')}
          </PortfolioTooltipContent>
        </PortfolioTooltip>
      </div>
    </Section>
  );
}

export { PortfolioTooltipSection };
