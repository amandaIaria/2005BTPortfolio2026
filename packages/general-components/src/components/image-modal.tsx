import { useState } from 'react';

import { cn } from '../lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import type { ImageModalProps } from '@packages/general-components/src/components/types.ts';

function ImageModal({
  src,
  alt,
  thumbnailSrc,
  className,
  imageClassName,
}: ImageModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          data-component="image-modal"
          aria-label={`View full image: ${alt}`}
          className="cursor-zoom-in"
        >
          <img
            src={thumbnailSrc ?? src}
            alt=""
            className={cn('h-auto w-full', className)}
          />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] bg-transparent p-2 ring-0 sm:max-w-[90vw]">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <DialogDescription className="sr-only">
          Full-size view of the image. Press Escape or click outside to close.
        </DialogDescription>
        <img
          src={src}
          alt={alt}
          className={cn(
            'mx-auto max-h-[85vh] w-auto object-contain',
            imageClassName,
          )}
        />
      </DialogContent>
    </Dialog>
  );
}

export { ImageModal };
