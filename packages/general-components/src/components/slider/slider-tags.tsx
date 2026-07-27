import { Badge } from '../ui/badge';

interface SlideTags {
  tags: string[];
}

export default function SliderTags({ tags }: SlideTags) {
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
