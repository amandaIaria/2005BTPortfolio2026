import {
  Container,
  ContactForm,
  WebGLTentacleWall,
  SocialBar,
  Footer,
} from '@general/components';
import { useTranslation } from 'react-i18next';

function ModernContactPage() {
  const { t } = useTranslation();

  return (
    <>
      <Container
        data-component="modern-contact-page"
        className=" h-screen grid items-center relative z-10"
      >
        <div className="grid gap-20 grid-cols-[400px_1fr] max-w-200 w-full mx-auto relative z-10 backdrop-blur-sm">
          <div className="flex flex-col gap-10">
            <h1 className="text-6xl">{t('contact.heading')}</h1>
            <p className="text-md font-medium text-accent">
              {t('contact.intro')}
            </p>
            <SocialBar />
          </div>
          <div className="flex flex-col gap-10">
            <ContactForm />
          </div>
        </div>
        <div className="absolute bottom-0">
          <Footer />
        </div>
      </Container>
    </>
  );
}

export { ModernContactPage };
