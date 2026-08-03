import { useRef } from 'react';
import type { MouseEvent } from 'react';
import { usePageTransition } from './page-transition-context';

interface UseTransitionLinkClickOptions {
  href: string;
  external?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export function useTransitionLinkClick({
  href,
  external,
  onClick,
}: UseTransitionLinkClickOptions) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { startTransition } = usePageTransition();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || !linkRef.current) return;
    event.preventDefault();
    startTransition({
      rect: linkRef.current.getBoundingClientRect(),
      href,
      backgroundColor: 'var(--color-accent)',
      external,
    });
  }

  return { linkRef, handleClick };
}
