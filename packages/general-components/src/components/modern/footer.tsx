import { cn } from '../../lib/utils';
import type { FooterProps } from '@packages/general-components/src/components/types.ts';
import { WebGLTentacleWall } from '../webgl-tentacle-wall';
import { SocialBar } from './social-bar';

function LogoMark() {
  return (
    <div aria-hidden="true" className="max-w-1/2 w-full">
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
      data-component="footer"
      className={cn('relative overflow-hidden -mt-50', className)}
      {...props}
    >
      <div className="relative block -z-10" aria-hidden="true">
        <WebGLTentacleWall tentacleCount={6} rotate={-90} />
      </div>

      <div className="absolute z-1 bottom-10 w-full">
        <div className="w-full max-w-300 mx-auto flex justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="font-bold text-accent sr-only">{logoText}</span>
          </div>

          <div className="flex items-center">
            <div className="flex flex-col gap-4">
              <div className="text-sm text-white text-right">@ {year}</div>
              <SocialBar />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
