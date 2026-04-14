import * as React from 'react';
import { cn } from '../../lib/utils';

function Container({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <main
      className={cn('border my-10 mx-auto max-w-[800px] px-10 py-10 grid grid-rows-[auto_1fr_auto] h-[calc(100vh-5rem)] relative', className)}
      {...props}
    >
      
        {children}
      
    </main>
  );
}

export { Container };
