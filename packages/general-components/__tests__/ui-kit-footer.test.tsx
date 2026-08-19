import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { UIKitFooter } from '../src/components/ui-kit/ui-kit-footer';

describe('UIKitFooter', () => {
  it('renders', () => {
    const { container } = render(<UIKitFooter />);
    expect(
      container.querySelector('[data-component="ui-kit-footer"]'),
    ).not.toBeNull();
  });
});
