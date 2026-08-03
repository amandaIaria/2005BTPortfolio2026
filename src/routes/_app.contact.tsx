import { createFileRoute } from '@tanstack/react-router';
import { ModernContactPage } from '@modern/feature';

export const Route = createFileRoute('/_app/contact')({
  component: ModernContactPage,
});
