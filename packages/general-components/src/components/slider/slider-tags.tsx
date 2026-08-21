import { PortfolioBadge } from '../atoms/portfolio-badge';
import { Badge } from '../ui/badge';
import type { SlideTagsProps } from '@packages/general-components/src/components/types.ts';

export default function SliderTags({ tags }: SlideTagsProps) {
  return (
    <div className="flex gap-2">
      {tags.map((tag, ind) => (
        <PortfolioBadge variant="outline" asChild key={`tags__${ind}__${tag}`}>
          <span>{tag}</span>
        </PortfolioBadge>
      ))}
    </div>
  );
}
