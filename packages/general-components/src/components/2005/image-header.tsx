import { cn } from '../../lib/utils';
import type { ImageHeaderProps } from '@packages/general-components/src/components/types.ts';
import { PortfolioImage } from '../atoms/portfolio-image';

export function ImageHeader({
  pageName,
  siteName = 'Amanda Iaria',
  src,
  alt,
  className,
  ...props
}: ImageHeaderProps) {
  return (
    <div
      data-component="image-header"
      className={cn('relative', className)}
      {...props}
    >
      <h1 className="sr-only">
        {pageName} — {siteName}
      </h1>
      <PortfolioImage image={{
        src: src,
        alt: alt
      }} />
    </div>
  );
}
