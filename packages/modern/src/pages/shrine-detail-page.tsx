import { Container, ShrineDetail } from '@general/components';
import json from '@json/data/json/shrines.json';
import { notFound, useParams } from '@tanstack/react-router';
import type { ShrineItem } from '@general/components';

function ModernShrineDetailPage() {
  const { slug } = useParams({ from: '/_app/shrines/$slug' });
  const shrine = (json as ShrineItem[]).find((item) => item.slug === slug);

  if (!shrine) {
    throw notFound();
  }

  return (
    <Container
      data-component="modern-shrine-detail-page"
      className="max-w-[1200px] mx-auto py-20"
    >
      <ShrineDetail shrine={shrine} />
    </Container>
  );
}

export { ModernShrineDetailPage };
