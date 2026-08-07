import { GlitchEffect, InternalTransitionLink } from '@general/components';

function ModernNotFoundPage() {
  return (
    <div
      data-component="modern-not-found-page"
      className="min-h-screen flex flex-col items-center justify-center gap-6 bg-black text-white text-center px-6"
    >
      <GlitchEffect
        className="text-[8rem] sm:text-[12rem] leading-none font-bold tracking-tighter"
        accessibleLabel="404 error"
      >
        404
      </GlitchEffect>
      <h1 className="text-lg text-white/70">This page doesn&apos;t exist.</h1>
      <InternalTransitionLink
        href="/"
        className="text-[var(--lagoon)] font-bold underline underline-offset-4"
      >
        &larr; Back to home
      </InternalTransitionLink>
    </div>
  );
}

export { ModernNotFoundPage };
