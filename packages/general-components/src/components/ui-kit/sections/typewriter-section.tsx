import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { Typewriter } from '../../modern/typewriter';

function TypewriterSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.typewriter.title')}>
      <Typewriter text={t('sections.typewriter.text')} />
    </Section>
  );
}

export { TypewriterSection };
