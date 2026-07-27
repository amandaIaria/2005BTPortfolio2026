import { createFileRoute } from '@tanstack/react-router';
import { ArtPage } from '@2005portfolio/feature';

export const Route = createFileRoute('/art')({ component: ArtPage });
