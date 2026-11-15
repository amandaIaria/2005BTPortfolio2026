import * as React from 'react';
import {
  CheckCircleIcon,
  InfoIcon,
  WarningCircleIcon,
  XIcon,
} from '@phosphor-icons/react';

import { cn } from '../../lib/utils';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import type { PortfolioAlertProps, PortfolioAlertVariant } from '../types';

const VARIANT_CLASSNAMES: Record<PortfolioAlertVariant, string> = {
  default: '',
  error: 'border-transparent bg-error text-white',
  success: 'border-transparent bg-success text-foreground',
  caution: 'border-transparent bg-caution text-foreground',
  info: 'border-transparent bg-info text-white [data-slot="alert-description"]:text-white',
};

const DEFAULT_ICONS: Record<
  PortfolioAlertVariant,
  React.ComponentType<{ className?: string }> | undefined
> = {
  default: undefined,
  error: WarningCircleIcon,
  success: CheckCircleIcon,
  caution: WarningCircleIcon,
  info: InfoIcon,
};

function PortfolioAlert({
  className,
  variant = 'default',
  icon,
  onDismiss,
  dismissLabel = 'Dismiss',
  children,
  ...props
}: PortfolioAlertProps) {
  const DefaultIcon = DEFAULT_ICONS[variant];
  const resolvedIcon =
    icon === false ? null : (icon ?? (DefaultIcon ? <DefaultIcon className="h-7 w-7" /> : null));

  return (
    <Alert
      data-component="portfolio-alert"
      data-variant={variant}
      className={cn(
        'rounded-none',
        VARIANT_CLASSNAMES[variant],
        onDismiss &&
          'grid-cols-[2.5rem_1fr_1.5rem] has-[>svg]:grid-cols-[2.5rem_1fr_1.5rem]',
        !onDismiss && 'grid-cols-[2.5rem_1fr]',
        className,
      )}
      {...props}
    >
      <div className="grid  w-full h-full content-center">
        {resolvedIcon}
      </div>
      <div>
        {children}
      </div>
      <div className="grid  w-full h-full justify-self-end">
        {onDismiss ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            data-slot="alert-dismiss"
            onClick={onDismiss}
            className="h-full w-full grid cursor-pointer content-center"
          >
            <XIcon className="h-7 w-7" />
            <span className="sr-only">{dismissLabel}</span>
          </Button>
        ): ""}
      </div>
    </Alert>
  );
}

export {
  PortfolioAlert,
  AlertTitle as PortfolioAlertTitle,
  AlertDescription as PortfolioAlertDescription,
};
