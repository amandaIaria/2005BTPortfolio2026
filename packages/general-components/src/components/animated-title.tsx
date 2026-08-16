import { forwardRef } from 'react';
import { cn } from '../lib/utils';
import type { AnimatedTitleProps } from '@packages/general-components/src/components/types.ts';

const AnimatedTitle = forwardRef<HTMLDivElement, AnimatedTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-component="animated-title"
        className={cn('relative w-fit hidden', className)}
        {...props}
      >
        <style>{`
          @keyframes squiggleSlide {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateX(100%);
              opacity: 0;
            }
          }

          [data-component="animated-title"]:hover .squiggle-line {
            animation: squiggleSlide 1.2s ease-in-out infinite;
          }
        `}</style>

        <div className="text-2xl font-bold text-[var(--sea-ink)] dark:text-white transition-colors">
          {children}
        </div>

        <svg
          className="squiggle-line absolute bottom-0 left-0 w-full h-2 overflow-visible pointer-events-none"
          viewBox="0 0 200 20"
          preserveAspectRatio="none"
        >
          <path
            d="M 0,10 Q 5,5 10,10 T 20,10 T 30,10 T 40,10 T 50,10 T 60,10 T 70,10 T 80,10 T 90,10 T 100,10 T 110,10 T 120,10 T 130,10 T 140,10 T 150,10 T 160,10 T 170,10 T 180,10 T 190,10 T 200,10"
            stroke="var(--lagoon)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  },
);

AnimatedTitle.displayName = 'AnimatedTitle';

export { AnimatedTitle };
