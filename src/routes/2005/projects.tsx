import { createFileRoute } from '@tanstack/react-router';
import { ProjectsPage } from '@2005portfolio/feature';

export const Route = createFileRoute('/2005/projects')({
  component: ProjectsPage,
});
