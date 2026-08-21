import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';

import { cn } from '../lib/utils';
import type { ImageComparisonProps } from '@packages/general-components/src/components/types.ts';

const ImageComparison = React.forwardRef<HTMLDivElement, ImageComparisonProps>(
  (
    {
      before,
      after,
      beforeLabel,
      afterLabel,
      initialPosition = 50,
      className,
      thumb,
      ...props
    },
    forwardedRef,
  ) => {
    const { t } = useTranslation();
    const containerRef = React.useRef<HTMLDivElement>(null);
    const draggingRef = React.useRef(false);
    const [position, setPosition] = React.useState(initialPosition);

    const resolvedBeforeLabel =
      beforeLabel ?? t('imageComparison.beforeLabel', 'Before');
    const resolvedAfterLabel =
      afterLabel ?? t('imageComparison.afterLabel', 'After');

    const setRefs = (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    const updatePositionFromClientX = (clientX: number) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect || rect.width === 0) return;
      const nextPosition = ((clientX - rect.left) / rect.width) * 100;
      setPosition(Math.min(100, Math.max(0, nextPosition)));
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      draggingRef.current = true;
      updatePositionFromClientX(e.clientX);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;
      updatePositionFromClientX(e.clientX);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.releasePointerCapture(e.pointerId);
      draggingRef.current = false;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const step = e.shiftKey ? 10 : 1;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setPosition((prev) => Math.max(0, prev - step));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setPosition((prev) => Math.min(100, prev + step));
      } else if (e.key === 'Home') {
        e.preventDefault();
        setPosition(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setPosition(100);
      }
    };

    const roundedPosition = Math.round(position);

    return !thumb ? (
      <div
        ref={setRefs}
        data-component="image-comparison"
        className={cn(
          'relative h-75 w-62.5 md:h-200 md:w-200 overflow-hidden',
          className,
        )}
        {...props}
      >
        <img
          src={before.src}
          alt={before.alt}
          className={cn(
            'absolute inset-0 h-full w-full object-cover',
            before.className,
          )}
        />
        <img
          src={after.src}
          alt={after.alt}
          className={cn(
            'absolute inset-0 h-full w-full object-cover',
            after.className,
          )}
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        />
        <span className="sr-only">{resolvedBeforeLabel}</span>
        <span className="sr-only">{resolvedAfterLabel}</span>
        <div
          className="absolute top-0 bottom-0 w-px bg-[var(--surface-strong)]"
          style={{ left: `${position}%` }}
        />
        <div
          role="slider"
          tabIndex={0}
          aria-valuenow={roundedPosition}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={
            roundedPosition <= 0
              ? resolvedAfterLabel
              : roundedPosition >= 100
                ? resolvedBeforeLabel
                : `${resolvedBeforeLabel} ${100 - roundedPosition}%, ${resolvedAfterLabel} ${roundedPosition}%`
          }
          aria-label={`${resolvedBeforeLabel} / ${resolvedAfterLabel}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onKeyDown={handleKeyDown}
          className="absolute top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border bg-accent border-[var(--surface-strong)] shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          style={{ left: `${position}%` }}
        >
          <CaretLeftIcon size={12} weight="bold" className="text-white" />
          <CaretRightIcon size={12} weight="bold" className="text-white" />
        </div>
      </div>
    ) : (
      <div
        ref={setRefs}
        data-component="image-comparison-thumbnail"
        className={cn('relative h-20 w-20 overflow-hidden', className)}
        {...props}
      >
        <img
          src={before.src}
          alt={before.alt}
          className={cn(
            'absolute inset-0 h-full w-full object-cover',
            before.className,
          )}
        />
        <img
          src={after.src}
          alt={after.alt}
          className={cn(
            'absolute inset-0 h-full w-full object-cover',
            after.className,
          )}
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        />
        <span className="sr-only">{resolvedBeforeLabel}</span>
        <span className="sr-only">{resolvedAfterLabel}</span>
        <div
          className="absolute top-0 bottom-0 w-px bg-[var(--surface-strong)]"
          style={{ left: `${position}%` }}
        />
      </div>
    );
  },
);

ImageComparison.displayName = 'ImageComparison';

export { ImageComparison };
