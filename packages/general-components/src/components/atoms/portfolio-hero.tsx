import { Hero } from '../ui/hero';
import type { HeroProps } from '@packages/general-components/src/components/types.ts';

function PortfolioHero(props: HeroProps) {
  return <Hero data-component="portfolio-hero" {...props} />;
}

export { PortfolioHero };
