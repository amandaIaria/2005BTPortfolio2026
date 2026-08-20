import * as React from 'react';
import { cn } from '../../lib/utils';
import type { AnimatedFooterProps } from '@packages/general-components/src/components/types.ts';

function Building({
  width,
  height,
  left,
  windows,
  delay,
}: {
  width: number;
  height: number;
  left: number;
  windows: number;
  delay: number;
}) {
  const cols = Math.max(1, Math.floor(width / 16));
  const rows = Math.max(1, Math.floor(height / 20));
  const totalWindows = Math.min(windows, cols * rows);

  const windowPositions = React.useMemo(() => {
    const positions: { col: number; row: number; flickerDelay: number }[] = [];
    const taken = new Set<string>();

    for (let i = 0; i < totalWindows; i++) {
      let col: number, row: number, key: string;
      let attempts = 0;
      do {
        col = Math.floor(Math.random() * cols);
        row = Math.floor(Math.random() * rows);
        key = `${col}-${row}`;
        attempts++;
      } while (taken.has(key) && attempts < 50);
      taken.add(key);
      positions.push({ col, row, flickerDelay: Math.random() * 6 + delay });
    }
    return positions;
  }, [cols, rows, totalWindows, delay]);

  return (
    <div
      className="absolute bottom-0"
      style={{ left: `${left}%`, width: `${width}px`, height: `${height}px` }}
    >
      <div className="absolute inset-0 bg-[#1a1a2e]" />
      {windowPositions.map((w, i) => (
        <div
          key={i}
          className="animated-footer-window absolute h-[8px] w-[6px]"
          style={{
            left: `${(w.col / cols) * 100}%`,
            bottom: `${(w.row / rows) * 100}%`,
            animationDelay: `${w.flickerDelay}s`,
          }}
        />
      ))}
    </div>
  );
}

function Star({
  top,
  left,
  delay,
}: {
  top: number;
  left: number;
  delay: number;
}) {
  return (
    <div
      className="animated-footer-star absolute h-[2px] w-[2px] rounded-full bg-white"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

const buildings = [
  { width: 50, height: 120, left: 2, windows: 12, delay: 0 },
  { width: 35, height: 80, left: 10, windows: 6, delay: 0.5 },
  { width: 60, height: 160, left: 16, windows: 18, delay: 1 },
  { width: 30, height: 60, left: 26, windows: 4, delay: 1.5 },
  { width: 45, height: 140, left: 32, windows: 14, delay: 0.3 },
  { width: 55, height: 100, left: 40, windows: 10, delay: 0.8 },
  { width: 40, height: 180, left: 50, windows: 20, delay: 0.2 },
  { width: 35, height: 70, left: 58, windows: 5, delay: 1.2 },
  { width: 50, height: 130, left: 64, windows: 15, delay: 0.6 },
  { width: 30, height: 90, left: 72, windows: 8, delay: 1.8 },
  { width: 60, height: 150, left: 78, windows: 16, delay: 0.4 },
  { width: 40, height: 110, left: 88, windows: 10, delay: 1.1 },
];

const stars = Array.from({ length: 30 }, (_, i) => ({
  top: Math.random() * 60,
  left: Math.random() * 100,
  delay: Math.random() * 4,
}));

function AnimatedFooter({
  text,
  className,
  children,
  ...props
}: AnimatedFooterProps) {
  return (
    <footer
      data-component="animated-footer"
      className={cn(
        'relative overflow-hidden bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]',
        className,
      )}
      {...props}
    >
      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 0.1; }
          20% { opacity: 0.9; }
          40% { opacity: 0.3; }
          60% { opacity: 1; }
          80% { opacity: 0.5; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        @keyframes drift {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(calc(100vw + 100%)); }
        }
        .animated-footer-window {
          background: #ffd700;
          animation: flicker 4s ease-in-out infinite;
        }
        .animated-footer-star {
          animation: twinkle 3s ease-in-out infinite;
        }
        .animated-footer-cloud {
          animation: drift 40s linear infinite;
        }
        .animated-footer-cloud-slow {
          animation: drift 60s linear infinite;
        }
      `}</style>

      {/* Sky area with stars */}
      <div className="relative h-48">
        {stars.map((s, i) => (
          <Star key={i} top={s.top} left={s.left} delay={s.delay} />
        ))}

        {/* Clouds */}
        <div
          className="animated-footer-cloud absolute top-[20%] h-4 w-20 rounded-full bg-white/5"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="animated-footer-cloud-slow absolute top-[35%] h-3 w-14 rounded-full bg-white/5"
          style={{ animationDelay: '15s' }}
        />

        {/* Moon */}
        <div className="absolute right-[15%] top-[15%] h-10 w-10 rounded-full bg-[#f5f5dc] shadow-[0_0_20px_5px_rgba(245,245,220,0.3)]" />
      </div>

      {/* Skyline */}
      <div className="relative h-48">
        {buildings.map((b, i) => (
          <Building key={i} {...b} />
        ))}
        {/* Ground */}
        <div className="absolute bottom-0 h-2 w-full bg-[#0d0d1a]" />
      </div>

      {/* Footer content */}
      <div className="relative bg-[#0d0d1a] px-6 py-4 text-center">
        {children ?? (
          <p className="text-sm text-white/60">{text ?? '© 2026'}</p>
        )}
      </div>
    </footer>
  );
}

export { AnimatedFooter };
