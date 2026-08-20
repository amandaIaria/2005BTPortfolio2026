import {
  Button,
  Container,
  ImageModal,
  InternalTransitionLink,
  Typewriter,
} from '@general/components';
import * as json from '@json/data/json/about';
import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import type { ModernAboutPageProps } from '@general/components';

function ModernAboutPage() {
  const { about }: ModernAboutPageProps = json;
  const { t } = useTranslation();

  return (
    <Container
      data-component="modern-about-page"
      className="max-w-300 mx-auto grid items-center pt-22 pb-0 md:pb-20 md:pt-20"
    >
      <div className="grid grid-cols-1 px-4 md:px-0 gap-4 md:gap-20 md:grid-cols-[auto_1fr]">
        <header className="grid items-center h-full md:h-[70%]">
          <div className="flex md:sticky md:top-25 flex-col gap-0 md:gap-10">
            <div className="flex gap-10 items-center">
              <div className="overflow-hidden rounded-lg h-25 w-25 flex items-center justify-center">
                <ImageModal
                  variant="compare"
                  before={about.images.before}
                  after={about.images.after}
                  imageClassName=""
                />
              </div>
              <h1 className="w-full text-right md:text-left">{about.title}</h1>
            </div>
            <div className="text-right md:text-left">
              <Button
                asChild
                variant="link"
                className=" pointer p-0 text-xl font-bold transition-all duration-500 decoration-accent"
              >
                <InternalTransitionLink href="/contact">
                  {t('about.ctaLabel')}
                  <ArrowUpRightIcon className="inline-block h-4 w-4 text-accent bold" />
                </InternalTransitionLink>
              </Button>
            </div>
          </div>
        </header>
        <div className="flex flex-col">
          <div className="grid grid-cols-1 gap-4 md:gap-10 md:pt-20 md:pb-20">
            <div className="text-3xl font-bold flex gap-4 items-center">
              <span>{about.name}</span>
              <span className="text-accent animate-caret-blink duration-100">
                |
              </span>
            </div>
            <div className="text-2xl font-medium text-accent">
              <p>{about.summary}</p>
            </div>
            <Typewriter text={about.full} className="pt-0 md:py-4" />
          </div>
        </div>
      </div>
    </Container>
  );
}

export { ModernAboutPage };
