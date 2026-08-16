import { useEffect, useRef, useState, useMemo } from 'react';
import { cn } from '@general/components/lib/utils.ts';
import type { StickySideNavProps } from '@packages/general-components/src/components/types.ts';

// should the memo be in this component or should it be in the parent

export const StickySideNav = (props: StickySideNavProps) => {
  const { content, navLabel } = props;
  const stickyNavRef = useRef<HTMLDivElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>('0');
  const linksObj = useMemo(() => {
    const obj: Array<{ id: string; title: string }> = [];
    content.content?.forEach((block) => {
      if (block.title && block.id) {
        obj.push({ id: block.id, title: block.title });
      }
    });
    return obj;
  }, [content.content]);
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

  useEffect(() => {
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
    <aside
      data-component="stick-side-nav"
      className="flex flex-1 p-8 flex-col gap-6 border-t border-(--surface-strong) pt-0 pl-0 pr-0"
      ref={stickyNavRef}
    >
      <nav className="inner-nav sticky top-4 bg-(--surface)/90 backdrop-blur-md rounded-2xl shadow-lg border border-(--surface-strong) p-4">
        <div className="border-b border-b-accent pb-2 mb-4 w-full">
          <span className="text-lg font-bold">{navLabel}</span>
        </div>
        <ul className="flex flex-col gap-4">
          {linksObj.map((link, idx) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={cn(
                  'text-accent group flex gap-4 border-l-2 pl-4 text-sm transition-colors',
                  link.id === activeId || (activeId === '0' && idx === 0)
                    ? 'border-accent'
                    : 'border-transparent',
                )}
                onClick={stickyNavClickHandler}
              >
                
                <span className="text-foreground dark:text-foreground group-hover:border-b-accent border-b-transparent font-bold ease-in-out duration-300 pb-1 border-b-2 mt-1">
                  {link.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
