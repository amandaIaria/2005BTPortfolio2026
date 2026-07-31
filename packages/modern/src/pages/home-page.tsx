import { Container, Hero } from '@general/components';
import LoadIn from '@modern/feature/components/load-in';
import json from '@json/data/json/navigation.json';

function ModernHomePage() {
  return (
    <div className="relative">
      <Hero
        image={{
          src: '/placeholder-man.jpg',
          alt: 'Portrait in shadow against a black background',
        }}
        topText="Beautiful"
        bottomText="Tragedy"
        caption="Lets build something beautiful together."
      />
      <Container
        data-component="modern-home-page"
        className="max-w-5xl mx-auto absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"
      >
        <LoadIn json={json} />
      </Container>
    </div>
  );
}

export { ModernHomePage };
