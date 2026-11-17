import * as React from 'react';
import uiKit from '@json/data/json/ui-kit.json';
import { cn } from '../../lib/utils';
import { InternalTransitionLink } from '../page-transition/internal-transition-link';
import { PortfolioImage } from '../atoms/portfolio-image';

const navLinks = uiKit.nav;

function UIKitNav({ className, ...props }: React.ComponentProps<'nav'>) {
  const pathname =
    typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <nav
      data-component="ui-kit-nav"
      className={cn(
        'flex  items-center justify-between gap-x-4 gap-y-2 pb-10',
        className,
      )}
      {...props}
    >
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 md:mb-0 list-style-none">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <InternalTransitionLink
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className="group"
              >
                <span
                  className={cn(
                    '',
                    isActive
                      ? 'font-semibold'
                      : '',
                  )}
                >
                  {link.label}
                </span>
              </InternalTransitionLink>
            </li>
          );
        })}
      </ul>
      <div>
        <PortfolioImage
          imageClasses="w-24 sm:w-32 md:w-40 mb-6 md:mb-0"
          cn="w-50"
          image={{
            src: "/img/logo2019.svg",
            alt: "logo",
            width: "160"
          }}
        />
        
      </div>
    </nav>
  );
}

export { UIKitNav };
