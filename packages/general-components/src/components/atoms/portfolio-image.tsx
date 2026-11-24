import { Image } from '@unpic/react/base';
import { transform } from 'unpic/providers/netlify';
import type { ImageProps } from '../types';
import type { CSSProperties, ReactNode } from 'react';

interface PropsType {
  image: ImageProps & {
    height?: string;
    width?: string;
    watermark?: boolean;
  };
  cn?: string;
  imageClasses?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export function PortfolioImage({
  children,
  image,
  cn,
  imageClasses,
  style,
}: PropsType) {
  const dimensions = {
    width: image.width ?? '',
    height: image.height ?? '',
    layout: (image.width && image.height) ?? 'fullWidth',
  };

  //   const watermarkSrc = image.watermark
  //     ? `${location.origin}/.netlify/functions/watermark?src=${encodeURIComponent(image.src)}`
  //     : image.src;

  const imageSrc = image.watermark
    ? image.src.replace('/img/', '/watermarked/')
    : image.src;

  return (
    <figure className={cn}>
      <Image
        src={imageSrc}
        alt={image.alt}
        {...dimensions}
        breakpoints={[400, 800, 1200, 1980]}
        transformer={transform}
        operations={{
          fit: 'cover',
          fm: 'webp',
          q: 80,
        }}
        className={imageClasses}
        style={style ?? ''}
      />
      ;{children}
    </figure>
  );
}
