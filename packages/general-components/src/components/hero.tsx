import * as React from 'react';
import { cn } from '../lib/utils';
import type { HeroProps } from '@general-purpose/types';

function Hero({
  image,
  topText,
  bottomText,
  caption,
  heading,
  hiddenH1,
  className,
  ...props
}: HeroProps) {
  return (
    <div
      data-component="hero"
      className={cn('relative h-dvh w-dvw overflow-hidden bg-black', className)}
      {...props}
    >
      <h1 className="sr-only">{hiddenH1}</h1>
      <img
        src={image.src}
        alt={image.alt}
        className="absolute inset-0 h-full w-full object-cover top-[25%]"
      />
      <div className="absolute inset-x-0 -top-20.5 px-6 py-10 text-center">
        <p className="text-[clamp(2.5rem,10vw,8rem)] leading-none font-bold tracking-tight text-white uppercase mix-blend-difference">
          {topText}
        </p>
      </div>
      <div className="absolute inset-1/2 ml-25 -mt-20  p-4 text-center h-fit w-fit block">
        <p className="text-5xl font-bold leading-none tracking-tight text-white uppercase mix-blend-difference">
          {heading}
        </p>
        <p className="text-xl leading-none tracking-tight text-accent capitalize">
          {caption}
        </p>
      </div>
      <div className="absolute inset-x-0 -bottom-12.5 px-6 py-10 text-center">
        <p className="text-[clamp(2.5rem,10vw,8rem)] leading-none font-bold tracking-tight text-white uppercase mix-blend-difference">
          {bottomText}
        </p>
      </div>
    </div>
  );
}

export { Hero };
