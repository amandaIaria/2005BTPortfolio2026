import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, expect, it, afterEach, beforeAll } from 'vitest';

import {
  PortfolioTooltip,
  PortfolioTooltipTrigger,
  PortfolioTooltipContent,
  PortfolioTooltipProvider,
} from '../src/components/atoms/portfolio-tooltip';

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('PortfolioTooltip', () => {
  afterEach(cleanup);

  it('renders the trigger', () => {
    render(
      <PortfolioTooltipProvider>
        <PortfolioTooltip open>
          <PortfolioTooltipTrigger>Hover me</PortfolioTooltipTrigger>
          <PortfolioTooltipContent>Tooltip copy</PortfolioTooltipContent>
        </PortfolioTooltip>
      </PortfolioTooltipProvider>,
    );
    expect(screen.getByText('Hover me')).toBeTruthy();
  });

  it('shows tooltip content with the portfolio data-component attribute', () => {
    render(
      <PortfolioTooltipProvider>
        <PortfolioTooltip open>
          <PortfolioTooltipTrigger>Hover me</PortfolioTooltipTrigger>
          <PortfolioTooltipContent>Tooltip copy</PortfolioTooltipContent>
        </PortfolioTooltip>
      </PortfolioTooltipProvider>,
    );
    const content = document.querySelector(
      '[data-component="portfolio-tooltip-content"]',
    );
    expect(content).not.toBeNull();
    expect(content?.textContent).toContain('Tooltip copy');
  });

  it('opens on trigger focus', () => {
    render(
      <PortfolioTooltipProvider>
        <PortfolioTooltip>
          <PortfolioTooltipTrigger>Focus me</PortfolioTooltipTrigger>
          <PortfolioTooltipContent>Focus tooltip</PortfolioTooltipContent>
        </PortfolioTooltip>
      </PortfolioTooltipProvider>,
    );

    expect(screen.queryByRole('tooltip')).toBeNull();
    fireEvent.focus(screen.getByText('Focus me'));
    expect(screen.getByRole('tooltip').textContent).toBe('Focus tooltip');
  });
});
