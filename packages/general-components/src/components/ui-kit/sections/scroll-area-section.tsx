import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { ScrollArea } from '../../ui/scroll-area';

function ScrollAreaSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.scrollArea.title')}>
      <ScrollArea className="h-48 w-full rounded-lg border border-[var(--line)]">
        <div className="p-4">
          {Array.from({ length: 20 }, (_, i) => (
            <p
              key={i}
              className="border-b border-[var(--line)] py-2 text-sm text-[var(--sea-ink-soft)] last:border-0"
            >
              {t('sections.scrollArea.itemPrefix')} {i + 1}
            </p>
          ))}
        </div>
      </ScrollArea>
    </Section>
  );
}

export { ScrollAreaSection };
