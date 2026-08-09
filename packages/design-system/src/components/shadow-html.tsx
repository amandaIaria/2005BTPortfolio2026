import { useEffect, useRef } from 'react';

type ShadowHtmlProps = {
  css: string;
  html: string;
  className?: string;
};

export function ShadowHtml({ css, html, className }: ShadowHtmlProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const root = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
    root.innerHTML = `<style>${css}</style>${html}`;
  }, [css, html]);

  return (
    <div
      data-component="shadow-html"
      ref={hostRef}
      className={className}
      // Shadow DOM scopes selectors but not layout: position:fixed/absolute
      // descendants still position against the viewport by default. `contain:
      // layout` makes this host a containing block, so isolated content can't
      // escape it - completing the isolation the component is meant to give.
      style={{ contain: 'layout' }}
    />
  );
}
