import { createFileRoute } from '@tanstack/react-router';
import ColorsPage from '@general/pages/colors-page';

export const Route = createFileRoute('/ui-kit/colors')({
  component: ColorsPage,
});
