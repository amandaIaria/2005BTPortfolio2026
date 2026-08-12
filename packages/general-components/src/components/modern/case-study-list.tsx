import * as React from 'react';
import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { cn } from '../../lib/utils';
import { InternalTransitionLink } from '../page-transition/internal-transition-link';
import { Button } from '../ui/button';
import type { CaseStudyListProps } from '@general-purpose/types';

function CaseStudyList({
  caseStudies,
  className,
  ...props
}: CaseStudyListProps) {
  return (
    <div
      data-component="case-study-list"
      className={cn('grid grid-cols-1 gap-16 md:grid-cols-2', className)}
      {...props}
    >
      {caseStudies.map((caseStudy) => (
        <div
          key={caseStudy.slug}
          data-component="case-study-list-item"
          className="flex flex-col gap-6"
        >
          <div className="aspect-video overflow-hidden bg-muted">
            <img
              src={caseStudy.image.src}
              alt={caseStudy.image.alt}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-bold">{caseStudy.title}</h3>
            <p className="text-muted-foreground">{caseStudy.description}</p>
          </div>
          <Button
            asChild
            variant="link"
            className="pointer w-fit p-0 text-lg font-bold transition-all duration-500 decoration-accent"
          >
            <InternalTransitionLink href={`/case-studies/${caseStudy.slug}`}>
              {caseStudy.link.copy}
              <ArrowUpRightIcon className="ml-2 inline-block h-4 w-4" />
            </InternalTransitionLink>
          </Button>
        </div>
      ))}
    </div>
  );
}

export { CaseStudyList };
