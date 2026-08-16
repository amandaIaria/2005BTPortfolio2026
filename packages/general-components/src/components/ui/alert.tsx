import * as React from 'react';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import {
  CheckCircleIcon,
  InfoIcon,
  WarningCircleIcon,
  XIcon,
} from '@phosphor-icons/react';

import { cn } from '../../lib/utils';
import { Button } from './button';

const alertVariants = cva(
  'relative grid w-full grid-cols-[0_1fr_0] items-start gap-x-3 gap-y-0.5 rounded-none px-4 py-3 text-sm has-[>svg]:grid-cols-[1rem_1fr_0] has-[[data-slot=alert-dismiss]]:grid-cols-[0_1fr_1.5rem] has-[>svg]:has-[[data-slot=alert-dismiss]]:grid-cols-[1rem_1fr_1.5rem] [&>svg]:size-4 [&>svg]:translate-y-0.5 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'border border-border bg-background text-foreground',
        error: 'bg-[var(--bt-error)] text-white',
        success: 'bg-[var(--bt-success)] text-[var(--flat-black)]',
        info: 'bg-[var(--bt-active)] text-[var(--flat-black)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>['variant']>;

const DEFAULT_ICONS: Record<
  AlertVariant,
  React.ComponentType<{ className?: string }> | undefined
> = {
  default: undefined,
  error: WarningCircleIcon,
  success: CheckCircleIcon,
  info: InfoIcon,
};

interface AlertProps
  extends React.ComponentProps<'div'>, VariantProps<typeof alertVariants> {
  /** Custom leading icon. Omit for the variant default, pass `false` to hide it. */
  icon?: React.ReactNode | false;
  /** Renders a dismiss button and calls this when clicked. Omit to hide it. */
  onDismiss?: () => void;
  /** Accessible label for the dismiss button. */
  dismissLabel?: string;
}

function Alert({
  className,
  variant,
  icon,
  onDismiss,
  dismissLabel = 'Dismiss',
  children,
  ...props
}: AlertProps) {
  const resolvedVariant = variant ?? 'default';
  const DefaultIcon = DEFAULT_ICONS[resolvedVariant];
  const resolvedIcon =
    icon === false ? null : (icon ?? (DefaultIcon ? <DefaultIcon /> : null));

  return (
    <div
      data-slot="alert"
      data-variant={resolvedVariant}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {resolvedIcon}
      {children}
      {onDismiss && (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          data-slot="alert-dismiss"
          onClick={onDismiss}
          className="col-start-3 -m-1 justify-self-end hover:bg-[#e0f4ff] hover:text-[var(--flat-black)]"
        >
          <XIcon />
          <span className="sr-only">{dismissLabel}</span>
        </Button>
      )}
    </div>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'col-start-2 line-clamp-1 min-h-4 font-heading text-sm font-medium tracking-tight',
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'col-start-2 grid justify-items-start gap-1 text-sm text-current/90 [&_p]:leading-relaxed',
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, alertVariants };
