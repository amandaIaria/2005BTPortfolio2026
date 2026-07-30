import { useMemo } from 'react';
import json from '@json/data/json/art.json';

interface ArtItem {
  title: string;
  image: {
    src: string;
    alt: string;
    height: number;
    width: number;
  };
}

// CSS columns fills column-major in DOM order. The source data cycles through
// aspect ratios every 5 items, which lines up evenly with 3 columns of 10 and
// makes every row the same height (looks like a grid, not masonry). Interleaving
// by index % 3 breaks that alignment so column heights actually stagger.
function interleaveForColumns<T>(items: T[], columnCount: number): T[] {
  const columns: T[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((item, index) => columns[index % columnCount].push(item));
  return columns.flat();
}

export function ArtGallery() {
  const items = useMemo(() => interleaveForColumns(json as ArtItem[], 3), []);

  return (
    <div
      data-component="art-gallery"
      className="columns-1 gap-4 p-4 sm:columns-2 sm:gap-6 sm:p-6 lg:columns-3"
    >
      {items.map((item, index) => (
        <figure
          key={index}
          className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-(--surface) shadow-sm transition-shadow duration-300 hover:shadow-lg sm:mb-6"
        >
          <img
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            loading="lazy"
            className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-(--sea-ink)/85 via-(--sea-ink)/30 to-transparent p-4 pt-10 text-sm font-medium text-white">
            {item.title}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
