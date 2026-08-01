import { CaseStudyList, Container } from '@general/components';
import json from '@json/data/json/case-studies.json';
import { useTranslation } from 'react-i18next';

function ModernCaseStudiesPage() {
  const { t } = useTranslation();
  return (
    <Container
      data-component="modern-case-studies-page"
      className="max-w-[1200px] mx-auto py-20"
    >
      <h1 className="text-6xl mb-16">{t('caseStudies.heading')}</h1>
      <CaseStudyList caseStudies={json} />
    </Container>
  );
}

export { ModernCaseStudiesPage };
