import { readFileSync } from 'node:fs';
import path from 'node:path';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import LegacyStylesPage from '../src/pages/legacy-styles-page';

describe('legacy-bt-scss import resolution', () => {
  it('_generic.scss has no unresolvable webpack-style tilde imports, and still imports the normalize reset', () => {
    const source = readFileSync(
      path.resolve(__dirname, '../legacy-bt-scss/_generic/_generic.scss'),
      'utf-8',
    );
    expect(source).not.toMatch(/@import\s+['"]~/);
    expect(source).toContain("@import 'normalize.css/normalize.css';");
  });

  it('normalize.css resolves as a real installed package', () => {
    expect(() => require.resolve('normalize.css/normalize.css')).not.toThrow();
  });
});

describe('LegacyStylesPage', () => {
  it('renders without throwing and includes the shadow host', () => {
    const { container } = render(<LegacyStylesPage />);
    expect(
      container.querySelector('[data-component="shadow-html"]'),
    ).not.toBeNull();
  });
});
