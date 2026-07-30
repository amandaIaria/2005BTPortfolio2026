import * as React from 'react';
import { Link } from '@tanstack/react-router';
import { CheckCircleIcon } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { Separator } from './ui/separator';

interface CaseStudyContributor {
  name: string;
  role: string;
  avatar: {
    src: string;
    alt: string;
  };
}

interface CaseStudyOverview {
  label: string;
  description: string;
  sector: string;
  teamSize: string;
  location: string;
}

interface CaseStudySection {
  id: string;
  title: string;
  content: string;
}

interface CaseStudyDetailItem {
  slug: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  contributor: CaseStudyContributor;
  overview: CaseStudyOverview;
  problem: string;
  approach: string;
  outcomes: string[];
  sections: CaseStudySection[];
}

interface CaseStudyDetailProps extends React.ComponentProps<'div'> {
  caseStudy: CaseStudyDetailItem;
}

function CaseStudyDetail({
  caseStudy,
  className,
  ...props
}: CaseStudyDetailProps) {
  return (
    <div
      data-component="case-study-detail"
      className={cn('flex flex-col gap-16', className)}
      {...props}
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          <Link
            to="/modern/case-studies"
            className="pointer w-fit text-sm text-muted-foreground"
          >
            Case Studies
          </Link>
          <h1 className="text-5xl font-bold">{caseStudy.title}</h1>
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              Featuring insights from:
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

      <Separator />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-bold tracking-wide text-accent uppercase">
            {caseStudy.overview.label}
          </p>
          <h3 className="text-lg font-bold">Overview</h3>
          <p className="text-muted-foreground">
            {caseStudy.overview.description}
          </p>
          <dl className="flex flex-col gap-3 text-sm">
            <div>
              <dt className="font-bold">Sector</dt>
              <dd className="text-muted-foreground">
                {caseStudy.overview.sector}
              </dd>
            </div>
            <div>
              <dt className="font-bold">Team size</dt>
              <dd className="text-muted-foreground">
                {caseStudy.overview.teamSize}
              </dd>
            </div>
            <div>
              <dt className="font-bold">Location</dt>
              <dd className="text-muted-foreground">
                {caseStudy.overview.location}
              </dd>
            </div>
          </dl>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold">Problem</h3>
          <p className="text-muted-foreground">{caseStudy.problem}</p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold">Approach</h3>
          <p className="text-muted-foreground">{caseStudy.approach}</p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold tracking-wide text-muted-foreground uppercase">
            On this page
          </h3>
          <ul className="flex flex-col gap-2">
            {caseStudy.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="pointer text-accent">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-bold">Outcomes</h3>
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

      <Separator />

      <div className="flex flex-col gap-16">
        {caseStudy.sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            className="flex flex-col gap-4 scroll-mt-24"
          >
            <h3 className="text-2xl font-bold">{section.title}</h3>
            <p className="max-w-3xl text-lg text-muted-foreground">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { CaseStudyDetail };
export type {
  CaseStudyDetailProps,
  CaseStudyDetailItem,
  CaseStudyContributor,
  CaseStudyOverview,
  CaseStudySection,
};
