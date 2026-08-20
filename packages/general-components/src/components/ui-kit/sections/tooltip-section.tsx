import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tooltip, TooltipTrigger, TooltipContent } from '../../ui/tooltip';

function TooltipSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.tooltip.title')}>
      <div className="flex flex-wrap gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">{t('sections.tooltip.hoverMe')}</Button>
          </TooltipTrigger>
          <TooltipContent>{t('sections.tooltip.hoverContent')}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary">
              {t('sections.tooltip.withDelay')}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {t('sections.tooltip.delayContent')}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="outline" className="cursor-default">
              {t('sections.tooltip.badgeTooltip')}
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="right">
            {t('sections.tooltip.badgeContent')}
          </TooltipContent>
        </Tooltip>
      </div>
    </Section>
  );
}

export { TooltipSection };
