import {
  Alert,
  AlertDescription,
  Container,
  ContactForm,
  SocialBar,
  Footer,
} from '@general/components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { SubmitStatus } from '@general/components';

function ModernContactPage() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const handleSubmit = (s: SubmitStatus) => {
    setStatus(s);
    setTimeout(() => {
      setStatus('idle');
    }, 5000);
  };

  return (
    <>
      <Container
        data-component="modern-contact-page"
        className=" md:h-screen grid items-center relative z-10"
      >
        <div className="relative z-10 mx-auto w-full max-w-300 pt-22 px-4">
          <div
            aria-hidden="true"
            className="hidden md:block md:absolute inset-0 -z-10 backdrop-blur-sm [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_40px,black_calc(100%_-_40px),transparent),linear-gradient(to_bottom,transparent,black_40px,black_calc(100%_-_40px),transparent)]"
          />
          <div>
            <div className="mb-4 mt-4 md:mb-0 md:mt-0">
              {status === 'success' && (
                <Alert
                  variant="success"
                  onDismiss={() => setStatus('idle')}
                  className="animate-in fade-in-0"
                >
                  <AlertDescription>
                    {t('contact.successMessage')}
                  </AlertDescription>
                </Alert>
               )}
              {status === 'error' && (
                <Alert
                  variant="error"
                  onDismiss={() => setStatus('idle')}
                  className="animate-in fade-in-0"
                >
                  <AlertDescription>
                    {t('contact.errorMessage')}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-6 md:gap-20 md:p-10">
            <div className="flex flex-col gap-4 md:gap-10">
              <h1 className="">{t('contact.heading')}</h1>
              <p className="text-md font-medium text-accent">
                {t('contact.intro')}
              </p>
              <SocialBar />
            </div>
            <div className="flex flex-col gap-10">
              <ContactForm onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
        <div className="relative md:absolute bottom-0">
          <Footer />
        </div>
      </Container>
    </>
  );
}

export { ModernContactPage };
