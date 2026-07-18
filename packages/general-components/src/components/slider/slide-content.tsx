import { Button } from '../ui/button';
import type { SliderSlide } from './types';

interface SlideContentProps {
  slide: SliderSlide;
}

export function SlideContent({ slide }: SlideContentProps) {
  return (
    <div className="slider-content">
      <h2 className="slider-heading mb-2">{slide.right.title}</h2>
      <div className="w-full max-w-[90%] h-0.5 mx-auto mb-4" />
      <div className="max-w-xl flex-1 flex flex-col">
        <p className="mb-6 max-h-48 overflow-hidden">
          {slide.right.description}
        </p>
        <div className="w-8 h-px mx-auto mb-4" />
        <ul className="list-disc list-inside mb-8 space-y-1 text-sm @lg:text-base  dark:text-white">
          {slide.right.list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="mt-auto">
        <Button asChild size="lg" className="slider-button">
          <a
            href={slide.right.link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {slide.right.link.copy ?? 'Go to site'}
          </a>
        </Button>
      </div>
    </div>
  );
}
