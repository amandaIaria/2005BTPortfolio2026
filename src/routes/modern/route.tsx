import { Outlet, createFileRoute, useMatches } from '@tanstack/react-router';
import { NavToggle } from '@modern/feature/components/nav-toggle';

export const Route = createFileRoute('/modern')({
  component: ModernLayout,
});

function ModernLayout() {
  const matches = useMatches();
  const isHome = matches.some((match) => match.routeId === '/modern/');

  return (
    <>
      {!isHome && <NavToggle />}
      <Outlet />
    </>
  );
}
