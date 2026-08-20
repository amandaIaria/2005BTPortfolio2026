import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, expect, it, afterEach, vi } from 'vitest';

import { PortfolioSwitch } from '../src/components/atoms/portfolio-switch';

describe('PortfolioSwitch', () => {
  afterEach(cleanup);

  it('renders unchecked by default', () => {
    render(<PortfolioSwitch aria-label="Toggle" />);
    expect(screen.getByRole('switch').getAttribute('aria-checked')).toBe(
      'false',
    );
  });

  it('calls onCheckedChange when toggled', () => {
    const onCheckedChange = vi.fn();
    render(
      <PortfolioSwitch aria-label="Toggle" onCheckedChange={onCheckedChange} />,
    );
    fireEvent.click(screen.getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('respects disabled', () => {
    render(<PortfolioSwitch aria-label="Toggle" disabled />);
    expect((screen.getByRole('switch') as HTMLButtonElement).disabled).toBe(
      true,
    );
  });
});
