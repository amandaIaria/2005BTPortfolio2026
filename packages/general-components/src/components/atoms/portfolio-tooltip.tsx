import { cn } from '../../lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import type { PortfolioTooltipContentProps } from '@packages/general-components/src/components/types.ts';

function PortfolioTooltipContent({
  className,
  ...props
}: PortfolioTooltipContentProps) {
  return (
    <TooltipContent
      data-component="portfolio-tooltip-content"
      className={cn('bg-accent text-white', className)}
      {...props}
    />
  );
}

export {
  Tooltip as PortfolioTooltip,
  TooltipTrigger as PortfolioTooltipTrigger,
  TooltipProvider as PortfolioTooltipProvider,
  PortfolioTooltipContent,
};
