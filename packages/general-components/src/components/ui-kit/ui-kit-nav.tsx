import * as React from 'react';
import uiKit from '@json/data/json/ui-kit.json';
import { cn } from '../../lib/utils';
import { InternalTransitionLink } from '../page-transition/internal-transition-link';

const navLinks = uiKit.nav;

function UIKitNav({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      data-component="temp-nav"
      className={cn('flex items-center justify-between', className)}
      {...props}
    >
      <ul className="flex items-center gap-4">
        {navLinks.map((link) => (
          <li key={link.href}>
            <InternalTransitionLink
              href={link.href}
              className="group text-foreground"
            >
              <span className="border-b border-transparent group-hover:border-accent transition ease-in-out">
                {link.label}
              </span>
            </InternalTransitionLink>
          </li>
        ))}
      </ul>
      <div>
        <img src="./img/logo2019.svg" className="w-100" />
      </div>
    </nav>
  );
}

export { UIKitNav };
