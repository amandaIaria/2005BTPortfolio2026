import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { ContactForm } from '../../contact-form';

function ContactFormSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.contactForm.title')}>
      <ContactForm className="max-w-lg" onSubmit={() => {}} />
    </Section>
  );
}

export { ContactFormSection };
