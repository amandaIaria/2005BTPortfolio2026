import json from '@json/data/json/shrines.json';
import { InternalTransitionLink } from '../page-transition/internal-transition-link';
import type { ShrineListItemProps, ShrineListingProps } from '@general/types';
import { PortfolioImage } from '../atoms/portfolio-image';

const items = json.listing as ShrineListItemProps[];

function ShrineListing({ kicker, heading, intro }: ShrineListingProps) {
  return (
    <div
      data-component="shrine-gallery"
      className="grid grid-cols-1 lg:grid-cols-2"
    >
      <div className="flex aspect-square flex-col justify-center gap-3 bg-(--surface) p-6 sm:p-8">
        {kicker && (
          <p className="text-sm font-medium tracking-wide text-accent uppercase">
            {kicker}
          </p>
        )}
        <h1 className="">{heading}</h1>
        {intro && <p className="text-(--sea-ink-soft)">{intro}</p>}
      </div>
      {items.map((item) => (
        <InternalTransitionLink
          key={item.slug}
          href={`/shrines/${item.slug}`}
          className="before:bg-transparent w-full h-full group relative aspect-square overflow-hidden bg-(--surface) shadow-sm transition-shadow duration-300 hover:shadow-lg m-0 p-0"
        >
          
            <PortfolioImage
                imageClasses="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                cn="h-full w-full"
                image={{
                  src: item.image.src,
                  alt: item.image.alt
                }}
              />

            
        </InternalTransitionLink>
      ))}
    </div>
  );
}

export { ShrineListing };
