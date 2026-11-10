import { cn } from '../../lib/utils';
import { Switch } from '../ui/switch';
import type { PortfolioSwitchProps } from '@packages/general-components/src/components/types.ts';

function PortfolioSwitch({ className, ...props }: PortfolioSwitchProps) {
  return (
    <Switch
      data-component="portfolio-switch"
      className={cn(
        'data-checked:bg-accent data-checked:shadow-[inset_0_-2px_0_0_var(--accent-hover)]',
        className,
      )}
      {...props}
    />
  );
}

export { PortfolioSwitch };
