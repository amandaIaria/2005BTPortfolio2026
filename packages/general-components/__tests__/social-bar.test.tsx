import { render, screen, cleanup } from '@testing-library/react';
import { describe, expect, it, afterEach } from 'vitest';

import { SocialBar } from '../src/components/modern/social-bar';
import json from '../../json/src/json/about.json';

describe('SocialBar', () => {
  afterEach(cleanup);

  it('defaults LinkedIn and GitHub hrefs to about.json values', () => {
    const [, linkedinHref, githubHref] = json.about.social;
    render(<SocialBar />);
    expect(
      screen.getByRole('link', { name: 'LinkedIn' }).getAttribute('href'),
    ).toBe(linkedinHref);
    expect(
      screen.getByRole('link', { name: 'GitHub' }).getAttribute('href'),
    ).toBe(githubHref);
  });

  it('respects override hrefs', () => {
    render(
      <SocialBar
        linkedinHref="https://linkedin.com/in/example"
        githubHref="https://github.com/example"
      />,
    );
    expect(
      screen.getByRole('link', { name: 'LinkedIn' }).getAttribute('href'),
    ).toBe('https://linkedin.com/in/example');
    expect(
      screen.getByRole('link', { name: 'GitHub' }).getAttribute('href'),
    ).toBe('https://github.com/example');
  });

  it('applies a custom className to the root element', () => {
    render(<SocialBar className="extra-class" />);
    const root = screen
      .getByRole('link', { name: 'LinkedIn' })
      .closest('[data-component="social-bar"]');
    expect(root?.className).toContain('extra-class');
  });
});
