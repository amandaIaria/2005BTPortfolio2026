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
    <div data-component="shadow-html" ref={hostRef} className={className} />
  );
}
