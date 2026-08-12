import { Badge } from '../ui/badge';
import type { SlideTagsProps } from '@general-purpose/types';

export default function SliderTags({ tags }: SlideTagsProps) {
  return (
    <div className="flex gap-2">
      {tags.map((tag, ind) => (
        <Badge variant="outline" asChild key={`tags__${ind}__${tag}`}>
          <span>{tag}</span>
        </Badge>
      ))}
    </div>
  );
}
