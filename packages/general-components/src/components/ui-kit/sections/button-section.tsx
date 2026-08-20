import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { Button } from '../../ui/button';

function ButtonSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.button.title')}>
      <div className="flex flex-wrap gap-3">
        <Button>{t('sections.button.default')}</Button>
        <Button variant="secondary">{t('sections.button.secondary')}</Button>
        <Button variant="outline">{t('sections.button.outline')}</Button>
        <Button variant="ghost">{t('sections.button.ghost')}</Button>
        <Button variant="destructive">
          {t('sections.button.destructive')}
        </Button>
        <Button variant="link">{t('sections.button.link')}</Button>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button size="xs">{t('sections.button.extraSmall')}</Button>
        <Button size="sm">{t('sections.button.small')}</Button>
        <Button size="default">{t('sections.button.default')}</Button>
        <Button size="lg">{t('sections.button.large')}</Button>
        <Button disabled>{t('sections.button.disabled')}</Button>
      </div>
    </Section>
  );
}

export { ButtonSection };
