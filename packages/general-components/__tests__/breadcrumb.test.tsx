import { render, screen, cleanup } from '@testing-library/react';
import { describe, expect, it, afterEach } from 'vitest';
import type { ReactNode } from 'react';

import { Breadcrumb } from '../src/components/modern/breadcrumb';
import { PageTransitionContext } from '../src/components/page-transition/page-transition-context';

function renderWithProvider(ui: ReactNode) {
  return render(
    <PageTransitionContext.Provider
      value={{
        startTransition: () => Promise.resolve(),
        isTransitioning: false,
      }}
    >
      {ui}
    </PageTransitionContext.Provider>,
  );
}

describe('Breadcrumb', () => {
  afterEach(cleanup);

  it('renders the label text', () => {
    renderWithProvider(
      <Breadcrumb href="/case-studies" label="Back to case studies" />,
    );
    expect(screen.queryByText('Back to case studies')).not.toBeNull();
  });

  it('links to the given href', () => {
    renderWithProvider(<Breadcrumb href="/case-studies" label="Back" />);
    expect(
      screen.getByRole('link', { name: 'Back' }).getAttribute('href'),
    ).toBe('/case-studies');
  });

  it('applies a custom className to the root element', () => {
    renderWithProvider(
      <Breadcrumb href="/case-studies" label="Back" className="extra-class" />,
    );
    const root = screen
      .getByText('Back')
      .closest('[data-component="breadcrumb"]');
    expect(root?.className).toContain('extra-class');
  });
});
