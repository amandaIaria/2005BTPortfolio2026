import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { Footer } from '../modern/footer';

export interface UIKitFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const UIKitFooter = forwardRef<HTMLDivElement, UIKitFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-component="ui-kit-footer"
      className={cn(className)}
      {...props}
    >
      <Footer />
    </div>
  ),
);
UIKitFooter.displayName = 'UIKitFooter';

export { UIKitFooter };
