import { createContext, useContext } from 'react';

export interface StartTransitionOptions {
  rect: DOMRect;
  href: string;
  backgroundColor: string;
  external?: boolean;
}

export interface PageTransitionContextValue {
  startTransition: (options: StartTransitionOptions) => void;
  isTransitioning: boolean;
}

export const PageTransitionContext =
  createContext<PageTransitionContextValue | null>(null);

export function usePageTransition(): PageTransitionContextValue {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error(
      'usePageTransition must be used within a PageTransitionProvider',
    );
  }
  return ctx;
}
