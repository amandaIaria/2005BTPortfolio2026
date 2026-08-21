import { forwardRef } from 'react';
import { useTransitionLinkClick } from './use-transition-link-click';
import { PortfolioButton } from '../atoms/portfolio-button';
import type { InternalTransitionLinkProps } from '@packages/general-components/src/components/types.ts';

export const InternalTransitionLink = forwardRef<
  HTMLAnchorElement,
  InternalTransitionLinkProps
>(function InternalTransitionLinkImpl(
  { href, children, onClick, className, ...props },
  forwardedRef,
) {
  const { linkRef, handleClick } = useTransitionLinkClick({
    href,
    external: false,
    onClick,
  });

  return (
    <PortfolioButton asChild variant="link" className={className}>
      <a
        data-component="internal-transition-link"
        ref={(node) => {
          linkRef.current = node;
          if (typeof forwardedRef === 'function') forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        href={href}
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    </PortfolioButton>
  );
});
