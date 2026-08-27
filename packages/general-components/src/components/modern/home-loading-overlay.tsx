import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { WebGLTentacleWall } from '../webgl-tentacle-wall';
import type { HomeLoadingOverlayProps } from '@packages/general-components/src/components/types.ts';

const MIN_DISPLAY_MS = 1200;

function HomeLoadingOverlay({ onDone }: HomeLoadingOverlayProps) {
  const shouldReduceMotion = useReducedMotion();
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      onDone();
      return;
    }

    const start = performance.now();

    function finish() {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);
      setTimeout(() => setExiting(true), wait);
    }

    if (document.readyState === 'complete') {
      finish();
      return;
    }

    window.addEventListener('load', finish, { once: true });
    return () => window.removeEventListener('load', finish);
  }, [shouldReduceMotion, onDone]);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      data-component="home-loading-overlay"
      className="hidden md:fixed w-screen h-screen inset-0 z-100 overflow-hidden backdrop-blur-2xl [&_[data-component='webgl-tentacle-wall']]:absolute! [&_[data-component='webgl-tentacle-wall']]:bottom-0!"
      initial={{ y: 0 }}
      animate={{ y: exiting ? '100%' : 0 }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      onAnimationComplete={() => {
        if (exiting) onDone();
      }}
    >
      <div className="bg-white/20 h-screen w-screen absolute inset-0"></div>
      <WebGLTentacleWall
        inFooter={true}
        tentacleCount={6}
        colorValue="transparent"
      />
    </motion.div>
  );
}

export { HomeLoadingOverlay };
