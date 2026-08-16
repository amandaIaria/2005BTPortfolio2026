import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, expect, it, afterEach, vi } from 'vitest';

import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '../src/components/ui/alert';

describe('Alert', () => {
  afterEach(cleanup);

  it('renders with role="alert" and default variant', () => {
    render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something to know.</AlertDescription>
      </Alert>,
    );
    const alert = screen.getByRole('alert');
    expect(alert.getAttribute('data-variant')).toBe('default');
    expect(screen.getByText('Heads up')).not.toBeNull();
    expect(screen.getByText('Something to know.')).not.toBeNull();
  });

  it.each(['error', 'success', 'info'] as const)(
    'renders the %s variant with a default icon',
    (variant) => {
      render(
        <Alert variant={variant}>
          <AlertDescription>Message</AlertDescription>
        </Alert>,
      );
      const alert = screen.getByRole('alert');
      expect(alert.getAttribute('data-variant')).toBe(variant);
      expect(alert.querySelector('svg')).not.toBeNull();
    },
  );

  it('suppresses the icon when icon={false}', () => {
    render(
      <Alert variant="error" icon={false}>
        <AlertDescription>Message</AlertDescription>
      </Alert>,
    );
    expect(screen.getByRole('alert').querySelector('svg')).toBeNull();
  });

  it('does not render a dismiss button by default', () => {
    render(
      <Alert>
        <AlertDescription>Message</AlertDescription>
      </Alert>,
    );
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('calls onDismiss when the dismiss button is clicked', () => {
    const onDismiss = vi.fn();
    render(
      <Alert onDismiss={onDismiss}>
        <AlertDescription>Message</AlertDescription>
      </Alert>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
