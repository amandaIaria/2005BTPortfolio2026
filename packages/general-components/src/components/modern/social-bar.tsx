import { LinkedinLogoIcon, GithubLogoIcon } from '@phosphor-icons/react';
import json from '@json/data/json/about.json';
import { cn, componentName } from '../../lib/utils';
import type { SocialBarProps } from '@packages/general-components/src/components/types.ts';
import { PortfolioButton } from '../portfolio-button';

const [, DEFAULT_LINKEDIN_HREF, DEFAULT_GITHUB_HREF] = json.about.social;

function SocialBar({
  linkedinHref = DEFAULT_LINKEDIN_HREF,
  githubHref = DEFAULT_GITHUB_HREF,
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
        href={linkedinHref}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className="rounded border-b-accent  p-2 cursor-pointer text-white hover:bg-accent bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <LinkedinLogoIcon aria-hidden="true" className="" />
      </PortfolioButton>
      <PortfolioButton
        href={githubHref}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="rounded border-b-accent  p-2 cursor-pointer text-white hover:bg-accent bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <GithubLogoIcon aria-hidden="true" className="" />
      </PortfolioButton>
    </div>
  );
}

export { SocialBar };
