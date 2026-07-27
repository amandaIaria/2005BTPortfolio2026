import { createFileRoute } from '@tanstack/react-router';
import { AboutPage } from '@2005portfolio/feature';

export const Route = createFileRoute('/about')({ component: AboutPage });
