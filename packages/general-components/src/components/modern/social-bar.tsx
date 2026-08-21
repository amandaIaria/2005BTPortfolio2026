import { LinkedinLogoIcon, GithubLogoIcon } from '@phosphor-icons/react';
import json from '@json/data/json/about.json';
import { cn, componentName } from '../../lib/utils';
import type { SocialBarProps } from '@packages/general-components/src/components/types.ts';
import { PortfolioButton } from '../atoms/portfolio-button';

const [DEFAULT_BLUESKY_HREF, DEFAULT_LINKEDIN_HREF, DEFAULT_GITHUB_HREF] =
  json.about.social;

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
        className="bg-black shadow-[inset_0_-4px_0_0_var(--accent)]"
      >
        <LinkedinLogoIcon aria-hidden="true" className="" />
      </PortfolioButton>
      <PortfolioButton
        href={githubHref}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="bg-black shadow-[inset_0_-4px_0_0_var(--accent)]"
      >
        <GithubLogoIcon aria-hidden="true" className="" />
      </PortfolioButton>
    </div>
  );
}

export { SocialBar };
