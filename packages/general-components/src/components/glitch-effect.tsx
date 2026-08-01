import { useGlitch } from 'react-powerglitch';
import { cn } from '@general/lib/utils';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export interface GlitchEffectProps {
  children: ReactNode;
  className?: string;
  /**
   * Screen-reader-only label announced in place of the glitched content.
   * The glitch wrapper is marked `aria-hidden` because powerglitch clones
   * its children internally (1 shake layer + slice layers) to build the
   * visual effect, so without this, assistive tech would announce the
   * content multiple times over due to that DOM cloning.
   */
  accessibleLabel?: string;
  /** 'always' runs continuously, 'hover'/'click' wait for interaction. Default 'always'. */
  playMode?: 'always' | 'hover' | 'click';
  /** Duration of one glitch loop in ms. Default 2000 for 'always'; library default (250ms) for 'hover'/'click' unless explicitly set. */
  duration?: number;
  /** Restricts the glitch to a fraction (0-1) of the loop, peaking at the midpoint. Default { start: 0.5, end: 0.7 }. Pass false to glitch uniformly across the whole loop. */
  glitchTimeSpan?: { start: number; end: number } | false;
  /** Jitter animation. Pass false to disable. Omit to use the library default. */
  shake?:
    | {
        velocity?: number;
        amplitudeX?: number;
        amplitudeY?: number;
      }
    | false;
  /** Horizontal slice-clip distortion. Omit to use the library default. */
  slice?: {
    count?: number;
    velocity?: number;
    minHeight?: number;
    maxHeight?: number;
    hueRotate?: boolean;
    /** Custom CSS filter(s) applied to glitch layers. Setting this disables hueRotate. */
    cssFilters?: string;
  };
  /** Clips the glitch animation to this element's bounds. Default false. */
  hideOverflow?: boolean;
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

function GlitchEffect({
  children,
  className,
  accessibleLabel,
  playMode = 'always',
  duration,
  glitchTimeSpan = { start: 0.5, end: 0.7 },
  shake,
  slice,
  hideOverflow = false,
}: GlitchEffectProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const glitch = useGlitch({
    playMode,
    hideOverflow,
    timing: {
      ...(duration !== undefined || playMode === 'always'
        ? { duration: duration ?? 2000 }
        : {}),
      iterations: playMode === 'always' ? Infinity : 1,
    },
    glitchTimeSpan,
    shake,
    slice,
  });

  if (prefersReducedMotion) {
    return (
      <div data-component="glitch-effect" className={cn(className)}>
        {children}
      </div>
    );
  }

  return (
    <>
      {accessibleLabel && <span className="sr-only">{accessibleLabel}</span>}
      <div
        ref={glitch.ref}
        data-component="glitch-effect"
        aria-hidden="true"
        className={cn(className)}
      >
        {children}
      </div>
    </>
  );
}

export { GlitchEffect };
