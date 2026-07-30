import { createFileRoute } from '@tanstack/react-router';
import { CaseStudiesPage } from '@2005portfolio/feature';

export const Route = createFileRoute('/case-studies')({
  component: CaseStudiesPage,
});
