import {
  LinkedinLogoIcon,
  GithubLogoIcon,
  CodepenLogoIcon,
} from '@phosphor-icons/react';
import json from '@json/data/json/about.json';
import { cn, componentName } from '../../lib/utils';
import type { SocialBarProps } from '@packages/general-components/src/components/types.ts';
import { PortfolioButton } from '../atoms/portfolio-button';

const [DEFAULT_CODEPEN_HREF, DEFAULT_LINKEDIN_HREF, DEFAULT_GITHUB_HREF] =
  json.about.social;

function SocialBar({
  linkedinHref = DEFAULT_LINKEDIN_HREF,
  githubHref = DEFAULT_GITHUB_HREF,
  codepenHref = DEFAULT_CODEPEN_HREF,
  className,
  ...props
}: SocialBarProps) {
  return (
    <div
      data-component={componentName(SocialBar)}
      className={cn('flex items-center gap-4', className)}
      {...props}
    >
      <PortfolioButton
        className="bg-black shadow-[inset_0_-4px_0_0_var(--accent)] flex items-center
        "
        asChild
      >
        <a
          href={codepenHref}
          target="_blank"
          rel="noreferrer"
          aria-label="CodePen Profile"
          className=""
        >
          <CodepenLogoIcon aria-hidden="true" className="" />
        </a>
      </PortfolioButton>
      <PortfolioButton
        className="bg-black shadow-[inset_0_-4px_0_0_var(--accent)] flex items-center"
        asChild
      >
        <a
          href={linkedinHref}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn Profile"
          className=""
        >
          <LinkedinLogoIcon aria-hidden="true" className="" />
        </a>
      </PortfolioButton>
      <PortfolioButton
        className="bg-black shadow-[inset_0_-4px_0_0_var(--accent)] flex items-center"
        asChild
      >
        <a
          href={githubHref}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub Profile"
          className=""
        >
          <GithubLogoIcon aria-hidden="true" className="" />
        </a>
      </PortfolioButton>
    </div>
  );
}

export { SocialBar };
