import { createFileRoute } from '@tanstack/react-router';
import { ContactPage } from '@2005portfolio/feature';

export const Route = createFileRoute('/2005/contact')({
  component: ContactPage,
});
