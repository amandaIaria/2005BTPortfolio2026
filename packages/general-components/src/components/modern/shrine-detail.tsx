import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { InternalTransitionLink } from '../page-transition/internal-transition-link';
import { ArrowDownIcon } from '@phosphor-icons/react/dist/ssr';
import { Footer } from './footer';
import { Breadcrumb } from './breadcrumb';
import { StickySideNav } from './sticky-side-nav';
import type { ShrineDetailProps } from '@packages/general-components/src/components/types.ts';

function ShrineDetail({ shrine, className, ...props }: ShrineDetailProps) {
  const { t } = useTranslation();
  const contentNavRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div data-component="shrine-detail" className={cn(className)} {...props}>
      <header className="bg-black dark:bg-(--surface) pt-20 relative block h-150 mb-50">
        <div className="flex flex-col gap-10  absolute inset-x-0 bottom-0 top-[60px]">
          <div className="max-w-300 mx-auto w-full grid gap-10">
            <Breadcrumb href="/shrines" label={t('shrines.detail.backLink')} />
          </div>

          <div className="">
            <div className="flex">
              <figure className="aspect-video overflow-hidden bg-(--surface) basis-[calc(50%+250px)] rounded-r-lg z-2 max-h-[500px]">
                <img
                  src={shrine.image.src}
                  alt={shrine.image.alt}
                  className="h-full w-full object-cover object-top"
                />
              </figure>
              {shrine.description && (
                <div className="bg-accent  pt-4 relative h-[500px] w-full basis-[300px] grid bottom-0 z-1 -ml-8">
                  <p className="text-3xl  text-foreground mix-blend-difference absolute bottom-10 left-[80px] w-[300px] ">
                    {shrine.description}
                  </p>
                </div>
              )}
              <div className="basis-[calc(25%-300px)] " />
            </div>
          </div>
          <div />
        </div>
      </header>

      {shrine.content && shrine.content.length > 0 && (
        <section className="max-w-300 mx-auto w-full flex gap-4 relative z-10">
          <div className="prose max-w-none flex-[60%]" ref={contentNavRef}>
            {shrine.content.map((content, blockIndex) => {
              // block.copy.map((copy, copyIndex) => {
              //   const image = block.image?.[copyIndex];
              return (
                <React.Fragment
                  key={`${content.id}__${blockIndex}_${blockIndex}`}
                >
                  {content.title && (
                    <h2
                      id={content.id}
                      className="max-w-200 w-full mx-auto text-foreground"
                    >
                      {content.title}
                    </h2>
                  )}
                  {content.copy && (
                    <p className="max-w-200 w-full mx-auto text-foreground">
                      {content.copy}
                    </p>
                  )}
                  {content.image && content.image.src !== '' && (
                    <figure className="h-50 w-full overflow-hidden bg-(--surface)">
                      <img
                        src={content.image.src}
                        alt={content.image.alt}
                        className="h-full w-full object-cover object-center"
                      />
                    </figure>
                  )}
                </React.Fragment>
              );
              // }),
            })}
          </div>
          <StickySideNav
            content={shrine}
            navLabel={t('shrines.navSidebarLabel')}
          />
        </section>
      )}

      {shrine.gallery && shrine.gallery.length > 0 && (
        <div className="backdrop-blur-lg max-w-300 w-full relative z-10 mx-auto pt-20">
          <div className="flex flex-col gap-6 border-t border-(--surface-strong) pt-12">
            <h2 className="text-sm font-medium tracking-wide text-accent uppercase">
              {t('shrines.detail.galleryHeading')}
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {shrine.gallery.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden bg-(--surface)"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export { ShrineDetail };
