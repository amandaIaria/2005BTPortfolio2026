import { CaseStudyDetail, Container } from '@general/components';
import json from '@json/data/json/case-studies.json';
import { notFound, useParams } from '@tanstack/react-router';

function ModernCaseStudyDetailPage() {
  const { slug } = useParams({ from: '/_app/case-studies/$slug' });
  const caseStudy = json.find((item) => item.slug === slug);

  if (!caseStudy) {
    throw notFound();
  }

  return (
    <Container
      data-component="modern-case-study-detail-page"
      className="max-w-[1200px] mx-auto py-20"
    >
      <CaseStudyDetail caseStudy={caseStudy} />
    </Container>
  );
}

export { ModernCaseStudyDetailPage };
