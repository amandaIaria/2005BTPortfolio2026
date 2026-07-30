import { createFileRoute } from '@tanstack/react-router';
import { ModernCaseStudyDetailPage } from '@modern/feature';

export const Route = createFileRoute('/modern/case-studies/$slug')({
  component: ModernCaseStudyDetailPage,
});
