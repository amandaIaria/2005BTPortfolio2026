import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { SocialBar } from '../../modern/social-bar';

function SocialBarSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.socialBar.title')}>
      <SocialBar className="rounded-lg bg-black p-4" />
    </Section>
  );
}

export { SocialBarSection };
