import * as React from 'react';
import { Link } from '@tanstack/react-router';
import { cn } from '../../lib/utils';
import type { ShrineItem } from './shrine-gallery';

interface ShrineDetailProps extends React.ComponentProps<'div'> {
  shrine: ShrineItem;
}

function ShrineDetail({ shrine, className, ...props }: ShrineDetailProps) {
  return (
    <div
      data-component="shrine-detail"
      className={cn('flex flex-col gap-12', className)}
      {...props}
    >
      <div className="flex flex-col gap-6">
        <Link
          to="/shrines"
          className="pointer w-fit text-sm text-(--sea-ink-soft)"
        >
          Shrines
        </Link>
        <h1 className="text-4xl font-bold text-(--sea-ink) sm:text-5xl">
          {shrine.title}
        </h1>
        {shrine.description && (
          <p className="max-w-2xl text-lg text-(--sea-ink-soft)">
            {shrine.description}
          </p>
        )}
        <div className="aspect-video overflow-hidden bg-(--surface)">
          <img
            src={shrine.image.src}
            alt={shrine.image.alt}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {shrine.gallery && shrine.gallery.length > 0 && (
        <div className="flex flex-col gap-6 border-t border-(--surface-strong) pt-12">
          <h2 className="text-sm font-medium tracking-wide text-(--lagoon) uppercase">
            Gallery
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {shrine.gallery.map((image, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden bg-(--surface)"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { ShrineDetail };
export type { ShrineDetailProps };
