import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/case-studies')({
  component: () => <Outlet />,
});
