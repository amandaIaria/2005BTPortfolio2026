import { CaseStudyList, Container } from '@general/components';
import json from '@json/data/json/case-studies.json';

function ModernCaseStudiesPage() {
  return (
    <Container
      data-component="modern-case-studies-page"
      className="max-w-[1200px] mx-auto py-20"
    >
      <h1 className="text-6xl mb-16">Case Studies</h1>
      <CaseStudyList caseStudies={json} />
    </Container>
  );
}

export { ModernCaseStudiesPage };
