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
    <div className="rounded-full p-2 bg-[rgba(255,255,255,0.5)] backdrop-blur-sm border border-white fixed md:absolute bottom-[max(1rem,env(safe-area-inset-bottom))] md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-10 max-w-[300px] w-full md:max-w-max">
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
        className="w-full max-w-[158px] md:max-w-max md:w-fit overflow-hidden"
      >
        <ol className="list-none flex gap-3 w-full" ref={dotsInnerRef}>
          {Array.from({ length: total }, (_, i) => (
            <li key={i} role="tab">
              <button
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
        className="bg-white pointer dark:bg-[var(--sand)] text-[var(--sea-ink)] hover:bg-[#333] hover:text-[#fff] transition-all dark:hover:bg-[var(--sand)]/90 rounded-full shadow-md"
      >
        <CaretRightIcon size={28} aria-hidden="true" />
      </Button>
    </div>
  );
}
