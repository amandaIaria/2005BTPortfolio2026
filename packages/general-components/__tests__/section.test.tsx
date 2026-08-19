import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Section } from '../src/components/ui-kit/section';

describe('Section', () => {
  it('renders title, children, and a slugified id', () => {
    const { container } = render(
      <Section title="My Section">
        <p>content</p>
      </Section>,
    );
    const section = container.querySelector('[data-component="section"]');
    expect(section).not.toBeNull();
    expect(section?.id).toBe('my-section');
    expect(section?.textContent).toContain('My Section');
    expect(section?.textContent).toContain('content');
  });
});
