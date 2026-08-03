import { Outlet, createFileRoute, useMatches } from '@tanstack/react-router';
import { NavToggle, ThemeToggle } from '@general/components';
import { ModernNotFoundPage } from '@modern/feature';

export const Route = createFileRoute('/_app')({
  component: ModernLayout,
  notFoundComponent: ModernNotFoundPage,
});

function ModernLayout() {
  const matches = useMatches();
  const isHome = matches.some((match) => match.routeId === '/_app/');

  return (
    <>
      {!isHome && <NavToggle />}
      <ThemeToggle />
      <Outlet />
    </>
  );
}
