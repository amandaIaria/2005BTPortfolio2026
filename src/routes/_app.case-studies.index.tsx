import { createFileRoute } from '@tanstack/react-router';
import { ModernCaseStudiesPage } from '@modern/feature';

export const Route = createFileRoute('/_app/case-studies/')({
  component: ModernCaseStudiesPage,
});
