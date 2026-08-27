import { useEffect, useMemo, useState } from 'react';
import { cn } from '../../lib/utils';
import type { HeroProps } from '@packages/general-components/src/components/types.ts';
import { useReducedMotion } from 'framer-motion';

type Segment =
  | { kind: 'text'; text: string; accent: boolean }
  | { kind: 'break' };

type Stage = 'idle' | 'name' | 'namePause' | 'heading' | 'caption' | 'done';

const STAGE_ORDER: Stage[] = [
  'idle',
  'name',
  'namePause',
  'heading',
  'caption',
  'done',
];

const TYPE_SPEED_MS = 45;
const NAME_PAUSE_MS = 800;

function phaseFor(stage: Stage, target: Stage) {
  const stageIndex = STAGE_ORDER.indexOf(stage);
  const targetIndex = STAGE_ORDER.indexOf(target);
  if (stageIndex < targetIndex) return 'pending';
  if (stageIndex === targetIndex) return 'active';
  return 'complete';
}

// Copy uses a tiny fixed markup vocabulary (`<br />`, `<accent>...</accent>`)
// authored directly in the i18n JSON, not user input, so a straightforward
// tag-scanning regex is fine here — no nesting or adversarial input to worry
// about.
const MARKUP_PATTERN = /<br\s*\/?>|<accent>([\s\S]*?)<\/accent>/gi;

function parseMarkup(raw: string): Segment[] {
  const segments: Segment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = MARKUP_PATTERN.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        kind: 'text',
        text: raw.slice(lastIndex, match.index),
        accent: false,
      });
    }
    if (/^<br/i.test(match[0])) {
      segments.push({ kind: 'break' });
    } else {
      segments.push({ kind: 'text', text: match[1], accent: true });
    }
    lastIndex = MARKUP_PATTERN.lastIndex;
  }
  if (lastIndex < raw.length) {
    segments.push({ kind: 'text', text: raw.slice(lastIndex), accent: false });
  }
  return segments;
}

function segmentLength(segment: Segment) {
  return segment.kind === 'break' ? 1 : segment.text.length;
}

function sliceSegments(segments: Segment[], count: number): Segment[] {
  let remaining = count;
  const result: Segment[] = [];
  for (const segment of segments) {
    if (remaining <= 0) break;
    if (segment.kind === 'break') {
      result.push(segment);
      remaining -= 1;
      continue;
    }
    if (segment.text.length <= remaining) {
      result.push(segment);
      remaining -= segment.text.length;
    } else {
      result.push({
        kind: 'text',
        text: segment.text.slice(0, remaining),
        accent: segment.accent,
      });
      remaining = 0;
    }
  }
  return result;
}

function renderSegments(segments: Segment[]) {
  return segments.map((segment, index) => {
    if (segment.kind === 'break') return <br key={`break-${index}`} />;
    if (segment.accent) {
      return (
        <span key={`accent-${index}`} className="text-accent">
          {segment.text}
        </span>
      );
    }
    return segment.text;
  });
}

function useTypewriter(segments: Segment[], active: boolean) {
  const total = useMemo(
    () => segments.reduce((sum, segment) => sum + segmentLength(segment), 0),
    [segments],
  );
  const [count, setCount] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!active) return;
    if (total === 0) {
      setFinished(true);
      return;
    }
    setCount(0);
    setFinished(false);
    const id = setInterval(() => {
      setCount((current) => {
        const next = current + 1;
        if (next >= total) {
          clearInterval(id);
          setFinished(true);
          return total;
        }
        return next;
      });
    }, TYPE_SPEED_MS);
    return () => clearInterval(id);
  }, [active, total]);

  return { visible: sliceSegments(segments, count), finished };
}

function Hero({
  image,
  topText,
  bottomText,
  caption,
  heading,
  hiddenH1,
  className,
  nameStatement,
  startAnimation = true,
  ...props
}: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [stage, setStage] = useState<Stage>(() => {
    if (prefersReducedMotion) return 'done';
    return startAnimation ? 'name' : 'idle';
  });

  useEffect(() => {
    if (startAnimation) {
      setStage((current) => (current === 'idle' ? 'name' : current));
    }
  }, [startAnimation]);

  const nameSegments = useMemo(
    () => parseMarkup(nameStatement),
    [nameStatement],
  );
  const headingSegments = useMemo(() => parseMarkup(heading), [heading]);
  const captionSegments = useMemo(() => parseMarkup(caption), [caption]);

  const nameTyper = useTypewriter(nameSegments, stage === 'name');
  const headingTyper = useTypewriter(headingSegments, stage === 'heading');
  const captionTyper = useTypewriter(captionSegments, stage === 'caption');

  useEffect(() => {
    if (stage === 'name' && nameTyper.finished) setStage('namePause');
  }, [stage, nameTyper.finished]);

  useEffect(() => {
    if (stage !== 'namePause') return;
    const id = setTimeout(() => setStage('heading'), NAME_PAUSE_MS);
    return () => clearTimeout(id);
  }, [stage]);

  useEffect(() => {
    if (stage === 'heading' && headingTyper.finished) setStage('caption');
  }, [stage, headingTyper.finished]);

  useEffect(() => {
    if (stage === 'caption' && captionTyper.finished) setStage('done');
  }, [stage, captionTyper.finished]);

  const namePhase = phaseFor(stage, 'name');
  const headingPhase = phaseFor(stage, 'heading');
  const captionPhase = phaseFor(stage, 'caption');

  function contentFor(
    phase: 'pending' | 'active' | 'complete',
    segments: Segment[],
    typed: Segment[],
  ) {
    return renderSegments(phase === 'active' ? typed : segments);
  }

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

      <div className="absolute inset-1/2 -translate-y-96 -translate-x-200 p-4 text-center h-fit w-fit block">
        <p className="text-8xl font-bold leading-none tracking-tight text-white uppercase mix-blend-difference">
          <span className={cn(namePhase === 'pending' && 'invisible')}>
            {contentFor(namePhase, nameSegments, nameTyper.visible)}
          </span>
          &nbsp;
          <span
            className={cn(
              'text-accent',
              (stage === 'namePause' || stage === 'done') &&
                'motion-safe:animate-cursor-blink',
            )}
          >
            |
          </span>
        </p>
      </div>

      <div className="absolute inset-1/2 ml-70 -mt-40  p-4 text-center h-fit w-fit block">
        <p
          className={cn(
            'text-5xl font-bold tracking-tight text-white mix-blend-difference',
            headingPhase === 'pending' && 'invisible',
          )}
        >
          {contentFor(headingPhase, headingSegments, headingTyper.visible)}
        </p>
        <p
          className={cn(
            'text-xl leading-none tracking-tight text-accent capitalize',
            captionPhase === 'pending' && 'invisible',
          )}
        >
          {contentFor(captionPhase, captionSegments, captionTyper.visible)}
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
