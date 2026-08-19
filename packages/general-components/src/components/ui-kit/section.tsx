import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  children: React.ReactNode;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ title, children, className, ...props }, ref) => (
    <section
      ref={ref}
      data-component="section"
      id={slugify(title)}
      className={cn('scroll-mt-24 space-y-4', className)}
      {...props}
    >
      <h2 className="text-xl font-semibold text-[var(--sea-ink)]">{title}</h2>
      <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-6">
        {children}
      </div>
    </section>
  ),
);
Section.displayName = 'Section';

export { Section };
