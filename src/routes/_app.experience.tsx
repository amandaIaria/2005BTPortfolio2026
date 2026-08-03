import { createFileRoute } from '@tanstack/react-router';
import { ModernExperiencePage } from '@modern/feature';

export const Route = createFileRoute('/_app/experience')({
  component: ModernExperiencePage,
});
