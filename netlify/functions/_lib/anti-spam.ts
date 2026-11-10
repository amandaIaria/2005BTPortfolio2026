/**
 * Zero-dependency spam checks: a honeypot field real users never see/fill,
 * plus a minimum time-to-submit (bots posting directly can't have "loaded"
 * the form for any length of time). Both are cheap, no API keys, no
 * third-party script.
 *
 * Extension point: to add Cloudflare Turnstile (or similar) later, make this
 * function async, verify a `turnstileToken` field against Turnstile's
 * siteverify endpoint, and OR its result into the return value below — the
 * call site in contact.mts doesn't need to change.
 */

// Real users take at least this long to fill a 3-field form; a bot posting
// straight to the endpoint reports 0 elapsed time (or omits the field).
export const MIN_SUBMIT_MS = 1500;

export interface AntiSpamFields {
  /** Honeypot value — any non-empty value means a bot filled it in. */
  honeypot: unknown;
  /** epoch ms captured when the real form rendered, sent back on submit. */
  formLoadedAt: unknown;
}

export function isSpam({ honeypot, formLoadedAt }: AntiSpamFields): boolean {
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return true;
  }
  if (typeof formLoadedAt !== 'number') {
    return true;
  }
  if (Date.now() - formLoadedAt < MIN_SUBMIT_MS) {
    return true;
  }
  return false;
}
