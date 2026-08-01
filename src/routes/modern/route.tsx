import { Outlet, createFileRoute, useMatches } from '@tanstack/react-router';
import { NavToggle, ThemeToggle } from '@general/components';
import { ModernNotFoundPage } from '@modern/feature';

export const Route = createFileRoute('/modern')({
  component: ModernLayout,
  notFoundComponent: ModernNotFoundPage,
});

function ModernLayout() {
  const matches = useMatches();
  const isHome = matches.some((match) => match.routeId === '/modern/');

  return (
    <>
      {!isHome && <NavToggle />}
      <ThemeToggle />
      <Outlet />
    </>
  );
}
