import { createFileRoute } from '@tanstack/react-router';
import { ModernCaseStudiesPage } from '@modern/feature';

export const Route = createFileRoute('/modern/case-studies')({
  component: ModernCaseStudiesPage,
});
