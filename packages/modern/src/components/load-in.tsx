import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
} from 'motion/react';
import type { MotionValue } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoadInCard from './load-in-card';
import { PlayIcon } from '@phosphor-icons/react';

export const boxScale = { scale: 1.4 };

const HALF_SIZE = 48; // half of the 96px (h-24/w-24) card
const CORNER_RADIUS = 18; // matches --radius-2xl override, src/styles.css:175
const EDGE = HALF_SIZE - CORNER_RADIUS; // 30 — half-length of each straight edge
const ARC_LEN = (Math.PI / 2) * CORNER_RADIUS;
const PERIMETER = 4 * (2 * EDGE) + 4 * ARC_LEN; // ~353.1
const LOOP_MS = 20000; // duration of one full lap — matches the group orbit's 360deg/20000ms period, opposite direction

// Walks the rounded-rect outline clockwise starting at the top edge's left end.
// Returns the point (relative to card center) and the OUTWARD normal angle in
// degrees using the same convention PlayIcon's native rotation follows (0=right,
// 90=down, 180=left, 270=up, clockwise) — for straight edges the outward angle
// is constant; for corner arcs it's just the arc's own sweep angle, since a
// circle's radial direction *is* its parametrizing angle.
function pointOnCardPerimeter(t: number) {
  const segments = [
    { len: 2 * EDGE, kind: 'edge', axis: 'top' },
    { len: ARC_LEN, kind: 'corner', from: -90, cx: EDGE, cy: -EDGE },
    { len: 2 * EDGE, kind: 'edge', axis: 'right' },
    { len: ARC_LEN, kind: 'corner', from: 0, cx: EDGE, cy: EDGE },
    { len: 2 * EDGE, kind: 'edge', axis: 'bottom' },
    { len: ARC_LEN, kind: 'corner', from: 90, cx: -EDGE, cy: EDGE },
    { len: 2 * EDGE, kind: 'edge', axis: 'left' },
    { len: ARC_LEN, kind: 'corner', from: 180, cx: -EDGE, cy: -EDGE },
  ] as const;

  let remaining = t;
  for (const seg of segments) {
    if (remaining > seg.len) {
      remaining -= seg.len;
      continue;
    }
    if (seg.kind === 'edge') {
      const frac = remaining / seg.len;
      const table = {
        top: { x: -EDGE + frac * 2 * EDGE, y: -HALF_SIZE, outward: -90 },
        right: { x: HALF_SIZE, y: -EDGE + frac * 2 * EDGE, outward: 0 },
        bottom: { x: EDGE - frac * 2 * EDGE, y: HALF_SIZE, outward: 90 },
        left: { x: -HALF_SIZE, y: EDGE - frac * 2 * EDGE, outward: 180 },
      };
      return table[seg.axis];
    }
    const angleDeg = seg.from + (remaining / seg.len) * 90;
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: seg.cx + CORNER_RADIUS * Math.cos(angleRad),
      y: seg.cy + CORNER_RADIUS * Math.sin(angleRad),
      outward: angleDeg,
    };
  }
  // Unreachable: segments sum to PERIMETER and t is always wrapped below it.
  return { x: -EDGE, y: -HALF_SIZE, outward: -90 };
}

function OrbitIcon({
  progress,
  rotate,
  effectiveRestRef,
  index,
  startingPosition,
}: {
  progress: MotionValue<number>;
  rotate: MotionValue<number>;
  effectiveRestRef: React.RefObject<{ x: number; y: number }[]>;
  index: number;
  startingPosition: { x: number; y: number; rotate: number };
}) {
  const transform = useTransform([progress, rotate], (latest) => {
    const [p, r] = latest as [number, number];
    // Holds the hand-tuned starting pose until the loop has actually moved,
    // then hands off to the perimeter march.
    if (p === 0) {
      const { x, y, rotate: startRotate } = startingPosition;
      return `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${startRotate}deg)`;
    }
    const t = ((p % PERIMETER) + PERIMETER) % PERIMETER;
    const { x, y } = pointOnCardPerimeter(t);
    // Aim at the shared ORBIT center (the portrait). `effectiveRest` is this
    // card's rest offset PLUS its own CSS-grid cell base position (measured
    // once on mount — the grid's per-cell layout isn't centered at the
    // portrait by itself, `rest` alone doesn't capture the full offset),
    // rotated by the group's live `rotate`.
    const rest = effectiveRestRef.current[index];
    const theta = (r * Math.PI) / 180;
    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);
    const cardX = rest.x * cosT - rest.y * sinT;
    const cardY = rest.x * sinT + rest.y * cosT;
    const rotateDeg =
      Math.atan2(-(y + cardY), -(x + cardX)) * (180 / Math.PI);
    return `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotateDeg}deg)`;
  });

  return (
    <motion.div
      className="pointer-events-none absolute top-1/2 left-1/2"
      style={{ transform }}
    >
      <PlayIcon weight="fill" className="text-[#ff0000]" />
    </motion.div>
  );
}

export default function LoadIn({
  json,
}: {
  json: { href: string; label: string }[];
}) {
  const { t } = useTranslation();
  const rotate = useMotionValue(0);
  const rotateOpposite = useMotionValue(0);
  const progress = useMotionValue(0);
  const isPaused = useRef(true); // starts paused so caretStartingPosition is actually visible until hover
  const [groupHovered, setGroupHovered] = useState(false);
  const ulRef = useRef<HTMLUListElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const general = {
    whileHover: { ...boxScale, zIndex: 100 },
  };

  const circle = [
    {
      // 0
      rest: { x: 124, y: 73 },
      hover: { x: 0, y: 0 },
      caretStartingPosition: { x: 96, y: 0, rotate: 30 },
      ...general,
    },

    {
      // 1
      rest: { x: 0, y: -100 },
      hover: { x: 0, y: -73 },
      caretStartingPosition: { x: 44, y: 0, rotate: 210 },
      ...general,
    },

    {
      // 2
      rest: { x: -124, y: 73 },
      hover: { x: 0, y: 0 },
      caretStartingPosition: { x: 0, y: 0, rotate: 0 },
      ...general,
    },

    {
      // 3
      rest: { x: 124, y: 0 },
      hover: { x: -73, y: 0 },
      caretStartingPosition: { x: 96, y: -44, rotate: 0 },
      ...general,
    },

    {
      // 4
      rest: { x: 0, y: 0 },
      hover: { x: 0, y: 0 },
      caretStartingPosition: { x: 96, y: -44, rotate: 0 },
      ...general,
    },

    {
      // 5
      rest: { x: -124, y: 0 },
      hover: { x: 73, y: 0 },
      caretStartingPosition: { x: -16, y: -43, rotate: 180 },
      ...general,
    },

    {
      // 6
      rest: { x: 124, y: -73 },
      hover: { x: 0, y: 0 },
      caretStartingPosition: { x: 96, y: -103, rotate: 323 },
      ...general,
    },

    {
      // 7
      rest: { x: 0, y: 100 },
      hover: { x: 0, y: 73 },
      caretStartingPosition: { x: 44, y: -114, rotate: 145 },
      ...general,
    },

    {
      // 8
      rest: { x: -124, y: -73 },
      hover: { x: 0, y: 0 },
      caretStartingPosition: { x: -16, y: -96, rotate: 90 },
      ...general,
    },
  ];

  // `rest` alone doesn't capture a card's full offset from the true rotation
  // pivot — these sit in an actual CSS grid, so each cell also has its own
  // base position. Measured once on mount (cheap, no per-frame layout cost):
  // the real measured offset, un-rotated back to the zero-rotation reference
  // frame, already equals `rest + gridCellBase` combined — exactly the
  // constant the per-frame analytical rotation math (in OrbitIcon) needs.
  //
  // The pivot is the UL's OWN bounding-rect center, not the portrait's
  // rendered position — verified empirically that a card's distance from the
  // UL's center stays exactly constant as `rotate` changes, while distance
  // to the portrait does not (the portrait sits in an asymmetrically-sized
  // grid cell — its own large h-100 w-100 wrapper plus negative margins on
  // the image — so it isn't quite at the true pivot itself).
  const effectiveRestRef = useRef(circle.map((c) => ({ ...c.rest })));

  useEffect(() => {
    const ulEl = ulRef.current;
    if (!ulEl) return;
    const ur = ulEl.getBoundingClientRect();
    const px = ur.x + ur.width / 2;
    const py = ur.y + ur.height / 2;
    const theta = (rotate.get() * Math.PI) / 180;
    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const ex = r.x + r.width / 2;
      const ey = r.y + r.height / 2;
      const offsetX = ex - px;
      const offsetY = ey - py;
      // Inverse rotation R(-theta) to bring the measured offset back to the
      // group's zero-rotation reference frame.
      effectiveRestRef.current[i] = {
        x: offsetX * cosT + offsetY * sinT,
        y: -offsetX * sinT + offsetY * cosT,
      };
    });
  }, []);

  useAnimationFrame((_t, delta) => {
    if (isPaused.current) return;
    progress.set(progress.get() + delta * (PERIMETER / LOOP_MS));
    rotate.set(rotate.get() + delta * (360 / 20000));
    rotateOpposite.set(-rotate.get());
  });

  return (
    <section className="relative -m-10 -mt-20">
      {/*
        This componet is the first component in the modern site that has a self portrait with bubbles as the navigation.
        hover over the bubbles and tentacles grab the bubble and move it around.
        on click the view port zooms into the bubble and the next page is loaded.
      */}
      <div className="w-screen h-screen p-0 m-1 grid place-items-center">
        <nav>
          <motion.ul
            ref={ulRef}
            className="list-none grid grid-cols-3 gap-4 w-full h-full place-items-center"
            // animate={{ rotate: 20, transition: { duration: 0.2 } }}
            style={{ rotate }}
            animate="rest"
            onHoverStart={() => {
              isPaused.current = true;
              setGroupHovered(true);
            }}
            onHoverEnd={() => {
              isPaused.current = false;
              setGroupHovered(false);
            }}
          >
            {json.map((item: { href: string; label: string }, index: number) =>
              index !== 4 ? (
                <motion.li
                  key={index}
                  className={`pointer link__${index}`}
                  style={{ rotate: rotateOpposite }}
                  whileHover={circle[index].whileHover}
                  variants={circle[index]}
                  animate={groupHovered ? 'hover' : 'rest'}
                >
                  {item.label !== '' && (
                    <div
                      ref={(el) => {
                        cardRefs.current[index] = el;
                      }}
                      className="h-24 w-24 relative"
                    >
                      <LoadInCard className="h-full w-full rounded-2xl bg-white">
                        <a
                          href={item.href}
                          className="h-full w-full text-black grid items-center justify-center text-center"
                        >
                          <span>{item.label} {index}</span>
                        </a>
                      </LoadInCard>
                      <OrbitIcon
                        progress={progress}
                        rotate={rotate}
                        effectiveRestRef={effectiveRestRef}
                        index={index}
                        startingPosition={circle[index].caretStartingPosition}
                      />
                    </div>
                  )}
                </motion.li>
              ) : (
                <motion.li
                  className="z-10"
                  style={{ rotate: rotateOpposite }}
                  key={index}
                >
                  <div className="rounded-full bg-transparent h-100 w-100">
                    <div className="h-full w-full grid place-items-center ">
                      <img
                        src="/Object.png"
                        alt={t('loadIn.selfPortraitAlt')}
                        className="relative -mt-22 -ml-5"
                      />
                    </div>
                  </div>
                </motion.li>
              ),
            )}
          </motion.ul>
        </nav>
      </div>
    </section>
  );
}
