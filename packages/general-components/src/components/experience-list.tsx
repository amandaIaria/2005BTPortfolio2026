import * as React from 'react';
import { cn } from '../lib/utils';
import { Badge } from './ui/badge';

interface ExperienceItem {
  title: string;
  company: string;
  years: string;
  type: string;
  tags: string[];
  summary: string;
}

interface ExperienceListProps extends React.ComponentProps<'div'> {
  experiences: ExperienceItem[];
}

function ExperienceList({
  experiences,
  className,
  ...props
}: ExperienceListProps) {
  return (
    <div
      data-component="experience-list"
      className={cn('flex flex-col', className)}
      {...props}
    >
      {experiences.map((experience, index) => (
        <div
          key={`${experience.company}-${experience.title}`}
          data-component="experience-list-item"
          className="relative border-t border-border py-10 first:pt-0"
        >
          <span
            aria-hidden="true"
            className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-accent"
          />
          <div className="grid grid-cols-[3rem_1fr] gap-6 md:grid-cols-[4rem_1fr]">
            <div className="flex h-8 w-8 items-center justify-center bg-muted text-sm text-muted-foreground md:h-10 md:w-10">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-bold">{experience.title}</h3>
              <p className="text-accent font-medium">
                {experience.company} · {experience.years} · {experience.type}
              </p>
              <div className="flex flex-wrap gap-2">
                {experience.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-muted-foreground">{experience.summary}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export { ExperienceList };
export type { ExperienceListProps, ExperienceItem };
