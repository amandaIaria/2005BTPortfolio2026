import { cn } from '@general/components/lib/utils.ts';
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

const iconMap: Record<string, Icon> = {
  user: UserIcon,
  briefcase: BriefcaseIcon,
  palette: PaletteIcon,
  clock: ClockIcon,
  pentagram: PentagramIcon,
  article: ArticleIcon,
  'bag-simple': BagSimpleIcon,
  'chats-circle': ChatsCircleIcon,
}

function HomepageNavigation({ json, ...props }: HomepageNavigationProps) {
  return (
    <nav
      className={cn(
        'flex flex-col items-center justify-center',
      )}
      {...props}
    >
      <ul className="flex  items-center justify-center gap-10">
        {json.map((item, idx) => {
          const NavIcon = iconMap[item.icon]
          return (
            <li key={`homepage-nav-item-${idx}`} className="basis-[20%] flex-1 shadow-2xl shadow-success rounded-lg p-4 transition-all duration-300 hover:scale-150 transform-gpu">
              <a
                key={`homepage-nav-item-${idx}`}
                href={item.href}
                className="font-semibold text-white hover:text-success dark:hover:text-accent transition-colors duration-300 text-center flex flex-col items-center justify-center gap-2"
              >
                
                <span className=" text-3xl">{<NavIcon weight="bold" />}</span>
                <span className="text-lg whitespace-nowrap">{item.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  );
}

export {HomepageNavigation};