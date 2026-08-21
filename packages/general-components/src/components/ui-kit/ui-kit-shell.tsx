import type { ReactNode, MouseEvent } from 'react';
import { UIKitHeader } from './ui-kit-header';
import type { UIKitHeaderProps } from './ui-kit-header';
import { UIKitSticky } from './ui-kit-sticky';
import { UIKitFooter } from './ui-kit-footer';

export interface UIKitShellProps {
  header: UIKitHeaderProps['header'];
  tocItems: { id: string; title: string }[];
  activeId: string | null;
  /** Needed by the shadow-DOM TOC (legacy styles page) to intercept anchor clicks; omit otherwise. */
  onNavClick?: (event: MouseEvent<HTMLElement>) => void;
  children: ReactNode;
}

function UIKitShell({
  header,
  tocItems,
  activeId,
  onNavClick,
  children,
}: UIKitShellProps) {
  return (
    <>
      <main
        data-component="ui-kit-shell"
        className="relative z-10 max-w-300 w-full mx-auto bg-background text-foreground space-y-10 px-4 pb-16 pt-14"
      >
        <UIKitHeader header={header} />

        <div className="relative grid grid-cols-1 items-start gap-10 md:grid-cols-[240px_1fr]">
          <div className="sticky top-4 backdrop-blur-2xl z-11" onClick={onNavClick}>
            <UIKitSticky tocItems={tocItems} activeId={activeId} />
          </div>

          {children}
        </div>
      </main>
      <UIKitFooter />
    </>
  );
}

export { UIKitShell };
