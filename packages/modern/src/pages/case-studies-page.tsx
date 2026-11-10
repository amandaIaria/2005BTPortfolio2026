import { CaseStudyList, Container } from '@general/components';
import json from '@json/data/json/case-studies.json';
import { useTranslation } from 'react-i18next';

function ModernCaseStudiesPage() {
  const { t } = useTranslation();
  return (
    <Container
      data-component="modern-case-studies-page"
      className="max-w-300 mx-auto py-20 px-4 md:px-0"
    >
      <h1 className="mb-4 md:mb-16">{t('caseStudies.heading')}</h1>
      <CaseStudyList caseStudies={json} />
    </Container>
  );
}

export { ModernCaseStudiesPage };
