import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import type { PortfolioBadgeProps } from '@packages/general-components/src/components/types.ts';

function PortfolioBadge({
  className,
  variant = 'default',
  ...props
}: PortfolioBadgeProps) {
  return (
    <Badge
      data-component="portfolio-badge"
      variant={variant}
      className={cn(
        'font-extrabold uppercase',
        variant === 'default' &&
          'bg-accent text-white shadow-[inset_0_-2px_0_0_var(--accent-hover)]',
        className,
      )}
      {...props}
    />
  );
}

export { PortfolioBadge };
