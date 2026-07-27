import { Container, Slider } from '@general/components';
import json from '@json/data/json/projects.json';

function ModernProjectsPage() {
  return (
    <Container
      className="w-screen h-screen overflow-hidden"
      data-component="modern-projects-page"
    >
      <Slider
        slides={json}
        ariaLabel="Featured projects carousel"
        className="w-full h-full"
      />
    </Container>
  );
}

export { ModernProjectsPage };
