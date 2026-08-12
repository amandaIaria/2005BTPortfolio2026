import { Button } from '../ui/button';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { cn } from '../../lib/utils';
import type { SliderPaginationProps } from '@general-purpose/types';

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
    <div className="rounded-full p-2 bg-[rgba(255,255,255,0.5)] backdrop-blur-sm border border-white absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-10">
      <Button
        variant="ghost"
        size="lg"
        aria-label="Previous slide"
        onClick={onPrev}
        disabled={!loop && isFirst}
        className="bg-background pointer dark:bg-[var(--sand)] text-[var(--accent)] hover:bg-[#333] hover:text-[#fff] transition-all dark:hover:bg-[var(--sand)]/90 rounded-full shadow-md"
      >
        <CaretLeftIcon size={28} aria-hidden="true" />
      </Button>

      <div
        ref={dotsTrackRef}
        role="tablist"
        aria-label="Slides"
        className="overflow-hidden flex items-center"
      >
        <div ref={dotsInnerRef} className="flex gap-3 w-fit">
          {Array.from({ length: total }, (_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-controls={`slider-slide-${i}`}
              aria-label={`Go to slide ${i + 1} of ${total}`}
              onClick={() => onGoTo(i)}
              className={cn(
                'rounded-full pointer transition-all flex-shrink-0',
                i === current
                  ? 'w-3 h-3 bg-accent'
                  : 'mt-1 w-1.5 h-1.5 bg-black/30 dark:bg-white/30',
              )}
            />
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        size="lg"
        aria-label="Next slide"
        onClick={onNext}
        disabled={!loop && isLast}
        className="bg-white pointer dark:bg-[var(--sand)] text-[var(--sea-ink)] hover:bg-[#333] hover:text-[#fff] transition-all dark:hover:bg-[var(--sand)]/90 rounded-full shadow-md"
      >
        <CaretRightIcon size={28} aria-hidden="true" />
      </Button>
    </div>
  );
}
