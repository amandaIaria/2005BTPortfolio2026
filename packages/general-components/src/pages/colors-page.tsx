import { useTranslation } from 'react-i18next';
import uiKit from '@json/data/json/ui-kit.json';
import { UIKitHeader } from '../components/ui-kit/ui-kit-header';
import { UIKitFooter } from '../components/ui-kit/ui-kit-footer';
import { Section } from '../components/ui-kit/section';

type ColorToken = {
  name: string;
  label: string;
};

function ColorSwatch({ name, label }: ColorToken) {
  return (
    <div
      data-component="color-swatch"
      className="flex flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)]"
    >
      <div
        className="h-20 w-full"
        style={{ backgroundColor: `var(${name})` }}
      />
      <div className="space-y-0.5 p-3">
        <p className="text-sm font-medium text-[var(--sea-ink)]">{label}</p>
        <code className="text-xs text-[var(--sea-ink-soft)]">{name}</code>
      </div>
    </div>
  );
}

export default function ColorsPage() {
  const { t } = useTranslation('uiKit');
  const headerObj = {
    kicker: t('colors.kicker'),
    title: t('colors.title'),
    description: t('colors.description'),
  };

  return (
    <>
    <main
      data-component="colors-page"
      className="max-w-300 relative z-10 w-full mx-auto bg-background text-foreground space-y-10 px-4 pb-16 pt-14"
    >
      <UIKitHeader header={headerObj} />
      
      <div className="space-y-10">
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
    </main>
    <UIKitFooter />
    </>
  );
}
