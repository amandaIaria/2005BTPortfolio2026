import * as React from 'react';
import { cn } from '../lib/utils';

interface SpriteAnimationProps extends React.ComponentProps<'div'> {
  /** Path to the sprite sheet image */
  src: string;
  /** Number of columns in the sprite sheet */
  columns: number;
  /** Number of rows in the sprite sheet */
  rows: number;
  /** Total number of frames (defaults to columns * rows) */
  frameCount?: number;
  /** Width of each frame in pixels */
  frameWidth: number;
  /** Height of each frame in pixels */
  frameHeight: number;
  /** Duration of one full animation cycle in milliseconds */
  duration?: number;
  /** Whether the animation is playing */
  playing?: boolean;
  /** Scale factor for display size (default: 1) */
  scale?: number;
}

function SpriteAnimation({
  src,
  columns,
  rows,
  frameCount,
  frameWidth,
  frameHeight,
  duration = 1000,
  playing = true,
  scale = 1,
  className,
  style,
  ...props
}: SpriteAnimationProps) {
  const totalFrames = frameCount ?? columns * rows;
  const canvasRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef(0);
  const rafRef = React.useRef<number>(0);
  const lastTimeRef = React.useRef(0);

  const displayWidth = frameWidth * scale;
  const displayHeight = frameHeight * scale;
  const msPerFrame = duration / totalFrames;

  React.useEffect(() => {
    const el = canvasRef.current;
    if (!el || !playing) return;

    const step = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const elapsed = timestamp - lastTimeRef.current;

      if (elapsed >= msPerFrame) {
        frameRef.current = (frameRef.current + 1) % totalFrames;
        lastTimeRef.current = timestamp;

        const col = frameRef.current % columns;
        const row = Math.floor(frameRef.current / columns);

        el.style.backgroundPosition = `-${col * displayWidth}px -${row * displayHeight}px`;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = 0;
    };
  }, [playing, totalFrames, columns, msPerFrame, displayWidth, displayHeight]);

  return (
    <div
      data-component="sprite-animation"
      ref={canvasRef}
      className={cn('inline-block', className)}
      style={{
        width: displayWidth,
        height: displayHeight,
        backgroundImage: `url(${src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${columns * displayWidth}px ${rows * displayHeight}px`,
        backgroundPosition: '0px 0px',
        ...style,
      }}
      role="img"
      aria-label="Sprite animation"
      {...props}
    />
  );
}

export { SpriteAnimation };
export type { SpriteAnimationProps };
