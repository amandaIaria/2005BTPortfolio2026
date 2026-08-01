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
      className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6"
    >
      <GlitchEffect className="text-[8rem] sm:text-[12rem] leading-none font-bold tracking-tighter text-[var(--sea-ink)] dark:text-white">
        404
      </GlitchEffect>
      <p className="text-lg text-[var(--sea-ink)]/70 dark:text-white/70">
        Page not found.
      </p>
      <Link
        to="/"
        className="text-[var(--lagoon)] font-bold underline underline-offset-4"
      >
        &larr; Back home
      </Link>
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
