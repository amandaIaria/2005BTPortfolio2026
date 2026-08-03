import { createFileRoute } from '@tanstack/react-router';
import { ModernAboutPage } from '@modern/feature';

export const Route = createFileRoute('/_app/about')({
  component: ModernAboutPage,
});
