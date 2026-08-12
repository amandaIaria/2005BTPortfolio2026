import { useGlitch } from 'react-powerglitch';
import { cn } from '../lib/utils';
import { useEffect } from 'react';
import { useReducedMotion } from 'motion/react';
import type { GlitchEffectProps } from '@general-purpose/types';

function GlitchEffect({
  children,
  className,
  accessibleLabel,
  playMode = 'always',
  duration,
  glitchTimeSpan = playMode === 'always'
    ? { start: 0.5, end: 0.7 }
    : { start: 0, end: 1 },
  shake,
  slice,
  hideOverflow = false,
}: GlitchEffectProps) {
  const prefersReducedMotion = useReducedMotion();

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

  useEffect(() => {
    if (prefersReducedMotion) {
      glitch.stopGlitch();
    } else {
      glitch.startGlitch();
    }
  }, [prefersReducedMotion, glitch]);

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
