import { cn } from '../../lib/utils';
import { Separator } from '../ui/separator';
import type { PortfolioSeparatorProps } from '@packages/general-components/src/components/types.ts';

function PortfolioSeparator({
  className,
  orientation = 'horizontal',
  ...props
}: PortfolioSeparatorProps) {
  return (
    <Separator
      data-component="portfolio-separator"
      orientation={orientation}
      className={cn(
        'bg-accent data-horizontal:h-0.5 data-vertical:w-0.5',
        className,
      )}
      {...props}
    />
  );
}

export { PortfolioSeparator };
