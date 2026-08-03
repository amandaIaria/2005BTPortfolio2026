import { createFileRoute } from '@tanstack/react-router';
import { ModernArtPage } from '@modern/feature';

export const Route = createFileRoute('/_app/art')({
  component: ModernArtPage,
});
