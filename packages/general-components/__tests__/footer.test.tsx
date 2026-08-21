import { render, screen, cleanup } from '@testing-library/react';
import { describe, expect, it, afterEach } from 'vitest';

import { Footer } from '../src/components/modern/footer';

describe('Footer', () => {
  afterEach(cleanup);

  it('renders the wordmark text', () => {
    render(<Footer />);
    expect(screen.queryByText('Beautiful Tragedy')).not.toBeNull();
  });

  it('renders a custom logoText', () => {
    render(<Footer logoText="Custom Name" />);
    expect(screen.queryByText('Custom Name')).not.toBeNull();
  });

  it('renders LinkedIn and GitHub links', () => {
    render(<Footer />);
    expect(screen.queryByRole('link', { name: 'LinkedIn' })).not.toBeNull();
    expect(screen.queryByRole('link', { name: 'GitHub' })).not.toBeNull();
  });

  it('renders the given year', () => {
    render(<Footer year={2030} />);
    expect(screen.queryByText('@ 2030')).not.toBeNull();
  });

  it('applies a custom className to the root element', () => {
    render(<Footer className="extra-class" />);
    const root = screen
      .getByText('Beautiful Tragedy')
      .closest('[data-component="footer"]');
    expect(root?.className).toContain('extra-class');
  });
});
