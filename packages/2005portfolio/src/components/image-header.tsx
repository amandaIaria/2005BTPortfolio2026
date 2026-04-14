import { cn } from '@general/components';

interface ImageHeaderProps extends React.ComponentProps<'div'> {
  pageName: string;
  siteName?: string;
  src: string;
  alt: string;
}

export function ImageHeader({
  pageName,
  siteName = 'Amanda Iaria',
  src,
  alt,
  className,
  ...props
}: ImageHeaderProps) {
  return (
    <div data-component="image-header" className={cn('relative', className)} {...props}>
      <h1 className="sr-only">
        {pageName} — {siteName}
      </h1>
      <img
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        className="h-auto w-full"
      />
    </div>
  );
}
