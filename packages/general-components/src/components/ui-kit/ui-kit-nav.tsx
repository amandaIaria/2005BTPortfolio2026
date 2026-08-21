import * as React from 'react';
import uiKit from '@json/data/json/ui-kit.json';
import { cn } from '../../lib/utils';
import { InternalTransitionLink } from '../page-transition/internal-transition-link';

const navLinks = uiKit.nav;

function UIKitNav({ className, ...props }: React.ComponentProps<'nav'>) {
  const pathname =
    typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <nav
      data-component="ui-kit-nav"
      className={cn(
        'flex flex-wrap items-center justify-between gap-x-4 gap-y-2',
        className,
      )}
      {...props}
    >
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 md:mb-0">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <InternalTransitionLink
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className="group text-foreground"
              >
                <span
                  className={cn(
                    'border-b transition ease-in-out',
                    isActive
                      ? 'border-accent font-semibold'
                      : 'border-transparent group-hover:border-accent',
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
        <img
          src="/img/logo2019.svg"
          className="w-24 sm:w-32 md:w-40 mb-6 md:mb-0"
          alt=""
        />
      </div>
    </nav>
  );
}

export { UIKitNav };
