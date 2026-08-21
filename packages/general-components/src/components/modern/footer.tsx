import { cn, componentName } from '../../lib/utils';
import type { FooterProps } from '@packages/general-components/src/components/types.ts';
import { WebGLTentacleWall } from '../webgl-tentacle-wall';
import { SocialBar } from './social-bar';

function LogoMark() {
  return (
    <div aria-hidden="true" className="max-w-50 w-full">
      <img src="/img/logo2019.svg" alt="Logo Mark" className="w-full" />
    </div>
  );
}

function Footer({
  logoText = 'Beautiful Tragedy',
  year = new Date().getFullYear(),
  className,
  ...props
}: FooterProps) {
  return (
    <footer
      data-component={componentName(Footer)}
      className={cn('relative isolate ', className)}
      {...props}
    >
      <div className="relative hidden md:block -z-10 " aria-hidden="true">
        <WebGLTentacleWall tentacleCount={6} inFooter />
      </div>

      <div className="relative mt-10 md:mt-0 md:absolute z-1 bottom-0 bg-black dark:bg-white w-full pt-10 pb-10">
        <div className="w-full max-w-300 mx-auto flex justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="font-bold text-accent sr-only">{logoText}</span>
          </div>

          <div className="flex items-center dark:text-black dark:text-shadow-white text-white text-shadow-black text-shadow-2xs">
            <div className="flex flex-col gap-4">
              <div className="text-sm text-right">@ {year}</div>
              <SocialBar />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
