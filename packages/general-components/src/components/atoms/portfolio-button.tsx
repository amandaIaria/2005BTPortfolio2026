import * as React from 'react';
import { cva } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../lib/utils';
import type { PortfolioButtonProps } from '@packages/general-components/src/components/types.ts';

const portfolioButtonVariants = cva(
  'cursor-pointer transition-colors duration-300 ease-in-out disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'dark:shadow-[inset_0_-4px_0_0_#ffffff)] border-transparent bg-accent font-extrabold text-white uppercase shadow-[inset_0_-4px_0_0_var(--flat-black)] transition-[box-shadow,transform] hover:bg-accent-hover active:translate-y-1 active:shadow-none dark:active:shadow-none focus-visible:ring-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent-hover focus-visible:outline-offset-8',
        outline:
          'border border-accent text-accent hover:bg-accent-hover hover:text-white',
        secondary:
          'dark:shadow-[inset_0_-4px_0_0_#ffffff] shadow-[inset_0_-4px_0_0_#000000] dark:border-white border border-black text-secondary-foreground hover:bg-secondary-foreground/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground hover:text-white active:translate-y-1 active:shadow-none',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-error text-white hover:bg-error/20 focus-visible:border-error/40 focus-visible:ring-error/20 dark:bg-error/20 dark:hover:bg-error/30 dark:focus-visible:ring-error/40',
        link: 'group text-foreground group-button [&_span]:border-b-transparent [&_span]:pb-2 [&_span]:border-b  [&_span]:hover:border-b-accent focus-visible:ring-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-8 hover:!no-underline',
      },
      size: {
        default:
          'h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "text-xs h-6 gap-1 px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "text-sm font-medium h-7 gap-1 px-2.5 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-16 text-lg gap-1.5 px-6 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 grid items-center [&_svg:not([class*="size-"])]:size-5',
        xl: 'h-20 text-xl px-8',
        icon: 'size-8',
        'icon-xs': "size-6 [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-7',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const PortfolioButton = React.forwardRef<
  HTMLButtonElement,
  PortfolioButtonProps
>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot.Root : 'button';

    return (
      <Comp
        ref={ref}
        data-component="portfolio-button"
        data-variant={variant}
        data-size={size}
        className={cn(portfolioButtonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);

PortfolioButton.displayName = 'PortfolioButton';

export { PortfolioButton, portfolioButtonVariants };
