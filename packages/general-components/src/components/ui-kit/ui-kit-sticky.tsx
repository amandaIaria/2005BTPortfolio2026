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
      className={cn(
        'flex flex-row gap-4 overflow-x-auto whitespace-nowrap pb-2 md:flex-col md:gap-1 md:overflow-visible md:whitespace-normal md:pb-0',
        className,
      )}
      {...props}
    >
      {tocItems.map(({ id, title }) => (
        <a
          key={id}
          href={`#${id}`}
          className={cn(
            'shrink-0 border-b-2 py-1 text-sm transition-colors md:border-b-0 md:border-l-2 md:pl-4',
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
