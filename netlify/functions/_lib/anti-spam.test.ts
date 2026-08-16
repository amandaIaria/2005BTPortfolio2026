import { describe, expect, it } from 'vitest';

import { isSpam, MIN_SUBMIT_MS } from './anti-spam';

describe('isSpam', () => {
  it('flags a filled-in honeypot as spam', () => {
    expect(
      isSpam({ honeypot: 'acme inc', formLoadedAt: Date.now() - 5000 }),
    ).toBe(true);
  });

  it('flags a missing formLoadedAt as spam', () => {
    expect(isSpam({ honeypot: '', formLoadedAt: undefined })).toBe(true);
  });

  it('flags a submission faster than MIN_SUBMIT_MS as spam', () => {
    expect(
      isSpam({ honeypot: '', formLoadedAt: Date.now() - (MIN_SUBMIT_MS - 1) }),
    ).toBe(true);
  });

  it('allows a normal, human-paced submission', () => {
    expect(
      isSpam({
        honeypot: '',
        formLoadedAt: Date.now() - (MIN_SUBMIT_MS + 1000),
      }),
    ).toBe(false);
  });
});
