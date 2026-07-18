import { Button } from '../ui/button';
import type { SliderSlide } from './types';

interface SlideContentProps {
  slide: SliderSlide;
}

export function SlideContent({ slide }: SlideContentProps) {
  return (
    <>
      <h2
        className="text-4xl @lg:text-5xl font-bold text-[var(--sea-ink)] dark:text-white mb-2"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        {slide.right.title}
      </h2>
      <div className="w-full max-w-[90%] h-0.5 bg-[var(--sea-ink)] mx-auto mb-4" />
      <div className="max-w-xl flex-1 flex flex-col">
        <p className="text-sm @lg:text-base text-[var(--sea-ink-soft)] dark:text-white/80 mb-6 max-h-48 overflow-hidden">
          {slide.right.description}
        </p>
        <div className="w-8 h-px bg-[var(--sea-ink)] mx-auto mb-4" />
        <ul className="list-disc list-inside mb-8 space-y-1 text-sm @lg:text-base text-[var(--sea-ink)] dark:text-white">
          {slide.right.list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="mt-auto">
        <Button
          asChild
          size="lg"
          className="bg-[var(--lagoon)] text-white hover:bg-[var(--lagoon-deep)]"
        >
          <a
            href={slide.right.link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {slide.right.link.copy ?? 'Go to site'}
          </a>
        </Button>
      </div>
    </>
  );
}
