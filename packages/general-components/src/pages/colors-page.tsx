import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import uiKit from '@json/data/json/ui-kit.json';
import { useActiveSection } from '../hooks/use-active-section';
import { UIKitShell } from '../components/ui-kit/ui-kit-shell';
import { Section } from '../components/ui-kit/section';

type ColorToken = {
  name: string;
  label: string;
};

function ColorSwatch({ name, label }: ColorToken) {
  return (
    <div
      data-component="color-swatch"
      className="flex flex-col overflow-hidden rounded-xl border bg-background"
    >
      <div
        className="h-20 w-full"
        style={{ backgroundColor: `var(${name})` }}
      />
      <div className="space-y-0.5 p-3">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <code className="text-xs text-foreground ">{name}</code>
      </div>
    </div>
  );
}

export default function ColorsPage() {
  const { t } = useTranslation('uiKit');
  const contentRef = useRef<HTMLDivElement>(null);
  const [tocItems, setTocItems] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    const sections = contentRef.current?.querySelectorAll('section[id]');
    if (!sections) return;
    setTocItems(
      Array.from(sections).map((section) => ({
        id: section.id,
        title: section.querySelector('h2')?.textContent ?? section.id,
      })),
    );
  }, []);

  const activeId = useActiveSection(tocItems.map((item) => item.id));

  const headerObj = {
    kicker: t('colors.kicker'),
    title: t('colors.title'),
    description: t('colors.description'),
  };

  return (
    <UIKitShell header={headerObj} tocItems={tocItems} activeId={activeId}>
      <div ref={contentRef} data-component="colors-page" className="space-y-10">
        {uiKit.colorsPage.groups.map((group) => (
          <Section key={group.title} title={group.title}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {group.tokens.map((token) => (
                <ColorSwatch key={token.name} {...token} />
              ))}
            </div>
          </Section>
        ))}
      </div>
    </UIKitShell>
  );
}
