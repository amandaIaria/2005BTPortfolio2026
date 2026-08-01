import {
  Link,
  Outlet,
  createRootRoute,
  useNavigate,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import {
  AppHeader,
  GlitchEffect,
  PageTransitionProvider,
  TooltipProvider,
} from '@general/components';

import '../styles.css';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function NotFoundComponent() {
  return (
    <div
      data-component="not-found-page"
      className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6 font-mono bg-[var(--sand)]"
    >
      <div className="border-2 border-[var(--sea-ink)] bg-[var(--foam)] px-8 py-10 max-w-md w-full">
        <GlitchEffect
          className="text-[6rem] sm:text-[8rem] leading-none font-bold tracking-tighter text-[var(--sea-ink)]"
          accessibleLabel="404 error"
        >
          404
        </GlitchEffect>
        <h1 className="text-lg text-[var(--sea-ink)]/70 mt-4">
          &gt; Page not found.
        </h1>
        <Link
          to="/"
          className="inline-block mt-6 text-[var(--lagoon-800)] dark:text-[var(--lagoon)] font-bold underline underline-offset-4"
        >
          &larr; Back home
        </Link>
      </div>
    </div>
  );
}

function RootComponent() {
  const nav = useNavigate();

  return (
    <TooltipProvider>
      <AppHeader navigate={(path) => nav({ to: path })} />
      <PageTransitionProvider>
        <Outlet />
      </PageTransitionProvider>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </TooltipProvider>
  );
}
