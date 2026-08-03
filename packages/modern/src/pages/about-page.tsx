import { Button, Container, WebGLTentacleWall } from '@general/components';
import * as json from '@json/data/json/about';
import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';

interface ModernAboutPageProps {
  about: {
    title: string;
    name: string;
    image: {
      src: string;
      alt: string;
      height: number;
      width: number;
    };
    summary: string;
    full: string;
    social: string[];
  };
}

function ModernAboutPage() {
  const { about }: ModernAboutPageProps = json;
  const { t } = useTranslation();
  return (
    <Container
      data-component="modern-about-page"
      className="max-w-5xl h-screen mx-auto grid items-center"
    >
      <div className="grid grid-cols-1 gap-20 md:grid-cols-[auto_1fr]">
        <div className="flex flex-col gap-10">
          <div className="flex gap-10 items-center">
            <div className="overflow-hidden rounded-lg h-[100px] w-[100px] flex items-center justify-center">
              <img
                src={about.image.src}
                alt={about.image.alt}
                height={about.image.height}
                width={about.image.width}
                className="object-cover w-full h-full object-center block"
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
              <a href="/contact">
                {t('about.ctaLabel')}
                <ArrowUpRightIcon className="ml-2 inline-block h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-1 gap-10">
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
