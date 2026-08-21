import { createFileRoute } from '@tanstack/react-router';
import HerosPage from '@general/pages/heros-page';

export const Route = createFileRoute('/ui-kit/heros')({
  component: HerosPage,
});
