import {
  Container,
  Hero,
  // LoadIn,
  HomepageNavigation,
  HomeLoadingOverlay,
  Modal,
} from '@general/components';
import json from '@json/data/json/navigation.json';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { initialPathname } from '../lib/initial-pathname';

function ModernHomePage() {
  const { t } = useTranslation();
  const [showIntro, setShowIntro] = useState(() => initialPathname === '/');
  const [modalOpen, setModalOpen] = useState(true);
  return (
    <div className="relative overflow-hidden">
      {showIntro && <HomeLoadingOverlay onDone={() => setShowIntro(false)} />}
      <Hero
        image={{
          src: '/img/headerimage.png',
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
        className="max-w-7xl w-full mx-auto absolute inset-0 flex items-center justify-end "
      >
        {/* <LoadIn json={json} /> */}
        <HomepageNavigation json={json} />
      </Container>
       <Modal
        open={modalOpen}
        id="load-check"
        title="V 0.95"
        description="Just a heads up this site is still being worked on. Images maybe too big and some navigation might be weird."
        type="confirmation"
        onOpenChange={setModalOpen}
      />
    </div>
  );
}

export { ModernHomePage };
