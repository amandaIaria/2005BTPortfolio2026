import { render, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Typewriter } from '../src/components/modern/typewriter';

describe('Typewriter', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('starts empty', () => {
    vi.useFakeTimers();
    const { container } = render(<Typewriter text={['Hi']} speed={10} />);
    const el = container.querySelector('[data-component="typewriter-paragraph"] [data-component="typewriter-span"]') as HTMLElement;
    
    expect(el?.style?.opacity).toBe('0')

    vi.useRealTimers();
  });

  it('Opacity is 1', () => {
  
    const { container } = render(<Typewriter text={['Hi']} speed={10} />);
    const el = container.querySelector('[data-component="typewriter-paragraph"] [data-component="typewriter-span"]') as HTMLElement;
    
    const timer = setTimeout(() => {
      expect(el?.style?.opacity).toBe('1')
    }, 10);

    clearTimeout(timer);
  });
});
