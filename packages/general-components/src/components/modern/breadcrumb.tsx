import { ArrowDownIcon } from '@phosphor-icons/react';
import { cn } from '../../lib/utils';
import { InternalTransitionLink } from '../page-transition/internal-transition-link';
import type { BreadcrumbProps } from '@packages/general-components/src/components/types.ts';

function Breadcrumb({ href, label, className, ...props }: BreadcrumbProps) {
  return (
    <div
      data-component="breadcrumb"
      className={cn('flex items-center gap-4 pb-0 md:pb-20 w-full', className)}
      {...props}
    >
      <InternalTransitionLink
        href={href}
        className="flex gap-2 cursor w-fit text-sm group ease-in-out duration-300"
      >
        <span className="flex items-center">
          <ArrowDownIcon
            weight="bold"
            aria-hidden="true"
            className="text-accent h-4 w-4 rotate-90 group-hover:-translate-x-2 ease-in-out duration-300"
          />
        </span>
        <span className="text-white dark:text-foreground group-hover:border-b-accent border-b-transparent font-bold ease-in-out duration-300 pb-1 border-b-2 mt-1">
          {label}
        </span>
      </InternalTransitionLink>
      <div className="flex-1 h-px bg-accent" />
    </div>
  );
}

export { Breadcrumb };
