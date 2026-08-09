import path from 'node:path';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as sass from 'sass';

import LegacyStylesPage from '../src/pages/legacy-styles-page';

describe('LegacyStylesPage', () => {
  it('compiles the legacy SCSS to non-empty CSS containing a known selector', () => {
    // Regression guard: an unresolvable @import inside legacy-bt-scss can
    // silently compile to an empty string instead of throwing. Compile
    // directly via the `sass` package rather than importing through Vite's
    // `?inline` pipeline, since Vitest stubs CSS-flavored imports to an
    // empty string by default (test.css is unset repo-wide) - this test
    // must not depend on that config.
    const entry = path.resolve(__dirname, '../legacy-bt-scss/_bt.scss');
    const result = sass.compile(entry, { loadPaths: ['node_modules'] });
    expect(result.css.length).toBeGreaterThan(1000);
    expect(result.css).toContain('aic-a-button');
  });

  it('renders without throwing and includes the shadow host', () => {
    const { container } = render(<LegacyStylesPage />);
    expect(
      container.querySelector('[data-component="shadow-html"]'),
    ).not.toBeNull();
  });
});
