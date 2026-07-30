import { Button, Container, ExperienceList } from '@general/components';
import * as json from '@json/data/json/about';
import { ArrowUpRightIcon } from '@phosphor-icons/react';

function ModernExperiencePage() {
  const { experience } = json;
  return (
    <Container
      data-component="modern-experience-page"
      className="max-w-[1200px] mx-auto grid items-center py-20"
    >
      <div className="grid grid-cols-1 items-start gap-20 md:grid-cols-[300px_1fr]">
        <div className="sticky top-10 flex flex-col gap-10">
          <h1 className="text-6xl">Experience</h1>
          <p className="text-2xl font-medium text-accent">
            A look at where I&apos;ve worked and what I&apos;ve built along the
            way.
          </p>
          <div>
            <Button
              asChild
              variant="link"
              className="pointer p-0 text-xl font-bold transition-all duration-500 decoration-accent"
            >
              <a href="/modern/contact">
                Contact
                <ArrowUpRightIcon className="ml-2 inline-block h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        <ExperienceList experiences={experience} />
      </div>
    </Container>
  );
}

export { ModernExperiencePage };
