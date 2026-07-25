import { animate, useMotionValue, useReducedMotion } from 'motion/react';
import { useCallback, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  PageTransitionContext,
  type StartTransitionOptions,
} from './page-transition-context';
import { PageTransitionOverlay } from './page-transition-overlay';

const GROW_TRANSITION = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };
const FADE_TRANSITION = { duration: 0.35, ease: 'easeInOut' as const };

function waitForNextPaint(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

interface PageTransitionProviderProps {
  children: ReactNode;
}

export function PageTransitionProvider({
  children,
}: PageTransitionProviderProps) {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const top = useMotionValue(0);
  const left = useMotionValue(0);
  const width = useMotionValue(0);
  const height = useMotionValue(0);
  const opacity = useMotionValue(0);
  const [backgroundColor, setBackgroundColor] = useState('#000');
  const [active, setActive] = useState(false);
  const isRunningRef = useRef(false);

  const startTransition = useCallback(
    async ({ rect, href, backgroundColor: bg }: StartTransitionOptions) => {
      if (isRunningRef.current) return;
      isRunningRef.current = true;
      setBackgroundColor(bg);

      if (shouldReduceMotion) {
        navigate({ to: href });
        isRunningRef.current = false;
        return;
      }

      setActive(true);
      top.set(rect.top);
      left.set(rect.left);
      width.set(rect.width);
      height.set(rect.height);
      opacity.set(1);

      await Promise.all([
        animate(top, 0, GROW_TRANSITION),
        animate(left, 0, GROW_TRANSITION),
        animate(width, window.innerWidth, GROW_TRANSITION),
        animate(height, window.innerHeight, GROW_TRANSITION),
      ]);

      navigate({ to: href });

      await waitForNextPaint();

      await animate(opacity, 0, FADE_TRANSITION);
      setActive(false);
      isRunningRef.current = false;
    },
    [navigate, shouldReduceMotion, top, left, width, height, opacity]
  );

  return (
    <PageTransitionContext.Provider
      value={{ startTransition, isTransitioning: active }}
    >
      {children}
      <PageTransitionOverlay
        top={top}
        left={left}
        width={width}
        height={height}
        opacity={opacity}
        backgroundColor={backgroundColor}
        active={active}
      />
    </PageTransitionContext.Provider>
  );
}
