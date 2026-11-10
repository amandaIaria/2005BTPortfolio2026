import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

function InputSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.input.title')}>
      <div className="flex max-w-sm flex-col gap-2">
        <Label htmlFor="input-single">{t('sections.input.label')}</Label>
        <Input
          id="input-single"
          type="text"
          placeholder={t('sections.input.placeholder')}
        />
      </div>
    </Section>
  );
}

export { InputSection };
