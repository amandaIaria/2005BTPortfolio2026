import { Container, Hero, LoadIn, HomeLoadingOverlay } from '@general/components';
import json from '@json/data/json/navigation.json';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { initialPathname } from '../lib/initial-pathname';

function ModernHomePage() {
  const { t } = useTranslation();
  const [showIntro, setShowIntro] = useState(
    () => initialPathname === '/modern' || initialPathname === '/modern/',
  );
  return (
    <div className="relative">
      {showIntro && <HomeLoadingOverlay onDone={() => setShowIntro(false)} />}
      <Hero
        image={{
          src: '/placeholder-man.jpg',
          alt: t('home.heroImageAlt'),
        }}
        topText={t('home.heroTopText')}
        bottomText={t('home.heroBottomText')}
        caption={t('home.subheading')}
        heading={t('home.heading')}
        hiddenH1={t('home.hiddenH1')}
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
