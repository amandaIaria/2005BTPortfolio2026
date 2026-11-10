import { Container, Slider } from '@general/components';
import json from '@json/data/json/projects.json';
import { useTranslation } from 'react-i18next';

function ModernProjectsPage() {
  const { t } = useTranslation();
  return (
    <Container
      className="md:w-screen md:h-screen overflow-hidden"
      data-component="modern-projects-page"
    >
      <Slider
        slides={json}
        ariaLabel={t('projects.carouselAriaLabel')}
        className="w-full h-full"
      />
    </Container>
  );
}

export { ModernProjectsPage };
