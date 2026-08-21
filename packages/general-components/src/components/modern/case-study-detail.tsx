import { useTranslation } from 'react-i18next';
import { CheckCircleIcon } from '@phosphor-icons/react';
import { Breadcrumb } from './breadcrumb';
import { Footer } from './footer';
import { StickySideNav } from './sticky-side-nav';
import type { CaseStudyDetailProps } from '@packages/general-components/src/components/types.ts';
import { cn } from '../../lib/utils';
import { PortfolioSeparator } from '../atoms/portfolio-separator';

function CaseStudyDetail({
  caseStudy,
  className,
  ...props
}: CaseStudyDetailProps) {
  const { t } = useTranslation();
  return (
    <div
      data-component="case-study-detail"
      className={cn(className)}
      {...props}
    >
      <header className="w-full p-4 md:p-10  bg-black text-white dark:bg-background dark:text-foreground">
        <div className="max-w-300 mx-auto pt-20 pb-0 md:py-20">
          <Breadcrumb
            href="/case-studies"
            label={t('caseStudies.detail.backLink')}
          />
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_320px]">
            <div className="flex flex-col gap-6">
              <h1 className="md:mt-0 mt-4">{caseStudy.title}</h1>
              <div className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">
                  {t('caseStudies.detail.featuringInsightsFrom')}
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={caseStudy.contributor.avatar.src}
                    alt={caseStudy.contributor.avatar.alt}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold">{caseStudy.contributor.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {caseStudy.contributor.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="aspect-square overflow-hidden bg-muted md:aspect-auto">
              <img
                src={caseStudy.image.src}
                alt={caseStudy.image.alt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto w-full max-w-300 pb-20 pt-4 md:pt-20 px-4 ">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 backdrop-blur-sm [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_40px,black_calc(100%_-_40px),transparent),linear-gradient(to_bottom,transparent,black_40px,black_calc(100%_-_40px),transparent)]"
        />
        <div className="grid grid-cols-1 gap-0 md:gap-10 md:grid-cols-4">
          <div className="contents md:flex md:flex-col md:gap-4 md:relative md:order-2 md:w-full">
            <StickySideNav
              content={caseStudy}
              navLabel={t('caseStudies.navSidebarLabel')}
            />
          </div>

          <div className="col-span-3 flex flex-col md:flex-row gap-6 md:order-1">
            <div className="flex flex-col gap-4 relative top-0 flex-basis-[200px] w-[200px]">
              <p className="text-sm font-bold tracking-wide text-accent uppercase">
                {caseStudy.overview.label}
              </p>
              <h3 className="text-lg font-bold">
                {t('caseStudies.detail.overviewHeading')}
              </h3>
              <p className="text-muted-foreground">
                {caseStudy.overview.description}
              </p>
              <dl className="flex flex-col gap-3 text-sm">
                <div>
                  <dt className="font-bold">
                    {t('caseStudies.detail.sectorLabel')}
                  </dt>
                  <dd className="text-muted-foreground">
                    {caseStudy.overview.sector}
                  </dd>
                </div>
                <div>
                  <dt className="font-bold">
                    {t('caseStudies.detail.teamSizeLabel')}
                  </dt>
                  <dd className="text-muted-foreground">
                    {caseStudy.overview.teamSize}
                  </dd>
                </div>
                <div>
                  <dt className="font-bold">
                    {t('caseStudies.detail.locationLabel')}
                  </dt>
                  <dd className="text-muted-foreground">
                    {caseStudy.overview.location}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="col-span-2 flex flex-col gap-6 flex-1">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-bold">
                    {t('caseStudies.detail.problemHeading')}
                  </h3>
                  <p className="text-muted-foreground">{caseStudy.problem}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-bold">
                    {t('caseStudies.detail.approachHeading')}
                  </h3>
                  <p className="text-muted-foreground">{caseStudy.approach}</p>
                </div>
              </div>

              <PortfolioSeparator />

              <div className="flex flex-col gap-6">
                <h3 className="text-2xl font-bold">
                  {t('caseStudies.detail.outcomesHeading')}
                </h3>
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {caseStudy.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3">
                      <CheckCircleIcon
                        weight="fill"
                        className="mt-1 h-5 w-5 shrink-0 text-accent"
                      />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <PortfolioSeparator />

              <div className="flex flex-col gap-16">
                {caseStudy.content.map((section) => (
                  <div
                    key={section.id}
                    id={section.id}
                    className="flex flex-col gap-4 scroll-mt-24"
                  >
                    {section.copy && (
                      <div>
                        <h3 className="text-2xl font-bold">{section.title}</h3>
                        <p className="max-w-3xl text-lg text-muted-foreground">
                          {section.copy}
                        </p>
                      </div>
                    )}

                    {section.image && (
                      <figure className=" shadow-[5px_5px_5px_#ccc] overflow-hidden bg-muted md:-mx-[400px] md:min-h-[200px] ">
                        <img
                          src={section.image.src}
                          alt={section.image.alt}
                          className="h-full w-full object-cover"
                        />
                      </figure>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export { CaseStudyDetail };
