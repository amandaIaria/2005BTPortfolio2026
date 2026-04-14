import * as React from 'react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';

interface CassetteSlide {
  id: string;
  label: string;
  sublabel?: string;
  modalTitle?: string;
  modalContent?: React.ReactNode;
}

interface CassetteCarouselProps extends React.ComponentProps<'div'> {
  slides: CassetteSlide[];
  orientation?: 'horizontal' | 'vertical';
}

function CassetteTape({
  slide,
  onClick,
}: {
  slide: CassetteSlide;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex shrink-0 cursor-pointer flex-col items-center justify-center border-2 border-[var(--sea-ink)] bg-[var(--surface)] px-6 py-4 transition-transform hover:-translate-y-0.5 hover:bg-[var(--surface-strong)] active:translate-y-0"
    >
      {/* Top holes */}
      <div className="absolute top-1.5 flex w-full justify-between px-2">
        <div className="h-1.5 w-1.5 rounded-full bg-[var(--line)]" />
        <div className="h-1.5 w-1.5 rounded-full bg-[var(--line)]" />
      </div>

      {/* Reels */}
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--foam)]">
          <div className="h-3 w-3 rounded-full border border-[var(--line)]" />
        </div>
        <div className="h-px w-4 bg-[var(--line)]" />
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--foam)]">
          <div className="h-3 w-3 rounded-full border border-[var(--line)]" />
        </div>
      </div>

      {/* Label */}
      <div className="border border-[var(--line)] bg-[var(--foam)] px-3 py-1 text-center">
        <span className="block text-xs font-semibold uppercase tracking-wide text-[var(--sea-ink)]">
          {slide.label}
        </span>
        {slide.sublabel && (
          <span className="block text-[10px] text-[var(--sea-ink-soft)]">
            {slide.sublabel}
          </span>
        )}
      </div>

      {/* Bottom holes */}
      <div className="absolute bottom-1.5 flex w-full justify-between px-2">
        <div className="h-1.5 w-1.5 rounded-full bg-[var(--line)]" />
        <div className="h-1.5 w-1.5 rounded-full bg-[var(--line)]" />
      </div>
    </button>
  );
}

function CassetteCarousel({
  slides,
  orientation = 'horizontal',
  className,
  ...props
}: CassetteCarouselProps) {
  const [activeSlide, setActiveSlide] = useState<CassetteSlide | null>(null);

  return (
    <div
      data-component="cassette-carousel"
      className={cn('relative', className)}
      {...props}
    >
      <div
        className={cn(
          'flex gap-4 overflow-auto p-2',
          orientation === 'vertical' ? 'flex-col' : 'flex-row',
        )}
      >
        {slides.map((slide) => (
          <CassetteTape
            key={slide.id}
            slide={slide}
            onClick={() => setActiveSlide(slide)}
          />
        ))}
      </div>

      <Dialog
        open={activeSlide !== null}
        onOpenChange={(open) => {
          if (!open) setActiveSlide(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {activeSlide?.modalTitle ?? activeSlide?.label}
            </DialogTitle>
            <DialogDescription>
              {activeSlide?.sublabel}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {activeSlide?.modalContent ?? (
              <p className="text-sm text-[var(--sea-ink-soft)]">
                No content provided for this tape.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { CassetteCarousel };
export type { CassetteSlide, CassetteCarouselProps };
