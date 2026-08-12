import { ExternalTransitionLink } from '../page-transition/external-transition-link';
import { PortfolioButton } from '../portfolio-button';
import SliderTags from './slider-tags';
import type { SlideContentProps } from '@general-purpose/types';

export function SlideContent({ slide }: SlideContentProps) {
  return (
    <div className="slider-content">
      <h2 className="slider-heading text-4xl @lg:text-5xl font-bold dark:text-white mb-2">
        {slide.right.title}
      </h2>
      <div className="w-full h-1 mx-auto my-6 bg-accent" />
      <div className="max-w-xl flex-1 flex flex-col">
        <p className="text-sm @lg:text-base dark:text-white/80 max-h-48 overflow-hidden mb-4">
          {slide.right.description}
        </p>
        <div className="text-right text-lg">
          <p>
            Company:{' '}
            <span className="font-bold text-accent">{slide.right.company}</span>
          </p>
        </div>
        <div className="w-full max-w-[8%] h-[2px] mx-auto my-10 bg-accent" />
        <ul className="mb-8 space-y-4 text-sm @lg:text-base">
          {slide.right.list.map((item, i) => (
            <li key={i} className="list-item-chevron">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto flex justify-between items-center">
        <SliderTags tags={slide.right.tags} />
        <PortfolioButton asChild size="lg" className="slider-button">
          <ExternalTransitionLink href={slide.right.link.url}>
            {slide.right.link.copy ?? 'Go to site'}
          </ExternalTransitionLink>
        </PortfolioButton>
      </div>
    </div>
  );
}
