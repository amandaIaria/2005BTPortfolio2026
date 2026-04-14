import { createFileRoute } from '@tanstack/react-router';
import UiKitPage from '@general/pages/ui-kit-page';

export const Route = createFileRoute('/ui-kit')({
  component: UiKitPage,
});
