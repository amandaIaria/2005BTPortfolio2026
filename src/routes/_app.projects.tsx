import { createFileRoute } from '@tanstack/react-router';
import { ModernProjectsPage } from '@modern/feature';

export const Route = createFileRoute('/_app/projects')({
  component: ModernProjectsPage,
});
