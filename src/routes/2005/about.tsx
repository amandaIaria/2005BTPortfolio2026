import { createFileRoute } from '@tanstack/react-router';
import { AboutPage } from '@2005portfolio/feature';

export const Route = createFileRoute('/2005/about')({ component: AboutPage });
