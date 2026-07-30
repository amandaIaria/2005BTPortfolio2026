import { motion } from 'motion/react';
import type { MotionValue } from 'motion/react';

interface PageTransitionOverlayProps {
  top: MotionValue<number>;
  left: MotionValue<number>;
  width: MotionValue<number>;
  height: MotionValue<number>;
  opacity: MotionValue<number>;
  backgroundColor: string;
  active: boolean;
}

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
