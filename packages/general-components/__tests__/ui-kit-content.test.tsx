import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { UIKitContent } from '../src/components/ui-kit/ui-kit-content';

describe('UIKitContent', () => {
  it('renders', () => {
    const { container } = render(<UIKitContent />);
    expect(
      container.querySelector('[data-component="ui-kit-content"]'),
    ).not.toBeNull();
  });
});
