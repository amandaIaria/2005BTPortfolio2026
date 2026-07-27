import { Outlet, createRootRoute, useNavigate } from '@tanstack/react-router';
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
});

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
