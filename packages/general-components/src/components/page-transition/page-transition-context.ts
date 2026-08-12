import { createContext, useContext } from 'react';
import type { PageTransitionContextValueProps } from '@general-purpose/types';

export const PageTransitionContext =
  createContext<PageTransitionContextValueProps | null>(null);

export function usePageTransition(): PageTransitionContextValueProps {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error(
      'usePageTransition must be used within a PageTransitionProvider',
    );
  }
  return ctx;
}
