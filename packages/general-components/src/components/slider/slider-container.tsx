import { forwardRef, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, useReducedMotion, cubicBezier } from 'motion/react';
import type { Variants, Transition } from 'motion/react';
import { cn } from '../../lib/utils';
import { useSlider } from '../../hooks/use-slider';
import { SlidePaneImage, SlidePaneRight, SlideMobileImage } from './slide-pane';
import { SliderPagination } from './slider-pagination';
import type { SliderProps } from '@packages/general-components/src/components/types.ts';
import { SliderMiddle } from './slide-middle';

const SliderContainer = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      slides,
      initialIndex = 0,
      loop = true,
      ariaLabel = 'Slides',
      onSlideChange,
      className,
      ...props
    },
    ref,
  ) => {
    const {
      index,
      direction,
      isTransitioning,
      next,
      prev,
      goTo,
      onTransitionSettled,
      isFirst,
      isLast,
    } = useSlider({
      count: slides.length,
      initialIndex,
      loop,
      onChange: onSlideChange,
    });

    const dotsTrackRef = useRef<HTMLDivElement | null>(null);
    const dotsInnerRef = useRef<HTMLDivElement | null>(null);
    const swipeStartRef = useRef({ x: 0, y: 0 });

    const shouldReduceMotion = useReducedMotion();

    const PANE_EASE = cubicBezier(0.4, 0, 0.2, 1);
    const paneTransition: Transition = shouldReduceMotion
      ? { duration: 0.15, ease: 'easeInOut' }
      : { duration: 0.5, ease: PANE_EASE };

    const leftPaneVariants: Variants = shouldReduceMotion
      ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
      : {
          enter: (dir: 1 | -1) => ({
            y: dir > 0 ? '100%' : '-100%',
          }),
          center: { y: '0%' },
          exit: (dir: 1 | -1) => ({
            y: dir > 0 ? '-100%' : '100%',
          }),
        };

    const rightPaneVariants: Variants = shouldReduceMotion
      ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
      : {
          enter: (dir: 1 | -1) => ({
            y: dir > 0 ? '-100%' : '100%',
          }),
          center: { y: '0%' },
          exit: (dir: 1 | -1) => ({
            y: dir > 0 ? '100%' : '-100%',
          }),
        };

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          next();
        }
      },
      [prev, next],
    );

    useEffect(() => {
      if (!dotsTrackRef.current || !dotsInnerRef.current) return;

      const track = dotsTrackRef.current;
      const inner = dotsInnerRef.current;
      const trackRect = track.getBoundingClientRect();
      const dots = inner.querySelectorAll('[role="tab"]');

      if (dots.length === 0) return;

      const activeDot = dots[index] as HTMLElement;
      const activeDotRect = activeDot.getBoundingClientRect();
      const activeDotCenterX =
        activeDotRect.left - trackRect.left + activeDotRect.width / 2;
      const trackCenterX = trackRect.width / 2;
      const translateX = trackCenterX - activeDotCenterX;

      inner.style.transform = `translateX(${translateX}px)`;
    }, [index]);

    useEffect(() => {
      if (!dotsTrackRef.current) return;
      const resizeObserver = new ResizeObserver(() => {
        if (dotsTrackRef.current && dotsInnerRef.current) {
          const track = dotsTrackRef.current;
          const inner = dotsInnerRef.current;
          const trackRect = track.getBoundingClientRect();
          const dots = inner.querySelectorAll('[role="tab"]');

          if (dots.length === 0) return;

          const activeDot = dots[index] as HTMLElement;
          const activeDotRect = activeDot.getBoundingClientRect();
          const activeDotCenterX =
            activeDotRect.left - trackRect.left + activeDotRect.width / 2;
          const trackCenterX = trackRect.width / 2;
          const translateX = trackCenterX - activeDotCenterX;

          inner.style.transform = `translateX(${translateX}px)`;
        }
      });

      resizeObserver.observe(dotsTrackRef.current);
      return () => resizeObserver.disconnect();
    }, [index]);

    const handlePointerDown = (e: React.PointerEvent) => {
      swipeStartRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: React.PointerEvent) => {
      const dx = e.clientX - swipeStartRef.current.x;
      const dy = e.clientY - swipeStartRef.current.y;

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0) {
          next();
        } else {
          prev();
        }
      }
    };

    const currentSlide = slides[index];

    return (
      <section
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        data-component="slider"
        data-direction={
          isTransitioning ? (direction === 1 ? 'next' : 'prev') : undefined
        }
        className={cn(
          'relative w-full h-full @container/slider overflow-hidden',
          className,
        )}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        style={{ touchAction: 'pan-y' }}
        {...props}
      >
        <style>{`
          [data-component="slider"] [role="tablist"] {
            transition: transform 350ms ease;
          }
        `}</style>

        <AnimatePresence custom={direction} mode="sync">
          <SlidePaneImage
            key={index}
            slide={currentSlide}
            isTransitioning={isTransitioning}
            direction={direction}
            variants={leftPaneVariants}
            transition={paneTransition}
          />
        </AnimatePresence>

        <SliderMiddle />

        <AnimatePresence
          custom={direction}
          mode="sync"
          onExitComplete={onTransitionSettled}
        >
          <SlidePaneRight
            key={index}
            slide={currentSlide}
            isTransitioning={isTransitioning}
            direction={direction}
            variants={rightPaneVariants}
            transition={paneTransition}
          />
        </AnimatePresence>

        <AnimatePresence custom={direction} mode="sync">
          <SlideMobileImage
            key={index}
            slide={currentSlide}
            isTransitioning={isTransitioning}
            direction={direction}
            variants={leftPaneVariants}
            transition={paneTransition}
          />
        </AnimatePresence>

        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {`Slide ${index + 1} of ${slides.length}: ${currentSlide.right.title}`}
        </div>

        <SliderPagination
          total={slides.length}
          current={index}
          onPrev={prev}
          onNext={next}
          onGoTo={goTo}
          isFirst={isFirst}
          isLast={isLast}
          loop={loop}
          dotsTrackRef={dotsTrackRef}
          dotsInnerRef={dotsInnerRef}
        />

        {slides.map((_, i) => (
          <div
            key={i}
            id={`slider-slide-${i}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            aria-hidden={i !== index}
            className="contents"
          />
        ))}
      </section>
    );
  },
);

SliderContainer.displayName = 'Slider';

export { SliderContainer };
