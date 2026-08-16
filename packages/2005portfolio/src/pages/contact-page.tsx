import { Container, ContactForm } from '@general/components';
import { useTranslation } from 'react-i18next';

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <Container data-component="contact-page">
      <h1 className="text-2xl font-bold">{t('contact.heading')}</h1>
      <p className="mt-2 max-w-prose text-sm text-muted-foreground">
        {t('contact.intro')}
      </p>
      <ContactForm className="mt-8 max-w-lg" />
    </Container>
  );
}
