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
      className="max-w-[1200px] mx-auto grid items-center py-20"
    >
      <div className="grid grid-cols-1 items-start gap-20 md:grid-cols-[300px_1fr]">
        <div className="grid gap-10 items-center h-[70%]">
          <div className="flex sticky top-[100px] flex-col gap-10">
            <h1 className="text-6xl">{t('experience.heading')}</h1>
            <p className="text-2xl font-medium text-accent">
              {t('experience.subtitle')}
            </p>
            <div>
              <Button
                asChild
                variant="link"
                className="pointer p-0 text-xl font-bold transition-all duration-500 decoration-accent"
              >
                <InternalTransitionLink href="/contact">
                  {t('experience.ctaLabel')}
                  <ArrowUpRightIcon className="inline-block h-4 w-4 text-accent" />
                </InternalTransitionLink>
              </Button>
            </div>
          </div>
        </div>
        <ExperienceList experiences={experience} />
      </div>
    </Container>
  );
}

export { ModernExperiencePage };
