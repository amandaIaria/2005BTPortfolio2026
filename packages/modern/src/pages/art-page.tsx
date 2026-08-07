import { useState } from 'react';
import { Container, ArtGallery, Modal } from '@general/components';
import { useTranslation } from 'react-i18next';

function ModernArtPage() {
  const { t } = useTranslation();
  const [nsfwModalOpen, setNsfwModalOpen] = useState(true);

  return (
    <Container data-component="modern-art-page">
      <Modal
        id="nsfw-check"
        title={t('art.modal.title')}
        description={t('art.modal.description')}
        type="confirmation"
        open={nsfwModalOpen}
        onOpenChange={setNsfwModalOpen}
      />
      <ArtGallery />
    </Container>
  );
}

export { ModernArtPage };
