import { createFileRoute } from '@tanstack/react-router';
import { ModernExperiencePage } from '@modern/feature';

export const Route = createFileRoute('/modern/experience')({
  component: ModernExperiencePage,
});
