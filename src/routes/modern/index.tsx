import { createFileRoute } from '@tanstack/react-router';
import { ModernHomePage } from '@modern/feature';

export const Route = createFileRoute('/modern/')({
  component: ModernHomePage,
});
