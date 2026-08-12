import { LinkedinLogoIcon, GithubLogoIcon } from '@phosphor-icons/react';
import { cn } from '../../lib/utils';
import type { FooterProps } from '@general-purpose/types';

const VIEWBOX_HEIGHT = 40;

interface TentacleConfig {
  baseX: number;
  baseWidth: number;
  height: number;
  curl: number;
}

const TENTACLES: TentacleConfig[] = [
  { baseX: 2, baseWidth: 5, height: 55, curl: 8 },
  { baseX: 28, baseWidth: 7, height: 34, curl: 14 },
  { baseX: 38, baseWidth: 6, height: 26, curl: -10 },
  { baseX: 158, baseWidth: 6, height: 26, curl: 10 },
  { baseX: 168, baseWidth: 7, height: 34, curl: -14 },
  { baseX: 196, baseWidth: 5, height: 58, curl: -8 },
];

function tentaclePath({ baseX, baseWidth, height, curl }: TentacleConfig) {
  const tipX = baseX + curl;
  const tipWidth = Math.max(baseWidth * 0.08, 0.6);
  const midX1 = baseX + curl * 0.35;
  const midX2 = baseX + curl * 0.7;
  const midY1 = VIEWBOX_HEIGHT - height * 0.4;
  const midY2 = VIEWBOX_HEIGHT - height * 0.75;
  const tipY = VIEWBOX_HEIGHT - height;

  return `M ${baseX - baseWidth / 2} ${VIEWBOX_HEIGHT}
    C ${midX1 - baseWidth * 0.3} ${midY1}, ${midX2 - tipWidth} ${midY2}, ${tipX - tipWidth / 2} ${tipY}
    L ${tipX + tipWidth / 2} ${tipY}
    C ${midX2 + tipWidth} ${midY2}, ${midX1 + baseWidth * 0.3} ${midY1}, ${baseX + baseWidth / 2} ${VIEWBOX_HEIGHT}
    Z`;
}

function LogoMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-8 w-8 shrink-0" aria-hidden="true">
      {Array.from({ length: 10 }, (_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const radius = 14 - (i % 3) * 2;
        return (
          <circle
            key={i}
            cx={20 + Math.cos(angle) * radius}
            cy={20 + Math.sin(angle) * radius}
            r={1.6}
            fill="none"
            stroke="var(--lagoon-deep)"
            strokeWidth={1}
          />
        );
      })}
    </svg>
  );
}

function Footer({
  logoText = 'Beautiful Tragedy',
  linkedinHref = '#',
  githubHref = '#',
  year = new Date().getFullYear(),
  className,
  ...props
}: FooterProps) {
  return (
    <footer
      data-component="footer"
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      <svg
        viewBox={`0 0 200 ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="none"
        className="relative block h-24 w-full sm:h-40"
        aria-hidden="true"
      >
        {TENTACLES.map((tentacle, i) => (
          <path key={i} d={tentaclePath(tentacle)} fill="black" />
        ))}
      </svg>

      <div className="relative flex flex-col gap-4 border-t border-white/10 bg-black px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <LogoMark />
          <span className="font-bold text-[var(--lagoon-deep)]">
            {logoText}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-white/60">@ {year}</span>
          <a
            href={linkedinHref}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="rounded border border-white/20 p-2 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <LinkedinLogoIcon aria-hidden="true" className="h-4 w-4" />
          </a>
          <a
            href={githubHref}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded border border-white/20 p-2 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <GithubLogoIcon aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
