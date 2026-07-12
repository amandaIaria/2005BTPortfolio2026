import { createFileRoute } from '@tanstack/react-router';
import SliderPage from '@general/components/pages/slider-page';

export const Route = createFileRoute('/ui-kit/slider')({
  component: SliderPage,
});
