import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { Skeleton } from '../../ui/skeleton';

function SkeletonSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.skeleton.title')}>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-32 w-full" />
      </div>
    </Section>
  );
}

export { SkeletonSection };
