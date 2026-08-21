import {
  Button,
  Container,
  ExperienceList,
  InternalTransitionLink,
} from '@general/components';
import * as json from '@json/data/json/about';
import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

function ModernExperiencePage() {
  const { experience } = json;
  const { t } = useTranslation();
  return (
    <Container
      data-component="modern-experience-page"
      className="max-w-300 mx-auto grid items-center pt-22 pb-0 md:py-20"
    >
      <div className="md:px-0 px-4 grid grid-cols-1 items-start gap-10 md:gap-20 md:grid-cols-[300px_1fr]">
        <header className="grid gap-4 md:gap-10 items-center h-[70%]">
          <div className="flex md:sticky top-[100px] flex-col gap-4 md:gap-10">
            <h1 className="">{t('experience.heading')}</h1>
            <p className="text-2xl font-medium text-accent">
              {t('experience.subtitle')}
            </p>
            <div className="w-full text-right md:text-left">
          
            <InternalTransitionLink href="/contact" className=" pointer p-0 text-xl font-bold transition-all duration-500 decoration-accent"
             >
                  <span>{t('experience.ctaLabel')}</span>
                  <ArrowUpRightIcon className="ml-2 inline-block h-5 w-5 text-accent bold" />
                </InternalTransitionLink>
          
            </div>
          </div>
        </header>
        <ExperienceList experiences={experience} />
      </div>
    </Container>
  );
}

export { ModernExperiencePage };
