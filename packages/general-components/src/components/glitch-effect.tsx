import { useGlitch } from 'react-powerglitch';
import { cn } from '@general/lib/utils';
import type { ReactNode } from 'react';

export interface GlitchEffectProps {
  children: ReactNode;
  className?: string;
  /** 'always' runs continuously, 'hover'/'click' wait for interaction. Default 'always'. */
  playMode?: 'always' | 'hover' | 'click';
  /** Duration of one glitch loop in ms. Default 2000. */
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
  };
  /** Clips the glitch animation to this element's bounds. Default false. */
  hideOverflow?: boolean;
}

function GlitchEffect({
  children,
  className,
  playMode = 'always',
  duration = 2000,
  glitchTimeSpan = { start: 0.5, end: 0.7 },
  shake,
  slice,
  hideOverflow = false,
}: GlitchEffectProps) {
  const glitch = useGlitch({
    playMode,
    hideOverflow,
    timing: { duration, iterations: Infinity },
    glitchTimeSpan,
    shake,
    slice,
  });

  return (
    <div
      ref={glitch.ref}
      data-component="glitch-effect"
      className={cn(className)}
    >
      {children}
    </div>
  );
}

export { GlitchEffect };
