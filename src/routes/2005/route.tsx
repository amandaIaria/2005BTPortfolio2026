import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/2005')({
  component: () => <Outlet />,
});
