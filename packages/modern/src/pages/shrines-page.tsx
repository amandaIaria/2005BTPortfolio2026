import { Container, ShrineGallery } from '@general/components';
import { useTranslation } from 'react-i18next';

function ModernShrinesPage() {
  const { t } = useTranslation();
  return (
    <Container data-component="modern-shrines-page">
      <ShrineGallery
        kicker={t('shrines.kicker')}
        heading={t('shrines.heading')}
        intro={t('shrines.intro')}
      />
    </Container>
  );
}

export { ModernShrinesPage };
