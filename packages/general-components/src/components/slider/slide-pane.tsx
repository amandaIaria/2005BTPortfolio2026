import { motion } from 'motion/react';
import type { SlidePaneProps } from '@general-purpose/types';
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
      className="absolute inset-0 w-1/2 h-full @lg:w-1/2 hidden @lg:block"
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
      className="absolute inset-0 w-full h-full @lg:w-1/2 @lg:left-1/2 justify-center items-center bg-white dark:bg-(--sand) flex flex-col p-6 @lg:p-8"
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
      className="absolute inset-0 w-full h-full @lg:hidden"
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
