import { useTranslation } from 'react-i18next';
import uiKit from '@json/data/json/ui-kit.json';
import { Separator } from '../components/ui/separator';
import { UIKitNav } from '../components/ui-kit/ui-kit-nav';

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

  return (
    <main
      data-component="colors-page"
      className="max-w-[1200px] w-full mx-auto bg-background text-foreground space-y-10 px-4 pb-16 pt-14"
    >
      <header>
        <UIKitNav />
      </header>
      <div>
        <p className="island-kicker mb-2">{t('colors.kicker')}</p>
        <h1 className="display-title text-3xl tracking-tight text-accent md:text-5xl">
          {t('colors.title')}
        </h1>
        <p className="mt-3 max-w-xl text-[var(--sea-ink-soft)]">
          {t('colors.description')}
        </p>
      </div>
      <Separator />
      <div className="space-y-10">
        {uiKit.colorsPage.groups.map((group) => (
          <section key={group.title} className="space-y-4">
            <h2 className="text-xl text-[var(--sea-ink)]">{group.title}</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {group.tokens.map((token) => (
                <ColorSwatch key={token.name} {...token} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
