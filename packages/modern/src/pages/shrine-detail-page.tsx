import { Container, ShrineDetail } from '@general/components';
import json from '@json/data/json/shrines.json';
import { notFound, useParams } from '@tanstack/react-router';
import type { ShrineItemProps } from '@general/components';

function ModernShrineDetailPage() {
  const { slug } = useParams({ from: '/_app/shrines/$slug' });
  const shrine = Object.values(
    json['shrine-pages'] as Record<string, ShrineItemProps>,
  ).find((page) => page.slug === slug);

  if (!shrine) {
    throw notFound();
  }

  return (
    <Container
      data-component="modern-shrine-detail-page"
      className="bg-background"
    >
      <ShrineDetail shrine={shrine} />
    </Container>
  );
}

export { ModernShrineDetailPage };
