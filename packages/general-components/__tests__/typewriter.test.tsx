import { render, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Typewriter } from '../src/components/modern/typewriter';

describe('Typewriter', () => {
  it('starts empty and types out the text over time', () => {
    vi.useFakeTimers();
    const { container } = render(<Typewriter text="Hi" speed={10} />);
    const el = container.querySelector('[data-component="typewriter"]');

    expect(el?.textContent).toBe('');

    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(el?.textContent).toBe('H');

    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(el?.textContent).toBe('Hi');

    vi.useRealTimers();
  });
});
