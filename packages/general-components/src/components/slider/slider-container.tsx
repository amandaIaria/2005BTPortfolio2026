import {
  forwardRef,
  useRef,
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { cn } from '@general/lib/utils';
import { useSlider } from '../../hooks/use-slider';
import { SlidePaneImage, SlidePaneRight, SlideMobileImage } from './slide-pane';
import { SliderPagination } from './slider-pagination';
import type { SliderProps, SliderSlides } from './types';
import { SliderMiddle } from './slide-middle';

const TRANSITION_MS = 500;

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

    const [previous, setPrevious] = useState<number | null>(null);
    const outgoingPaneRef = useRef<HTMLDivElement>(null);
    const dotsTrackRef = useRef<HTMLDivElement>(null);
    const dotsInnerRef = useRef<HTMLDivElement>(null);
    const swipeStartRef = useRef({ x: 0, y: 0 });
    const settleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

        settleTimeoutRef.current = setTimeout(() => {
          setPrevious(null);
          onTransitionSettled();
        }, TRANSITION_MS + 50);

        return () => {
          pane.removeEventListener('transitionend', handleTransitionEnd);
        };
      }
    }, [isTransitioning, previous, onTransitionSettled]);

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
        
        {previous !== null && outgoingSlide && (
          <>
            <SlidePaneImage
              slide={outgoingSlide}
              isOutgoing
              isTransitioning={isTransitioning}
              outgoingRef={outgoingPaneRef}
            />
            <SlidePaneRight
              slide={outgoingSlide}
              isOutgoing
              isTransitioning={isTransitioning}
              outgoingRef={outgoingPaneRef}
            />
            <SlideMobileImage
              slide={outgoingSlide}
              isOutgoing
              isTransitioning={isTransitioning}
            />
          </>
        )}

        <SlidePaneImage
          slide={currentSlide}
          isOutgoing={false}
          isTransitioning={isTransitioning}
        />

        <SliderMiddle />

        <SlidePaneRight
          slide={currentSlide}
          isOutgoing={false}
          isTransitioning={isTransitioning}
        />

        <SlideMobileImage
          slide={currentSlide}
          isOutgoing={false}
          isTransitioning={isTransitioning}
        />

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

SliderContainer.displayName = 'Slider';

export { SliderContainer };
