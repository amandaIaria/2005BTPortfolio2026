import json from '@json/data/json/shrines.json';
import { InternalTransitionLink } from '../page-transition/internal-transition-link';
import type { ShrineListItemProps, ShrineListingProps } from '@general/types';

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
          className="w-full h-full group relative aspect-square overflow-hidden bg-(--surface) shadow-sm transition-shadow duration-300 hover:shadow-lg m-0 p-0"
        >
          <figure className="h-full w-full">
            <img
              src={item.image.src}
              alt={item.image.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <figcaption className="absolute inset-0 flex items-end bg-black/0 p-4 opacity-0 transition-all duration-300 group-hover:bg-black/85 group-hover:opacity-100">
              <div className="translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-1 text-sm text-white/80">
                    {item.description}
                  </p>
                )}
              </div>
            </figcaption>
          </figure>
        </InternalTransitionLink>
      ))}
    </div>
  );
}

export { ShrineListing };
