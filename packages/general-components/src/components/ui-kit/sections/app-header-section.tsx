import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { AppHeader } from '../../app-header';

function AppHeaderSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.appHeader.title')}>
      <AppHeader className="rounded-lg border border-[var(--line)] bg-[var(--surface)]" />
    </Section>
  );
}

export { AppHeaderSection };
