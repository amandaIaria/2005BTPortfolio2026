import { Outlet, createFileRoute } from '@tanstack/react-router';
import { NavToggle } from '@modern/feature/components/nav-toggle';

export const Route = createFileRoute('/modern')({
  component: () => (
    <>
      <NavToggle />
      <Outlet />
    </>
  ),
});
