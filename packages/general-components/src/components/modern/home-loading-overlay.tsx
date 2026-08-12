import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { WebGLTentacleWall } from '../webgl-tentacle-wall';
import type { HomeLoadingOverlayProps } from '@general-purpose/types';

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
      className="fixed inset-0 z-100 backdrop-blur-2xl"
      initial={{ y: 0 }}
      animate={{ y: exiting ? '100%' : 0 }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      onAnimationComplete={() => {
        if (exiting) onDone();
      }}
    >
      <WebGLTentacleWall
        rotate={-90}
        tentacleCount={6}
        colorValue="var(--color-cyan-500)"
      />
    </motion.div>
  );
}

export { HomeLoadingOverlay };
