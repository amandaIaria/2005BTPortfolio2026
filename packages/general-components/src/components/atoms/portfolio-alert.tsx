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
  error: 'border-transparent bg-bt-error text-white',
  success: 'border-transparent bg-bt-success text-foreground',
  info: 'border-transparent bg-accent text-white [data-slot="alert-description"]:text-white',
};

const DEFAULT_ICONS: Record<
  PortfolioAlertVariant,
  React.ComponentType<{ className?: string }> | undefined
> = {
  default: undefined,
  error: WarningCircleIcon,
  success: CheckCircleIcon,
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
    icon === false ? null : (icon ?? (DefaultIcon ? <DefaultIcon /> : null));

  return (
    <Alert
      data-component="portfolio-alert"
      data-variant={variant}
      className={cn(
        'rounded-none',
        VARIANT_CLASSNAMES[variant],
        onDismiss &&
          'grid-cols-[0_1fr_1.5rem] has-[>svg]:grid-cols-[1rem_1fr_1.5rem]',
        className,
      )}
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
          className="col-start-3 -m-1 justify-self-end"
        >
          <XIcon />
          <span className="sr-only">{dismissLabel}</span>
        </Button>
      )}
    </Alert>
  );
}

export {
  PortfolioAlert,
  AlertTitle as PortfolioAlertTitle,
  AlertDescription as PortfolioAlertDescription,
};
