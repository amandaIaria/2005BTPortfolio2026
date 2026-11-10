import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { UIKitHeader } from '../src/components/ui-kit/ui-kit-header';

const header = {
  kicker: 'Kicker',
  title: 'Title',
  descriptionBefore: 'Before ',
  descriptionCode: '@general/components',
  descriptionAfter: ' after.',
};

describe('UIKitHeader', () => {
  it('renders', () => {
    const { container } = render(<UIKitHeader header={header} />);
    expect(
      container.querySelector('[data-component="ui-kit-header"]'),
    ).not.toBeNull();
  });
});
