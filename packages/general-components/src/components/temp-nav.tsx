import * as React from 'react';
import { cn } from '../lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/ui-kit', label: 'Ui Kit' },
];

function TempNav({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      data-component="temp-nav"
      className={cn('flex items-center justify-between', className)}
      {...props}
    >
      <ul className="flex items-center gap-4">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
      <div>Logo</div>
    </nav>
  );
}

export { TempNav };
