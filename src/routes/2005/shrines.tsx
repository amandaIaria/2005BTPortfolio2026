import { createFileRoute } from '@tanstack/react-router';
import { ShrinesPage } from '@2005portfolio/feature';

export const Route = createFileRoute('/2005/shrines')({
  component: ShrinesPage,
});
