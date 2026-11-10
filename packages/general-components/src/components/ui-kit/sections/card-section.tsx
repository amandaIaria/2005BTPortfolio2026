import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../../ui/card';

function CardSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.card.title')}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t('sections.card.basicTitle')}</CardTitle>
            <CardDescription>
              {t('sections.card.basicDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--sea-ink-soft)]">
              {t('sections.card.basicBody')}
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">{t('sections.card.action')}</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('sections.card.withBadgeTitle')}</CardTitle>
            <CardDescription>
              {t('sections.card.withBadgeDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Badge>{t('sections.card.react')}</Badge>
              <Badge variant="secondary">{t('sections.card.typescript')}</Badge>
              <Badge variant="outline">{t('sections.card.tailwind')}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle>{t('sections.card.smallTitle')}</CardTitle>
            <CardDescription>
              {t('sections.card.smallDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--sea-ink-soft)]">
              {t('sections.card.smallBodyBefore')}
              <code>{t('sections.card.smallBodyCode')}</code>
              {t('sections.card.smallBodyAfter')}
            </p>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}

export { CardSection };
