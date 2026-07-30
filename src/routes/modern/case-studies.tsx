import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/modern/case-studies')({
  component: () => <Outlet />,
});
