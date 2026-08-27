import { Button } from '../ui/button';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { cn } from '../../lib/utils';
import type { SliderPaginationProps } from '@packages/general-components/src/components/types.ts';

export function SliderPagination({
  total,
  current,
  onPrev,
  onNext,
  onGoTo,
  isFirst,
  isLast,
  loop,
  dotsTrackRef,
  dotsInnerRef,
}: SliderPaginationProps) {
  return (
    <div className="rounded-full p-2 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-white dark:border-black fixed md:absolute bottom-[max(1rem,env(safe-area-inset-bottom))] md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-10 max-w-75 w-full md:max-w-max">
      <Button
        variant="ghost"
        size="lg"
        aria-label="Previous slide"
        onClick={onPrev}
        disabled={!loop && isFirst}
        className="bg-background cursor-pointer dark:bg-[var(--sand)] text-accent hover:bg-flat-black hover:text-white transition-all dark:hover:bg-[var(--sand)]/90 rounded-full shadow-md"
      >
        <CaretLeftIcon size={28} aria-hidden="true" />
      </Button>

      <div
        ref={dotsTrackRef}
        role="tablist"
        aria-label="Slides"
        className="w-full max-w-39.5 md:max-w-max md:w-fit overflow-hidden"
      >
        <ol
          className="list-none flex gap-3 w-full"
          ref={dotsInnerRef as React.Ref<HTMLOListElement>}
        >
          {Array.from({ length: total }, (_, i) => (
            <li key={i} role="tab">
              <button
                aria-selected={i === current}
                aria-controls={`slider-slide-${i}`}
                aria-label={`Go to slide ${i + 1} of ${total}`}
                onClick={() => onGoTo(i)}
                className={cn(
                  'rounded-full pointer transition-all shrink-0',
                  i === current
                    ? 'w-3 h-3 bg-accent'
                    : 'mt-1 w-1.5 h-1.5 bg-black/30 dark:bg-white/30',
                )}
              />
            </li>
          ))}
        </ol>
      </div>

      <Button
        variant="ghost"
        size="lg"
        aria-label="Next slide"
        onClick={onNext}
        disabled={!loop && isLast}
        className="bg-white cursor-pointer dark:bg-[var(--sand)] text-accent hover:bg-flat-black hover:text-white transition-all dark:hover:bg-[var(--sand)]/90 rounded-full shadow-md"
      >
        <CaretRightIcon size={28} aria-hidden="true" />
      </Button>
    </div>
  );
}
