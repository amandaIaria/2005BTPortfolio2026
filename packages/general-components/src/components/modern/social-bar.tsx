import { LinkedinLogoIcon, GithubLogoIcon } from '@phosphor-icons/react';
import json from '@json/data/json/about.json';
import { cn } from '../../lib/utils';
import type { SocialBarProps } from '@packages/general-components/src/components/types.ts';

const [, DEFAULT_LINKEDIN_HREF, DEFAULT_GITHUB_HREF] = json.about.social;

function SocialBar({
  linkedinHref = DEFAULT_LINKEDIN_HREF,
  githubHref = DEFAULT_GITHUB_HREF,
  className,
  ...props
}: SocialBarProps) {
  return (
    <div
      data-component="social-bar"
      className={cn('flex items-center gap-4', className)}
      {...props}
    >
      <a
        href={linkedinHref}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className="rounded border border-white/20 p-2 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <LinkedinLogoIcon aria-hidden="true" className="h-4 w-4" />
      </a>
      <a
        href={githubHref}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="rounded border border-white/20 p-2 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <GithubLogoIcon aria-hidden="true" className="h-4 w-4" />
      </a>
    </div>
  );
}

export { SocialBar };
