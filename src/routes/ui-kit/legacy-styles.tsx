import { createFileRoute } from '@tanstack/react-router';
import LegacyStylesPage from '@general/pages/legacy-styles-page';

export const Route = createFileRoute('/ui-kit/legacy-styles')({
  component: LegacyStylesPage,
});
