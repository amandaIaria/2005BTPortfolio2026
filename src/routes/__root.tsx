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
    <div className="flex flex-col items-center justify-center gap-4 py-40 text-center">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <Link to="/" className="text-accent font-bold">
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
