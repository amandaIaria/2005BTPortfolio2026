import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { Alert, AlertTitle, AlertDescription } from '../../ui/alert';

function AlertSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.alert.title')}>
      <div className="flex flex-col gap-4">
        <Alert>
          <AlertTitle>{t('sections.alert.defaultTitle')}</AlertTitle>
          <AlertDescription>
            {t('sections.alert.defaultDescription')}
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertTitle>{t('sections.alert.destructiveTitle')}</AlertTitle>
          <AlertDescription>
            {t('sections.alert.destructiveDescription')}
          </AlertDescription>
        </Alert>
      </div>
    </Section>
  );
}

export { AlertSection };
