import {
  Button,
  Container,
  ImageModal,
  InternalTransitionLink,
} from '@general/components';
import * as json from '@json/data/json/about';
import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import type { ModernAboutPageProps } from '@general/components';

function ModernAboutPage() {
  const { about }: ModernAboutPageProps = json;
  const { t } = useTranslation();
  return (
    <Container
      data-component="modern-about-page"
      className="max-w-300 mx-auto grid items-center py-20"
    >
      <div className="grid grid-cols-1 gap-20 md:grid-cols-[auto_1fr]">
        <div className="grid gap-10 items-center h-[70%]">
          <div className="flex sticky top-25 flex-col gap-10">
            <div className="flex gap-10 items-center">
              <div className="overflow-hidden rounded-lg h-25 w-25 flex items-center justify-center">
                <ImageModal
                  variant="compare"
                  before={about.images.before}
                  after={about.images.after}
                  imageClassName=""
                />
              </div>
              <h1 className="text-6xl">{about.title}</h1>
            </div>
            <div>
              <Button
                asChild
                variant="link"
                className="pointer p-0 text-xl font-bold transition-all duration-500 decoration-accent"
              >
                <InternalTransitionLink href="/contact">
                  {t('about.ctaLabel')}
                  <ArrowUpRightIcon className="inline-block h-4 w-4 text-accent bold" />
                </InternalTransitionLink>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-1 gap-10 pt-20 pb-20">
            <div className="text-3xl font-bold flex gap-4 items-center">
              <span>{about.name}</span>
              <span className="text-accent animate-caret-blink duration-100">
                |
              </span>
            </div>
            <div className="text-2xl font-medium text-accent">
              <p>{about.summary}</p>
            </div>
            <div
              className="prose py-4"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(about.full),
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export { ModernAboutPage };
