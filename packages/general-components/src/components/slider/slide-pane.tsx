import { motion } from 'motion/react';
import type { SlidePaneProps } from '@packages/general-components/src/components/types.ts';
import { SlideContent } from './slide-content';

export function SlidePaneImage({
  slide,
  isTransitioning,
  direction,
  variants,
  transition,
}: SlidePaneProps) {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      data-pane="left"
      className="absolute inset-0 w-1/2 h-full hidden md:block"
      inert={isTransitioning}
    >
      <img
        src={slide.left.image.src}
        alt={slide.left.image.alt}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </motion.div>
  );
}

export function SlidePaneRight({
  slide,
  isTransitioning,
  direction,
  variants,
  transition,
}: SlidePaneProps) {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      data-pane="right"
      className="max-w-screen md:max-w-none col-start-1 row-start-1 w-full md:absolute md:inset-0 md:h-full md:w-1/2 md:left-1/2 justify-center items-center bg-white dark:bg-(--sand) flex flex-col p-6 md:p-8 pb-20"
      inert={isTransitioning}
    >
      <SlideContent slide={slide} />
    </motion.div>
  );
}

export function SlideMobileImage({
  slide,
  isTransitioning,
  direction,
  variants,
  transition,
}: SlidePaneProps) {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      className="absolute inset-0 w-full h-full md:hidden"
      inert={isTransitioning}
    >
      <img
        src={slide.left.image.src}
        alt={slide.left.image.alt}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
