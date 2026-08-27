import {
  Container,
  Hero,
  // LoadIn,
  HomepageNavigation,
  HomeLoadingOverlay,
} from '@general/components';
import json from '@json/data/json/navigation.json';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { initialPathname } from '../lib/initial-pathname';

function ModernHomePage() {
  const { t } = useTranslation();
  const [showIntro, setShowIntro] = useState(() => initialPathname === '/');
  return (
    <div className="relative overflow-hidden">
      {showIntro && <HomeLoadingOverlay onDone={() => setShowIntro(false)} />}
      <Hero
        image={{
          src: '/img/header-pre2.png',
          alt: t('home.heroImageAlt'),
        }}
        topText={t('home.heroTopText')}
        bottomText={t('home.heroBottomText')}
        nameStatement={t('home.nameStatement')}
        caption={t('home.subheading')}
        heading={t('home.heading')}
        hiddenH1={t('home.hiddenH1')}
        startAnimation={!showIntro}
      />
      <Container
        data-component="modern-home-page"
        className="max-w-5xl mx-auto absolute inset-0 flex items-center justify-center translate-y-100"
      >
        {/* <LoadIn json={json} /> */}
        <HomepageNavigation json={json} />
      </Container>
    </div>
  );
}

export { ModernHomePage };
