import React, { forwardRef, useRef, useEffect, useCallback } from 'react';
import {
  AnimatePresence,
  useReducedMotion,
  cubicBezier,
  motion,
} from 'motion/react';
import type { Variants, Transition } from 'motion/react';

interface SliderSlideImage {
  src: string;
  alt: string;
}

interface SliderSlideLink {
  url: string;
  copy?: string;
}

interface SliderSlide {
  left: { image: SliderSlideImage };
  right: {
    title: string;
    description: string;
    list: string[];
    link: SliderSlideLink;
  };
}

interface SliderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  slides: SliderSlide[];
  initialIndex?: number;
  loop?: boolean;
  ariaLabel?: string;
  onSlideChange?: (index: number) => void;
}

type SliderDirection = 1 | -1;

interface UseSliderOptions {
  count: number;
  initialIndex?: number;
  loop?: boolean;
  onChange?: (index: number) => void;
}

interface UseSliderResult {
  index: number;
  direction: SliderDirection;
  isTransitioning: boolean;
  next: () => void;
  prev: () => void;
  goTo: (targetIndex: number) => void;
  onTransitionSettled: () => void;
  isFirst: boolean;
  isLast: boolean;
}

interface State {
  index: number;
  direction: SliderDirection;
  isTransitioning: boolean;
}

type Action =
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'GOTO'; target: number }
  | { type: 'SETTLE' };

function reducer(
  state: State,
  action: Action,
  options: UseSliderOptions,
): State {
  switch (action.type) {
    case 'NEXT': {
      const nextIndex = state.index + 1;
      return {
        index: options.loop
          ? nextIndex % options.count
          : Math.min(nextIndex, options.count - 1),
        direction: 1,
        isTransitioning: true,
      };
    }
    case 'PREV': {
      const prevIndex = state.index - 1;
      return {
        index: options.loop
          ? (prevIndex + options.count) % options.count
          : Math.max(prevIndex, 0),
        direction: -1,
        isTransitioning: true,
      };
    }
    case 'GOTO': {
      if (action.target === state.index) return state;
      return {
        index: action.target,
        direction: action.target > state.index ? 1 : -1,
        isTransitioning: true,
      };
    }
    case 'SETTLE': {
      return { ...state, isTransitioning: false };
    }
    default:
      return state;
  }
}

function useSlider(options: UseSliderOptions): UseSliderResult {
  const { count, initialIndex = 0, loop = true, onChange } = options;

  const [state, dispatch] = React.useReducer(
    (prevState, action) => reducer(prevState, action, { count, loop }),
    {
      index: initialIndex,
      direction: 1 as SliderDirection,
      isTransitioning: false,
    },
  );

  const next = useCallback(() => {
    if (!state.isTransitioning) dispatch({ type: 'NEXT' });
  }, [state.isTransitioning]);

  const prev = useCallback(() => {
    if (!state.isTransitioning) dispatch({ type: 'PREV' });
  }, [state.isTransitioning]);

  const goTo = useCallback(
    (targetIndex: number) => {
      if (!state.isTransitioning && targetIndex >= 0 && targetIndex < count) {
        dispatch({ type: 'GOTO', target: targetIndex });
      }
    },
    [state.isTransitioning, count],
  );

  const onTransitionSettled = useCallback(() => {
    dispatch({ type: 'SETTLE' });
  }, []);

  useEffect(() => {
    onChange?.(state.index);
  }, [state.index, onChange]);

  return {
    index: state.index,
    direction: state.direction,
    isTransitioning: state.isTransitioning,
    next,
    prev,
    goTo,
    onTransitionSettled,
    isFirst: state.index === 0,
    isLast: state.index === count - 1,
  };
}

function SlidePaneImage({
  slide,
  isTransitioning,
  direction,
  variants,
  transition,
}: {
  slide: SliderSlide;
  isTransitioning?: boolean;
  direction: 1 | -1;
  variants: Variants;
  transition: Transition;
}) {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      data-pane="left"
      className="absolute inset-0 w-1/2 h-full hidden lg:block"
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

function SlidePaneRight({
  slide,
  isTransitioning,
  direction,
  variants,
  transition,
}: {
  slide: SliderSlide;
  isTransitioning?: boolean;
  direction: 1 | -1;
  variants: Variants;
  transition: Transition;
}) {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      data-pane="right"
      className="absolute inset-0 w-full h-full lg:w-1/2 lg:left-1/2 bg-white dark:bg-gray-900 flex flex-col p-6 lg:p-8"
      inert={isTransitioning}
    >
      <div className="flex-1 flex flex-col">
        <h2 className="text-4xl lg:text-5xl font-bold dark:text-white mb-2">
          {slide.right.title}
        </h2>
        <div className="w-full h-1 my-6 bg-teal-500" />
        <p className="text-sm lg:text-base dark:text-white/80 max-h-48 overflow-hidden">
          {slide.right.description}
        </p>
        <div className="w-full max-w-[8%] h-[2px] mx-auto my-10 bg-teal-500" />
        <ul className="mb-8 space-y-4 text-sm lg:text-base">
          {slide.right.list.map((item, i) => (
            <li key={i} className="text-gray-700 dark:text-gray-300">
              • {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto flex justify-end">
        <a
          href={slide.right.link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
        >
          {slide.right.link.copy ?? 'Go to site'}
        </a>
      </div>
    </motion.div>
  );
}

function SlideMobileImage({
  slide,
  isTransitioning,
  direction,
  variants,
  transition,
}: {
  slide: SliderSlide;
  isTransitioning?: boolean;
  direction: 1 | -1;
  variants: Variants;
  transition: Transition;
}) {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      className="absolute inset-0 w-full h-full lg:hidden"
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

const CodepenSlider = forwardRef<HTMLDivElement, SliderProps>(
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
        if (dx < 0) next();
        else prev();
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
        className={`relative w-full h-full overflow-hidden ${className || ''}`}
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

        <div
          className="absolute top-0 left-1/2 w-1 h-full bg-gray-200 dark:bg-gray-700 hidden lg:block pointer-events-none"
          aria-hidden="true"
        />

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

        <div className="rounded-full p-2 bg-white/50 backdrop-blur-sm border border-white absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-10">
          <button
            onClick={prev}
            disabled={!loop && isFirst}
            aria-label="Previous slide"
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white disabled:opacity-50 p-3 rounded-full transition-all"
          >
            ←
          </button>

          <div
            ref={dotsTrackRef}
            role="tablist"
            aria-label="Slides"
            className="overflow-hidden flex items-center"
          >
            <div ref={dotsInnerRef} className="flex gap-3 w-fit">
              {slides.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === index}
                  aria-controls={`slider-slide-${i}`}
                  aria-label={`Go to slide ${i + 1} of ${slides.length}`}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all flex-shrink-0 ${
                    i === index
                      ? 'w-3 h-3 bg-teal-500'
                      : 'mt-1 w-1.5 h-1.5 bg-gray-400 dark:bg-white/30 hover:bg-gray-600 dark:hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={next}
            disabled={!loop && isLast}
            aria-label="Next slide"
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white disabled:opacity-50 p-3 rounded-full transition-all"
          >
            →
          </button>
        </div>

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

CodepenSlider.displayName = 'CodepenSlider';

export { CodepenSlider };
export type { SliderSlide, SliderProps };
