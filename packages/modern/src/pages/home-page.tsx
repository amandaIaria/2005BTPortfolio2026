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
    <div className="relative">
      {showIntro && <HomeLoadingOverlay onDone={() => setShowIntro(false)} />}
      {/* <Hero
        image={{
          src: '/placeholder-man.jpg',
          alt: t('home.heroImageAlt'),
        }}
        topText={t('home.heroTopText')}
        bottomText={t('home.heroBottomText')}
        caption={
          <Trans
            i18nKey="home.subheading"
            components={{ accent: <span className="text-accent" /> }}
          />
        }
        heading={
          <Trans
            i18nKey="home.heading"
            components={{ accent: <span className="text-accent" /> }}
          />
        }
        hiddenH1={t('home.hiddenH1')}
      /> */}
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
        className="max-w-5xl mx-auto absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"
      >
        {/* <LoadIn json={json} /> */}
        {/* <HomepageNavigation json={json} /> */}
      </Container>
    </div>
  );
}

export { ModernHomePage };
