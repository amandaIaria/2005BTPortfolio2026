import { cn } from '../../lib/utils';
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '../ui/dialog';
import type {
  PortfolioDialogContentProps,
  PortfolioDialogTitleProps,
} from '@packages/general-components/src/components/types.ts';

function PortfolioDialogContent({
  className,
  ...props
}: PortfolioDialogContentProps) {
  return (
    <DialogContent
      data-component="portfolio-dialog-content"
      className={cn('border-t-4 border-t-accent', className)}
      {...props}
    />
  );
}

function PortfolioDialogTitle({
  className,
  ...props
}: PortfolioDialogTitleProps) {
  return (
    <DialogTitle
      data-component="portfolio-dialog-title"
      className={cn('font-extrabold text-accent uppercase', className)}
      {...props}
    />
  );
}

export {
  Dialog as PortfolioDialog,
  DialogTrigger as PortfolioDialogTrigger,
  PortfolioDialogContent,
  DialogHeader as PortfolioDialogHeader,
  PortfolioDialogTitle,
  DialogDescription as PortfolioDialogDescription,
  DialogFooter as PortfolioDialogFooter,
  DialogClose as PortfolioDialogClose,
};
