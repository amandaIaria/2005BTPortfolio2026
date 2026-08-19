import { render, cleanup } from '@testing-library/react';
import { describe, expect, it, afterEach } from 'vitest';
import { UIKitSticky } from '../src/components/ui-kit/ui-kit-sticky';

const tocItems = [
  { id: 'one', title: 'One' },
  { id: 'two', title: 'Two' },
];

describe('UIKitSticky', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { container } = render(
      <UIKitSticky tocItems={tocItems} activeId="one" />,
    );
    expect(
      container.querySelector('[data-component="ui-kit-sticky"]'),
    ).not.toBeNull();
  });

  it('marks the active item and leaves others inactive', () => {
    const { getByText } = render(
      <UIKitSticky tocItems={tocItems} activeId="two" />,
    );
    expect(getByText('One').className).not.toContain('border-accent');
    expect(getByText('Two').className).toContain('border-accent');
  });
});
