import { createFileRoute } from '@tanstack/react-router';
import { ProjectsPage } from '@2005portfolio/feature';

export const Route = createFileRoute('/projects')({ component: ProjectsPage });
