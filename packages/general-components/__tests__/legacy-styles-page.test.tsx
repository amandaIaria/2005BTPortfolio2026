import { readFileSync } from 'node:fs';
import path from 'node:path';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import LegacyStylesPage from '../src/pages/legacy-styles-page';

describe('LegacyStylesPage', () => {
  it('renders without throwing and includes the shadow host', () => {
    const { container } = render(<LegacyStylesPage />);
    expect(
      container.querySelector('[data-component="shadow-html"]'),
    ).not.toBeNull();
  });

  it('concatenates the ShadowHtml css prop with both @imports before any plain rule', () => {
    // Static guard: Vitest stubs `?inline` SCSS imports to '', so no runtime
    // test can catch a reorder here (this bug class has recurred 4 times).
    // materialIconsImport and legacyCss (which has its own leading @import,
    // hoisted by Vite) must both precede legacyBaseStyles (a plain rule) in
    // the concatenation, or CSS drops whichever @import lands second.
    const source = readFileSync(
      path.resolve(__dirname, '../src/pages/legacy-styles-page.tsx'),
      'utf-8',
    );
    const cssPropMatch = source.match(/css=\{([^}]+)\}/);
    expect(cssPropMatch).not.toBeNull();
    const cssExpression = cssPropMatch![1];
    const materialIconsIndex = cssExpression.indexOf('materialIconsImport');
    const legacyCssIndex = cssExpression.indexOf('legacyCss');
    const legacyBaseStylesIndex = cssExpression.indexOf('legacyBaseStyles');
    expect(materialIconsIndex).toBeGreaterThanOrEqual(0);
    expect(legacyCssIndex).toBeGreaterThan(materialIconsIndex);
    expect(legacyBaseStylesIndex).toBeGreaterThan(legacyCssIndex);
  });
});
