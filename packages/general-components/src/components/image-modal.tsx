import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { XIcon } from '@phosphor-icons/react';

import { cn } from '../lib/utils';
import { Button } from './ui/button';
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import type { ImageModalProps } from '@packages/general-components/src/components/types.ts';
import { PortfolioButton } from './portfolio-button';

function ImageModal({
  src,
  alt,
  thumbnailSrc,
  className,
  imageClassName,
}: ImageModalProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          data-component="image-modal"
          aria-label={t('imageModal.viewFullLabel', { alt })}
          className="aspect-square overflow-hidden block cursor-zoom-in"
        >
          <img
            src={thumbnailSrc ?? src}
            alt=""
            loading="lazy"
            className={cn('h-full w-full object-cover', className)}
          />
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="bg-black/50 backdrop-blur-md cursor-pointer" />
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className="fixed top-1/2 left-1/2 z-50 grid w-fit max-w-[90vw] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-none p-2 outline-none duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
        >
          <div>
            <DialogTitle className="sr-only">{alt}</DialogTitle>
            <DialogDescription className="sr-only">
              {t('imageModal.description')}
            </DialogDescription>
            <img
              src={src}
              alt={alt}
              className={cn(
                'mx-auto max-h-[85vh] w-auto object-contain',
                imageClassName,
              )}
            />
          </div>
          <DialogPrimitive.Close asChild>
            <PortfolioButton
              size="icon-sm"
              className="absolute -top-10 right-2 cursor-pointer"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </PortfolioButton>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

export { ImageModal };
