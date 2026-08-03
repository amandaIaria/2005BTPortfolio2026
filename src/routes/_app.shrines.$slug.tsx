import { createFileRoute } from '@tanstack/react-router';
import { ModernShrineDetailPage } from '@modern/feature';

export const Route = createFileRoute('/_app/shrines/$slug')({
  component: ModernShrineDetailPage,
});
