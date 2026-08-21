import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, expect, it, afterEach, vi } from 'vitest';

import {
  PortfolioAlert,
  PortfolioAlertTitle,
  PortfolioAlertDescription,
} from '../src/components/atoms/portfolio-alert';

describe('PortfolioAlert', () => {
  afterEach(cleanup);

  it('renders with role="alert", default variant, and data-component', () => {
    render(
      <PortfolioAlert>
        <PortfolioAlertTitle>Heads up</PortfolioAlertTitle>
        <PortfolioAlertDescription>
          Something to know.
        </PortfolioAlertDescription>
      </PortfolioAlert>,
    );
    const alert = screen.getByRole('alert');
    expect(alert.getAttribute('data-component')).toBe('portfolio-alert');
    expect(alert.getAttribute('data-variant')).toBe('default');
    expect(screen.getByText('Heads up')).not.toBeNull();
    expect(screen.getByText('Something to know.')).not.toBeNull();
  });

  it.each(['error', 'success', 'info'] as const)(
    'renders the %s variant with a default icon',
    (variant) => {
      render(
        <PortfolioAlert variant={variant}>
          <PortfolioAlertDescription>Message</PortfolioAlertDescription>
        </PortfolioAlert>,
      );
      const alert = screen.getByRole('alert');
      expect(alert.getAttribute('data-variant')).toBe(variant);
      expect(alert.querySelector('svg')).not.toBeNull();
    },
  );

  it('suppresses the icon when icon={false}', () => {
    render(
      <PortfolioAlert variant="error" icon={false}>
        <PortfolioAlertDescription>Message</PortfolioAlertDescription>
      </PortfolioAlert>,
    );
    expect(screen.getByRole('alert').querySelector('svg')).toBeNull();
  });

  it('does not render a dismiss button by default', () => {
    render(
      <PortfolioAlert>
        <PortfolioAlertDescription>Message</PortfolioAlertDescription>
      </PortfolioAlert>,
    );
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('calls onDismiss when the dismiss button is clicked', () => {
    const onDismiss = vi.fn();
    render(
      <PortfolioAlert onDismiss={onDismiss}>
        <PortfolioAlertDescription>Message</PortfolioAlertDescription>
      </PortfolioAlert>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
