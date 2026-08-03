import {
  Container,
  ExternalTransitionLink,
  WebGLTentacleWall,
} from '@general/components';
import { Button } from '@general/components/button';
import { GithubLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

function ModernContactPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="fixed -z-10 -bottom-[50vh]">
        <WebGLTentacleWall tentacleCount={6} rotate={-90} />
      </div>
      <Container
        data-component="modern-contact-page"
        className="max-w-5xl h-screen mx-auto grid items-center"
      >
        <div className="grid gap-20 grid-cols-[400px_1fr]">
          <div className="flex flex-col gap-10">
            <h1 className="text-6xl">{t('contact.heading')}</h1>
            <p className="text-md font-medium text-accent">
              {t('contact.intro')}
            </p>
            <ul className="flex gap-6">
              <li className="">
                <ExternalTransitionLink
                  className="cursor-pointer block"
                  href="https://www.linkedin.com/in/amanda-iaria/"
                >
                  <LinkedinLogoIcon size={32} />
                </ExternalTransitionLink>
              </li>
              <li className="">
                <ExternalTransitionLink
                  className="cursor-pointer block"
                  href="#"
                >
                  <GithubLogoIcon size={32} />
                </ExternalTransitionLink>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-10">
            <form
              action="/api/contact"
              method="POST"
              className="grid grid-cols-1 gap-6"
            >
              <input
                type="text"
                name="name"
                placeholder={t('contact.namePlaceholder')}
                required
                className="w-full rounded-lg border border-gray-300 p-4 text-lg focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
              />
              <input
                type="email"
                name="email   "
                placeholder={t('contact.emailPlaceholder')}
                required
                className="w-full rounded-lg border border-gray-300 p-4 text-lg focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
              />
              <textarea
                name="message"
                placeholder={t('contact.messagePlaceholder')}
                required
                className="w-full rounded-lg border border-gray-300 p-4 text-lg focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
              ></textarea>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  className="cursor-pointer rounded-lg bg-accent p-6 text-lg font-semibold text-white transition-colors duration-300 hover:bg-accent-dark"
                >
                  {t('contact.submitLabel')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}

export { ModernContactPage };
