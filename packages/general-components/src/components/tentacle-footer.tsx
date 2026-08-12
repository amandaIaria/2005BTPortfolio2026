import * as React from 'react';
import { cn } from '../lib/utils';
import type { TentacleFooterProps } from '@packages/general-components/src/components/types.ts';

function Tentacle({ index, total }: { index: number; total: number }) {
  const baseX = (index / total) * 100;
  const offset = (index % 2 === 0 ? -1 : 1) * 3;
  const height = 80 + Math.sin(index * 1.5) * 40;
  const delay = index * 0.3;
  const thickness = 3 + (index % 3);

  return (
    <g>
      <path
        className="animated-tentacle"
        d={`M ${baseX + offset} 100 
            Q ${baseX + 15} ${100 - height * 0.4}, ${baseX + 8} ${100 - height * 0.6} 
            T ${baseX + 5} ${100 - height}`}
        fill="none"
        stroke="white"
        strokeWidth={thickness}
        strokeLinecap="round"
        style={{ animationDelay: `${delay}s` }}
      />
      {/* Suction cups */}
      {[0.3, 0.5, 0.7].map((t, i) => {
        const cx = baseX + offset + (8 - offset) * t + (i % 2 === 0 ? 2 : -2);
        const cy = 100 - height * t;
        return (
          <circle
            key={i}
            className="animated-tentacle-sucker"
            cx={cx}
            cy={cy}
            r={1.5 + i * 0.3}
            fill="none"
            stroke="white"
            strokeWidth="0.8"
            style={{ animationDelay: `${delay + i * 0.2}s` }}
          />
        );
      })}
    </g>
  );
}

function TentacleFooter({
  text,
  tentacleCount = 8,
  className,
  children,
  ...props
}: TentacleFooterProps) {
  return (
    <footer
      data-component="tentacle-footer"
      className={cn('relative overflow-hidden bg-black', className)}
      {...props}
    >
      <style>{`
        @keyframes tentacle-sway {
          0% { transform: translateX(0) scaleY(1); }
          25% { transform: translateX(3px) scaleY(1.02) rotate(1deg); }
          50% { transform: translateX(-2px) scaleY(0.98); }
          75% { transform: translateX(4px) scaleY(1.01) rotate(-1deg); }
          100% { transform: translateX(0) scaleY(1); }
        }
        @keyframes sucker-pulse {
          0%, 100% { opacity: 0.4; r: 1.5; }
          50% { opacity: 1; r: 2; }
        }
        @keyframes ink-float {
          0% { transform: translateY(0) scale(1); opacity: 0.15; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 0.05; }
          100% { transform: translateY(-40px) scale(0.5); opacity: 0; }
        }
        .animated-tentacle {
          animation: tentacle-sway 4s ease-in-out infinite;
          transform-origin: bottom center;
        }
        .animated-tentacle-sucker {
          animation: sucker-pulse 2s ease-in-out infinite;
        }
        .animated-tentacle-ink {
          animation: ink-float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Ink particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="animated-tentacle-ink absolute rounded-full bg-white"
            style={{
              width: `${4 + i * 2}px`,
              height: `${4 + i * 2}px`,
              left: `${15 + i * 14}%`,
              bottom: `${30 + (i % 3) * 10}%`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
      </div>

      {/* Tentacles SVG */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="relative h-48 w-full"
        aria-hidden="true"
      >
        {Array.from({ length: tentacleCount }, (_, i) => (
          <Tentacle key={i} index={i} total={tentacleCount} />
        ))}
      </svg>

      {/* Footer content */}
      <div className="relative border-t border-white/10 bg-black px-6 py-4 text-center">
        {children ?? (
          <p className="text-sm text-white/60">{text ?? '© 2026'}</p>
        )}
      </div>
    </footer>
  );
}

export { TentacleFooter };
