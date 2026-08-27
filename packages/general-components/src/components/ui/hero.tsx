import { cn } from '../../lib/utils';
import type { HeroProps } from '@packages/general-components/src/components/types.ts';
import { motion } from 'framer-motion';


function Hero({
  image,
  topText,
  bottomText,
  caption,
  heading,
  hiddenH1,
  className,
  nameStatement,
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
        className="absolute bottom-0 h-full w-full object-contain object-bottom mix-blend-difference"
      />
      <div className="absolute inset-x-0 -top-20.5 px-6 py-10 text-center">
        <p className="text-[clamp(2.5rem,10vw,8rem)] leading-none font-bold tracking-tight text-white uppercase mix-blend-difference">
          {topText}
        </p>
      </div>
      
      <motion.div className="absolute inset-1/2 -translate-y-96 -translate-x-200 p-4 text-center h-fit w-fit block">
        <p className="text-8xl font-bold leading-none tracking-tight text-white uppercase mix-blend-difference">
          {nameStatement}&nbsp;<span className="text-accent">|</span>
        </p>
      </motion.div>

      <motion.div className="absolute inset-1/2 ml-70 -mt-40  p-4 text-center h-fit w-fit block">
        <p className="text-5xl font-bold tracking-tight text-white mix-blend-difference">
          {heading}
        </p>
        <p className="text-xl leading-none tracking-tight text-accent capitalize">
          {caption}
        </p>
      </motion.div>
      
      <div className="absolute inset-x-0 -bottom-12.5 px-6 py-10 text-center">
        <p className="text-[clamp(2.5rem,10vw,8rem)] leading-none font-bold tracking-tight text-white uppercase mix-blend-difference">
          {bottomText}
        </p>
      </div>
    </div>
  );
}

export { Hero };
