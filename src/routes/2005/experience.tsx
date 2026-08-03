import { createFileRoute } from '@tanstack/react-router';
import { ExperiencePage } from '@2005portfolio/feature';

export const Route = createFileRoute('/2005/experience')({
  component: ExperiencePage,
});
