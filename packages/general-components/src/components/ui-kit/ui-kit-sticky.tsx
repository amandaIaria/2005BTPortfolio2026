import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface UIKitStickyProps extends React.HTMLAttributes<HTMLElement> {
  tocItems: { id: string; title: string }[];
  activeId: string | null;
}

const UIKitSticky = forwardRef<HTMLElement, UIKitStickyProps>(
  ({ tocItems, activeId, className, ...props }, ref) => (
    <nav
      ref={ref}
      data-component="ui-kit-sticky"
      className={cn('sticky top-10 flex flex-col gap-1', className)}
      {...props}
    >
      {tocItems.map(({ id, title }) => (
        <a
          key={id}
          href={`#${id}`}
          className={cn(
            'border-l-2 py-1 pl-4 text-sm transition-colors',
            id === activeId
              ? 'border-accent font-semibold text-[var(--sea-ink)]'
              : 'border-transparent text-[var(--sea-ink-soft)] hover:text-[var(--sea-ink)]',
          )}
        >
          {title}
        </a>
      ))}
    </nav>
  ),
);
UIKitSticky.displayName = 'UIKitSticky';

export { UIKitSticky };
