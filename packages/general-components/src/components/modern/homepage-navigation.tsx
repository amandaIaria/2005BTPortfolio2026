import { cn } from '@general/components/lib/utils.ts';
import { usePageTransition } from '../page-transition/page-transition-context';
import type { HomepageNavigationProps } from '@packages/general-components/src/components/types.ts';
import type { Icon } from '@phosphor-icons/react';
import {
  ArticleIcon,
  BagSimpleIcon,
  BriefcaseIcon,
  ChatsCircleIcon,
  ClockIcon,
  PaletteIcon,
  PentagramIcon,
  UserIcon,
} from '@phosphor-icons/react';
import type { MouseEvent } from 'react';
import { BoilText } from '../atoms/boil-effect-svg';

const iconMap: Record<string, Icon> = {
  user: UserIcon,
  briefcase: BriefcaseIcon,
  palette: PaletteIcon,
  clock: ClockIcon,
  pentagram: PentagramIcon,
  article: ArticleIcon,
  'bag-simple': BagSimpleIcon,
  'chats-circle': ChatsCircleIcon,
};

function resolveOverlayColor(color: string | undefined, element: HTMLElement) {
  if (color) return color;
  const background = getComputedStyle(element).backgroundColor;
  const isTransparent =
    background === 'transparent' || background === 'rgba(0, 0, 0, 0)';
  return isTransparent ? 'var(--color-accent)' : background;
}

function HomepageNavigation({ json, ...props }: HomepageNavigationProps) {
  const { startTransition } = usePageTransition();

  function handleClick(
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    color: string | undefined,
  ) {
    event.preventDefault();
    const element = event.currentTarget;
    startTransition({
      rect: element.getBoundingClientRect(),
      href,
      backgroundColor: resolveOverlayColor(color, element),
    });
  }

  return (
    <nav className={cn('flex flex-col items-center justify-center ')} {...props}>
      <ul className="flex flex-col list-style-none items-center justify-end gap-0  flex-wrap md:flex-nowrap -mt-40 md:mt-0">
        {json.map((item, idx) => {
          const NavIcon = iconMap[item.icon];
          return (
            <li
              key={`homepage-nav-item-${idx}`}
              className="md:basis-[20%] md:flex-1 shadow-success transition-all duration-300 transform-gpu bg-black md:bg-transparent"
            >
              <a
                key={`homepage-nav-item-${idx}`}
                href={item.href}
                onClick={(event) => handleClick(event, item.href, item.color)}
                className="font-semibold text-white hover:text-success before:h-0 no-underline dark:hover:text-accent transition-colors duration-300 text-center flex flex-col items-center justify-center gap-0.5 md:gap-2"
                data-color={item.color}
              >
                <BoilText copy={item.label} />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { HomepageNavigation };
