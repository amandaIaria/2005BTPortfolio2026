import {
  forwardRef,
  useRef,
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { cn } from '@general/lib/utils';
import { Button } from './ui/button';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { useSlider } from '../hooks/use-slider';

const TRANSITION_MS = 500;

export interface SliderSlideImage {
  src: string;
  alt: string;
}

export interface SliderSlideLink {
  url: string;
  copy?: string;
}

export interface SliderSlide {
  left: { image: SliderSlideImage };
  right: {
    title: string;
    description: string;
    list: string[];
    link: SliderSlideLink;
  };
}

export type SliderSlides = SliderSlide[];

export interface SliderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  slides: SliderSlides;
  initialIndex?: number;
  loop?: boolean;
  ariaLabel?: string;
  onSlideChange?: (index: number) => void;
}

const Slider = forwardRef<HTMLDivElement, SliderProps>(
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

    const [previous, setPrevious] = useState<number | null>(null);
    const outgoingPaneRef = useRef<HTMLDivElement>(null);
    const dotsTrackRef = useRef<HTMLDivElement>(null);
    const dotsInnerRef = useRef<HTMLDivElement>(null);
    const swipeStartRef = useRef({ x: 0, y: 0 });
    const settleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Transition orchestration: track outgoing index, apply transforms, detect settle
    useLayoutEffect(() => {
      if (isTransitioning && previous === null) {
        setPrevious(index);
      }
    }, [isTransitioning, index, previous]);

    useLayoutEffect(() => {
      if (isTransitioning && previous !== null && outgoingPaneRef.current) {
        const handleTransitionEnd = () => {
          if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
          setPrevious(null);
          onTransitionSettled();
        };

        const pane = outgoingPaneRef.current;
        pane.addEventListener('transitionend', handleTransitionEnd);

        // Safety-net timeout in case transitionend doesn't fire
        settleTimeoutRef.current = setTimeout(() => {
          setPrevious(null);
          onTransitionSettled();
        }, TRANSITION_MS + 50);

        return () => {
          pane.removeEventListener('transitionend', handleTransitionEnd);
        };
      }
    }, [isTransitioning, previous, onTransitionSettled]);

    // Keyboard navigation
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

    // Pagination dot centering via JS measurement
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

    // ResizeObserver for pagination re-centering on resize
    useEffect(() => {
      if (!dotsTrackRef.current) return;
      const resizeObserver = new ResizeObserver(() => {
        // Trigger a re-center by re-running the centering logic
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

    // Touch/swipe handling
    const handlePointerDown = (e: React.PointerEvent) => {
      swipeStartRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: React.PointerEvent) => {
      const dx = e.clientX - swipeStartRef.current.x;
      const dy = e.clientY - swipeStartRef.current.y;

      // Only treat as horizontal swipe
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0) {
          next();
        } else {
          prev();
        }
      }
    };

    const currentSlide = slides[index];
    const outgoingSlide = previous !== null ? slides[previous] : null;

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
          @media (prefers-reduced-motion: no-preference) {
            [data-component="slider"][data-direction="next"] [data-pane="left"][data-phase="outgoing"] {
              transform: translateY(-100%);
            }
            [data-component="slider"][data-direction="next"] [data-pane="left"][data-phase="incoming"] {
              transform: translateY(100%);
            }
            [data-component="slider"][data-direction="next"] [data-pane="right"][data-phase="outgoing"] {
              transform: translateY(100%);
            }
            [data-component="slider"][data-direction="next"] [data-pane="right"][data-phase="incoming"] {
              transform: translateY(-100%);
            }

            [data-component="slider"][data-direction="prev"] [data-pane="left"][data-phase="outgoing"] {
              transform: translateY(100%);
            }
            [data-component="slider"][data-direction="prev"] [data-pane="left"][data-phase="incoming"] {
              transform: translateY(-100%);
            }
            [data-component="slider"][data-direction="prev"] [data-pane="right"][data-phase="outgoing"] {
              transform: translateY(-100%);
            }
            [data-component="slider"][data-direction="prev"] [data-pane="right"][data-phase="incoming"] {
              transform: translateY(100%);
            }

            [data-component="slider"] [data-pane] {
              transition: transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1);
            }

            [data-component="slider"] [role="tablist"] {
              transition: transform 350ms ease;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            [data-component="slider"] [data-phase="outgoing"] {
              opacity: 1;
              animation: sliderFadeOut ${150}ms ease-out forwards;
            }
            [data-component="slider"] [data-phase="incoming"] {
              opacity: 0;
              animation: sliderFadeIn ${150}ms ease-in forwards;
              animation-delay: 75ms;
            }

            @keyframes sliderFadeOut {
              to { opacity: 0; }
            }
            @keyframes sliderFadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          }
        `}</style>

        {/* Left pane (image) */}
        <div
          ref={previous !== null ? outgoingPaneRef : undefined}
          data-pane="left"
          className="absolute inset-0 w-1/2 h-full @lg:w-1/2 hidden @lg:block"
          aria-hidden={previous === null || index === previous}
        >
          {previous !== null && (
            <div
              data-phase="outgoing"
              className="absolute inset-0 overflow-hidden"
              inert={isTransitioning}
            >
              <img
                src={outgoingSlide!.left.image.src}
                alt={outgoingSlide!.left.image.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}
          <div
            data-phase="incoming"
            className="absolute inset-0 overflow-hidden"
          >
            <img
              src={currentSlide.left.image.src}
              alt={currentSlide.left.image.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Vertical divider (desktop only) */}
        <div
          className="absolute top-0 left-1/2 w-px h-full bg-[var(--line)] hidden @lg:block pointer-events-none"
          aria-hidden="true"
        />

        {/* Center marker (desktop only) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden @lg:block pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-2 h-2 rounded-full bg-[var(--lagoon)] mx-auto" />
          <div className="w-8 h-px bg-[var(--lagoon)] mt-1" />
        </div>

        {/* Right pane (copy) */}
        <div
          ref={
            previous !== null && direction === 1 ? outgoingPaneRef : undefined
          }
          data-pane="right"
          className="absolute inset-0 w-full h-full @lg:w-1/2 @lg:left-1/2 bg-white dark:bg-[var(--sand)] flex flex-col justify-center p-6 @lg:p-8"
          aria-hidden={previous === null || index === previous}
        >
          {previous !== null && (
            <div
              data-phase="outgoing"
              className="absolute inset-0 w-full h-full p-6 @lg:p-8 flex flex-col justify-center"
              inert={isTransitioning}
            >
              <h2 className="text-3xl @lg:text-4xl font-bold text-[var(--sea-ink)] dark:text-white mb-2">
                {outgoingSlide!.right.title}
              </h2>
              <div className="w-12 h-px bg-[var(--lagoon)] mb-4" />
              <p className="text-sm @lg:text-base text-[var(--sea-ink-soft)] dark:text-white/80 mb-6 max-h-48 overflow-hidden">
                {outgoingSlide!.right.description}
              </p>
              <div className="w-8 h-px bg-[var(--lagoon)] mb-4" />
              <ul className="list-disc list-inside mb-8 space-y-1 text-sm @lg:text-base text-[var(--sea-ink)] dark:text-white">
                {outgoingSlide!.right.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div
            data-phase="incoming"
            className="absolute inset-0 w-full h-full p-6 @lg:p-8 flex flex-col justify-center"
          >
            <h2 className="text-3xl @lg:text-4xl font-bold text-[var(--sea-ink)] dark:text-white mb-2">
              {currentSlide.right.title}
            </h2>
            <div className="w-12 h-px bg-[var(--lagoon)] mb-4" />
            <p className="text-sm @lg:text-base text-[var(--sea-ink-soft)] dark:text-white/80 mb-6 max-h-48 overflow-hidden">
              {currentSlide.right.description}
            </p>
            <div className="w-8 h-px bg-[var(--lagoon)] mb-4" />
            <ul className="list-disc list-inside mb-8 space-y-1 text-sm @lg:text-base text-[var(--sea-ink)] dark:text-white">
              {currentSlide.right.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <div className="mt-auto">
              <Button
                asChild
                size="default"
                className="bg-[var(--lagoon)] text-white hover:bg-[var(--lagoon-deep)]"
              >
                <a
                  href={currentSlide.right.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {currentSlide.right.link.copy ?? 'Go to site'}
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile image (shown below on narrow screens) */}
        <div className="w-full @lg:hidden aspect-video overflow-hidden">
          {previous !== null && (
            <div
              data-phase="outgoing"
              className="absolute inset-0 w-full h-full"
              inert={isTransitioning}
            >
              <img
                src={outgoingSlide!.left.image.src}
                alt={outgoingSlide!.left.image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div data-phase="incoming" className="absolute inset-0 w-full h-full">
            <img
              src={currentSlide.left.image.src}
              alt={currentSlide.left.image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Live region for screen readers */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {`Slide ${index + 1} of ${slides.length}: ${currentSlide.right.title}`}
        </div>

        {/* Pagination controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Previous slide"
            onClick={prev}
            disabled={!loop && isFirst}
            className="bg-white dark:bg-[var(--sand)] text-[var(--sea-ink)] hover:bg-white/90 dark:hover:bg-[var(--sand)]/90 rounded-full"
          >
            <CaretLeftIcon size={24} aria-hidden="true" />
          </Button>

          {/* Pagination dots */}
          <div
            ref={dotsTrackRef}
            role="tablist"
            aria-label="Slides"
            className="w-32 h-6 overflow-hidden flex items-center bg-white/80 dark:bg-[var(--sand)]/80 rounded-full px-1"
          >
            <div ref={dotsInnerRef} className="flex gap-1 w-fit">
              {slides.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === index}
                  aria-controls={`slider-slide-${i}`}
                  aria-label={`Go to slide ${i + 1} of ${slides.length}`}
                  onClick={() => goTo(i)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-colors flex-shrink-0',
                    i === index
                      ? 'bg-[var(--lagoon)]'
                      : 'bg-[var(--sea-ink)]/30 dark:bg-white/30 hover:bg-[var(--sea-ink)]/50 dark:hover:bg-white/50',
                  )}
                />
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Next slide"
            onClick={next}
            disabled={!loop && isLast}
            className="bg-white dark:bg-[var(--sand)] text-[var(--sea-ink)] hover:bg-white/90 dark:hover:bg-[var(--sand)]/90 rounded-full"
          >
            <CaretRightIcon size={24} aria-hidden="true" />
          </Button>
        </div>

        {/* Slide containers for a11y */}
        {slides.map((slide, i) => (
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

Slider.displayName = 'Slider';

export { Slider };
