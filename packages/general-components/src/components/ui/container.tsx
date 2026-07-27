import * as React from 'react';
import { cn } from '../../lib/utils';

function Container({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  const containerClasses =
    'my-10 mx-auto max-w-7xl px-10 py-10 grid grid-rows-[auto_1fr_auto] mxh-[calc(100vh-100px)] relative';
  return (
    <main className={cn(className)} {...props}>
      {children}
    </main>
  );
}

export { Container };
