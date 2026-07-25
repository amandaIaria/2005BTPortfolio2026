import { Container, WebGLTentacleWall } from '@general/components';
import LoadIn from  '@modern/feature/components/load-in';
import json from '@json/data/json/navigation.json'

function ModernHomePage() {
  return (
    <Container data-component="modern-home-page">
      <LoadIn json={json} />
    </Container>
  );
}

export { ModernHomePage };
