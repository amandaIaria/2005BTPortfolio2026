import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { Switch } from '../../ui/switch';

function SwitchSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.switch.title')}>
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <Switch id="switch-demo" />
          <label htmlFor="switch-demo" className="text-sm">
            {t('sections.switch.default')}
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="switch-sm" size="sm" />
          <label htmlFor="switch-sm" className="text-sm">
            {t('sections.switch.small')}
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="switch-disabled" disabled />
          <label
            htmlFor="switch-disabled"
            className="text-sm text-muted-foreground"
          >
            {t('sections.switch.disabled')}
          </label>
        </div>
      </div>
    </Section>
  );
}

export { SwitchSection };
