import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import type { PortfolioBadgeProps } from '@packages/general-components/src/components/types.ts';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

const portfolioBadgeVariants = cva(
  "",
  {
    variants: {
      variant: {
        default:
          'bg-accent text-white shadow-[inset_0_-2px_0_0_var(--accent-hover)]',
        secondary:
          'bg-secondary text-secondary-foreground',
        success: 'bg-success text-foreground',
        destructive:
          'bg-error text-white focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20',
        outline:
          'border-accent text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
        ghost:
          'hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function PortfolioBadge({
  className,
  variant = 'default',
  ...props
}: PortfolioBadgeProps &
  VariantProps<typeof portfolioBadgeVariants>) {
  return (
    <Badge
      data-component="portfolio-badge"
      variant={variant}
      className={cn(portfolioBadgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export { PortfolioBadge };
