import { Container } from '@general/components';
import { useTranslation } from 'react-i18next';

function ModernShrinesPage() {
  const { t } = useTranslation();
  return (
    <Container data-component="modern-shrines-page">
      <h1 className="text-2xl font-bold">{t('shrines.heading')}</h1>
    </Container>
  );
}

export { ModernShrinesPage };
