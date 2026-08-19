import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { UIKitNav } from './ui-kit-nav';
import { Separator } from '../ui/separator';

export interface UIKitHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  header: {
    kicker: string;
    title: string;
    descriptionBefore: string;
    descriptionCode: string;
    descriptionAfter: string;
  };
}

const UIKitHeader = forwardRef<HTMLDivElement, UIKitHeaderProps>(
  ({ header, className, ...props }, ref) => (
    <header
      ref={ref}
      data-component="ui-kit-header"
      className={cn(className)}
      {...props}
    >
      <div>
        <UIKitNav />
      </div>
      <div>
        <p className="island-kicker mb-2">{header.kicker}</p>
        <h1 className="display-title text-accent">{header.title}</h1>
        <p className="mt-3 max-w-xl text-accent">
          {header.descriptionBefore}
          <code>{header.descriptionCode}</code>
          {header.descriptionAfter}
        </p>
      </div>

      <Separator />
    </header>
  ),
);
UIKitHeader.displayName = 'UIKitHeader';

export { UIKitHeader };
