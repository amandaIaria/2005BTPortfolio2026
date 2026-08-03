import { createFileRoute } from '@tanstack/react-router';
import { ModernShrinesPage } from '@modern/feature';

export const Route = createFileRoute('/_app/shrines/')({
  component: ModernShrinesPage,
});
