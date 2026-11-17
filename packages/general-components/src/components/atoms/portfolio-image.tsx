
import { Image } from '@unpic/react/base';
import { transform } from 'unpic/providers/netlify';
import type { ImageProps } from '../types';
import type { CSSProperties, ReactNode, StyleHTMLAttributes } from 'react';

interface PropsType {
    image: ImageProps & {
        height?: string;
        width?: string;
    };
    cn?: string;
    imageClasses?: string;
    children?: ReactNode;
    style?: CSSProperties;
}

export function PortfolioImage({children, image, cn, imageClasses, style}:PropsType) {
    const dimensions = {
        width: image.width ?? "",
        height: image.height ?? "",
        layout: (image.width && image.height) ?? "fullWidth"
    }
    
    return (
        <figure className={cn}>
            <Image
                src={image.src}
                alt={image.alt}
                {...dimensions}
                fallback="netlify"
                breakpoints={[400, 800, 1200]}
                transformer={transform}
                className={imageClasses}
                operations={{
                    fit: 'cover',
                    fm: 'webp',
                }}
                style={style ?? ""}
            />
            {children}
        </figure>
    );
}