import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { InternalTransitionLink } from '../page-transition/internal-transition-link';
import type { ShrineItem } from './shrine-gallery';
import { ArrowDownIcon } from '@phosphor-icons/react/dist/ssr';

interface ShrineDetailProps extends React.ComponentProps<'div'> {
  shrine: ShrineItem;
}

function ShrineDetail({ shrine, className, ...props }: ShrineDetailProps) {
  const { t } = useTranslation();
  const stickyNavRef = React.useRef<HTMLDivElement | null>(null);
  const contentNavRef = React.useRef<HTMLDivElement | null>(null);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const linksObj = React.useMemo(() => {
    const obj: Array<{ id: string; title: string }> = [];
    shrine.content?.forEach((block) => {
      block.copy.forEach((copy) => {
        if (copy.title && copy.slug) {
          obj.push({ id: copy.slug, title: copy.title });
        }
      });
    });
    return obj;
  }, [shrine.content]);
  const stickyNavClickHandler = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    const id = target.getAttribute('href')?.substring(1);
    const section = document.getElementById(id || '');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    if (linksObj.length === 0) return;

    const headings = linksObj
      .map((link) => document.getElementById(link.id))
      .filter((node): node is HTMLElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -95% 0px', threshold: 0 },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [linksObj]);

  return (
    <div data-component="shrine-detail" className={cn(className)} {...props}>
      <header className="bg-black  dark:bg-(--surface) pt-20 relative block h-[600px] mb-50">
        <div className="flex flex-col gap-10  absolute inset-x-0 bottom-0 top-[60px]">
          <div className="max-w-300 mx-auto w-full grid gap-10">
            <div className="flex items-center gap-4">
              <InternalTransitionLink
                href="/shrines"
                className="flex gap-2 pointer w-fit text-sm group ease-in-out duration-300 "
              >
                <span>
                  <ArrowDownIcon
                    weight="bold"
                    className="text-accent h-4 w-4 rotate-90 group-hover:-translate-x-2 ease-in-out duration-300"
                  />
                </span>
                <span className="text-white dark:text-foreground group-hover:underline">
                  {t('shrines.detail.backLink')}
                </span>
              </InternalTransitionLink>
              <div className="flex-1 h-px bg-accent" />
            </div>
            <h1 className="text-4xl  text-gray-50 dark:text-foreground font-bold  sm:text-5xl font-serif">
              {shrine.title}
            </h1>
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
        <section className="max-w-300 mx-auto w-full flex gap-4">
          <div className="prose max-w-none flex-3/4" ref={contentNavRef}>
            {shrine.content.map((block, blockIndex) =>
              block.copy.map((copy, copyIndex) => {
                const image = block.image?.[copyIndex];
                return (
                  <React.Fragment
                    key={`${copy.slug}__${blockIndex}_${copyIndex}`}
                  >
                    {copy.title && (
                      <h2
                        id={copy.slug}
                        className="max-w-200 w-full mx-auto text-foreground"
                      >
                        {copy.title}
                      </h2>
                    )}
                    {copy.value && (
                      <p className="max-w-200 w-full mx-auto text-foreground">
                        {copy.value}
                      </p>
                    )}
                    {image && image.src !== '' && (
                      <figure className="h-50 w-full overflow-hidden bg-(--surface)">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="h-full w-full object-cover object-center"
                        />
                      </figure>
                    )}
                  </React.Fragment>
                );
              }),
            )}
          </div>
          <aside
            className="flex flex-1 p-8 flex-col gap-6 border-t border-(--surface-strong) pt-0 pr-0"
            ref={stickyNavRef}
          >
            <nav className="inner-nav sticky top-20">
              <div className="border-b border-b-accent pb-2 mb-4 w-full">
                <span className="text-lg font-bold">On this page</span>
              </div>
              <ul className="flex flex-col gap-4">
                {linksObj.map((link, idx) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className={cn(
                        'text-accent group flex gap-4',
                        link.id === activeId && 'active-id',
                      )}
                      onClick={stickyNavClickHandler}
                    >
                      <span
                        className="text-transparent [.active-id_&]:text-foreground font-bold"
                        aria-hidden="true"
                      >
                        |
                      </span>
                      <span className="text-accent group-hover:underline">
                        {link.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </section>
      )}

      {shrine.gallery && shrine.gallery.length > 0 && (
        <footer className="max-w-300 mx-auto w-full">
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
        </footer>
      )}
    </div>
  );
}

export { ShrineDetail };
export type { ShrineDetailProps };
