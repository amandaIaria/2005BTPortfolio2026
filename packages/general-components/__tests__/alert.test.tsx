import { render, screen, cleanup } from '@testing-library/react';
import { describe, expect, it, afterEach } from 'vitest';

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
    expect(screen.getByText('Heads up')).not.toBeNull();
    expect(screen.getByText('Something to know.')).not.toBeNull();
  });

  it('renders the destructive variant', () => {
    render(
      <Alert variant="destructive">
        <AlertDescription>Message</AlertDescription>
      </Alert>,
    );
    expect(screen.getByRole('alert').className).toContain('text-destructive');
  });
});
