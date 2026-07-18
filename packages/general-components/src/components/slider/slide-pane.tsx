import React from 'react';
import type { SliderSlide } from './types';
import { SlideContent } from './slide-content';

export interface SlidePaneProps {
  side: 'left' | 'right';
  slide: SliderSlide;
  isOutgoing?: boolean;
  isTransitioning?: boolean;
  outgoingRef?: React.RefObject<HTMLDivElement>;
}

export function SlidePaneImage({
  slide,
  isOutgoing,
  isTransitioning,
  outgoingRef,
}: Pick<
  SlidePaneProps,
  'slide' | 'isOutgoing' | 'isTransitioning' | 'outgoingRef'
>) {
  return (
    <div
      ref={isOutgoing ? outgoingRef : undefined}
      data-pane="left"
      className="absolute inset-0 w-1/2 h-full @lg:w-1/2 hidden @lg:block"
      aria-hidden={!isOutgoing}
    >
      <div
        data-phase={isOutgoing ? 'outgoing' : 'incoming'}
        className="absolute inset-0 overflow-hidden"
        inert={isTransitioning}
      >
        <img
          src={slide.left.image.src}
          alt={slide.left.image.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export function SlidePaneRight({
  slide,
  isOutgoing,
  isTransitioning,
  outgoingRef,
}: Pick<
  SlidePaneProps,
  'slide' | 'isOutgoing' | 'isTransitioning' | 'outgoingRef'
>) {
  return (
    <div
      ref={isOutgoing ? outgoingRef : undefined}
      data-pane="right"
      className="absolute inset-0 w-full h-full @lg:w-1/2 @lg:left-1/2 bg-white dark:bg-[var(--sand)] flex flex-col p-6 @lg:p-8"
      aria-hidden={isOutgoing}
    >
      <div
        data-phase={isOutgoing ? 'outgoing' : 'incoming'}
        className="absolute inset-0 w-full h-full p-6 @lg:p-8 grid items-center justify-center"
        inert={isTransitioning}
      >
        <SlideContent slide={slide} />
      </div>
    </div>
  );
}

export function SlideMobileImage({
  slide,
  isOutgoing,
  isTransitioning,
}: Pick<SlidePaneProps, 'slide' | 'isOutgoing' | 'isTransitioning'>) {
  return (
    <div className="w-full @lg:hidden aspect-video overflow-hidden">
      <div
        data-phase={isOutgoing ? 'outgoing' : 'incoming'}
        className="absolute inset-0 w-full h-full"
        inert={isTransitioning}
      >
        <img
          src={slide.left.image.src}
          alt={slide.left.image.alt}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
