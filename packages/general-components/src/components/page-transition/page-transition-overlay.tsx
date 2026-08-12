import { motion } from 'motion/react';
import type { PageTransitionOverlayProps } from '@general-purpose/types';

export function PageTransitionOverlay({
  top,
  left,
  width,
  height,
  opacity,
  backgroundColor,
  active,
}: PageTransitionOverlayProps) {
  return (
    <motion.div
      data-component="page-transition-overlay"
      aria-hidden={!active}
      className="fixed isolate z-[60]"
      style={{
        top,
        left,
        width,
        height,
        opacity,
        backgroundColor,
        pointerEvents: active ? 'auto' : 'none',
      }}
    />
  );
}
