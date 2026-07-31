import * as React from 'react';
import { cn } from '../lib/utils';

interface HeroProps extends React.ComponentProps<'div'> {
  image: {
    src: string;
    alt: string;
  };
  topText: string;
  bottomText: string;
  caption: string;
}

function Hero({ image, topText, bottomText, caption, className, ...props }: HeroProps) {
  return (
    <div
      data-component="hero"
      className={cn('relative h-dvh w-dvw overflow-hidden bg-black', className)}
      {...props}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="absolute inset-0 h-full w-full object-cover top-[25%]"
      />
      <div className="absolute inset-x-0 -top-[82px] px-6 py-10 text-center">
        <p className="text-[clamp(2.5rem,10vw,8rem)] leading-none font-bold tracking-tight text-white uppercase mix-blend-difference">
          {topText}
        </p>
      </div>
      <div className="absolute inset-1/2 ml-[100px]  p-4 text-center h-fit w-fit block">
        <p className="text-xl leading-none tracking-tight text-accent capitalize">
          {caption}
        </p>
      </div>
      <div className="absolute inset-x-0 -bottom-[50px] px-6 py-10 text-center">
        <p className="text-[clamp(2.5rem,10vw,8rem)] leading-none font-bold tracking-tight text-white uppercase mix-blend-difference">
          {bottomText}
        </p>
      </div>
    </div>
  );
}

export { Hero };
export type { HeroProps };
