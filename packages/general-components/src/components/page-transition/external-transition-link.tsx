import { forwardRef } from 'react';
import { useTransitionLinkClick } from './use-transition-link-click';
import type { ExternalTransitionLinkProps } from '@packages/general-components/src/components/types.ts';

export const ExternalTransitionLink = forwardRef<
  HTMLAnchorElement,
  ExternalTransitionLinkProps
>(function ExternalTransitionLinkImpl(
  { href, children, onClick, ...props },
  forwardedRef,
) {
  const { linkRef, handleClick } = useTransitionLinkClick({
    href,
    external: true,
    onClick,
  });

  return (
    <a
      data-component="external-transition-link"
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
  );
});
