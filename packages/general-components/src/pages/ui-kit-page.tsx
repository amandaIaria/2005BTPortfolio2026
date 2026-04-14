import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../components/ui/card';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../components/ui/dialog';
import { Separator } from '../components/ui/separator';
import { Skeleton } from '../components/ui/skeleton';
import { ScrollArea } from '../components/ui/scroll-area';
import { AspectRatio } from '../components/ui/aspect-ratio';
import { TempNav } from '../components/temp-nav';
import { CassetteCarousel } from '../components/cassette-carousel';
import { Playlist } from '../components/playlist';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '../components/ui/tooltip';

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-[var(--sea-ink)]">{title}</h2>
      <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-6">
        {children}
      </div>
    </section>
  );
}

export default function UiKitPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <main className="page-wrap space-y-10 px-4 pb-16 pt-14">
      <header>
        <TempNav />
      </header>
      <div>
        <p className="island-kicker mb-2">General Components</p>
        <h1 className="display-title text-3xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
          UI Kit
        </h1>
        <p className="mt-3 max-w-xl text-[var(--sea-ink-soft)]">
          Live examples of every component in the{' '}
          <code>@general/components</code> package.
        </p>
      </div>

      <Separator />

      {/* Buttons */}
      <Section title="Button">
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      {/* Badge */}
      <Section title="Badge">
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </Section>

      {/* Card */}
      <Section title="Card">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>
                A brief description of the card content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--sea-ink-soft)]">
                This is the card body. It can contain any content.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>With Badge</CardTitle>
              <CardDescription>
                Cards can contain other components.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Badge>React</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="outline">Tailwind</Badge>
              </div>
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle>Small Card</CardTitle>
              <CardDescription>Compact variant.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--sea-ink-soft)]">
                Uses the <code>sm</code> size prop.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Dialog */}
      <Section title="Dialog">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a description of the dialog content. It explains what
                the user should expect.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-[var(--sea-ink-soft)]">
                Dialog body content goes here.
              </p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      {/* Tooltip */}
      <Section title="Tooltip">
        <div className="flex flex-wrap gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>This is a tooltip</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary">With delay</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Appears on the bottom</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="cursor-default">Badge tooltip</Badge>
            </TooltipTrigger>
            <TooltipContent side="right">Works on any element</TooltipContent>
          </Tooltip>
        </div>
      </Section>

      {/* Separator */}
      <Section title="Separator">
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm text-[var(--sea-ink-soft)]">
              Horizontal (default)
            </p>
            <Separator />
          </div>
          <div className="flex h-8 items-center gap-4">
            <span className="text-sm">Item A</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Item B</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Item C</span>
          </div>
        </div>
      </Section>

      {/* Skeleton */}
      <Section title="Skeleton">
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

      {/* Aspect Ratio */}
      <Section title="Aspect Ratio">
        <div className="w-full max-w-md">
          <AspectRatio ratio={16 / 9}>
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-[var(--lagoon)]/10 text-[var(--lagoon-deep)]">
              16:9 Aspect Ratio
            </div>
          </AspectRatio>
        </div>
      </Section>

      {/* Scroll Area */}
      <Section title="Scroll Area">
        <ScrollArea className="h-48 w-full rounded-lg border border-[var(--line)]">
          <div className="p-4">
            {Array.from({ length: 20 }, (_, i) => (
              <p
                key={i}
                className="border-b border-[var(--line)] py-2 text-sm text-[var(--sea-ink-soft)] last:border-0"
              >
                Scrollable item {i + 1}
              </p>
            ))}
          </div>
        </ScrollArea>
      </Section>

      {/* Cassette Carousel */}
      <Section title="Cassette Carousel">
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm text-[var(--sea-ink-soft)]">
              Horizontal (default)
            </p>
            <CassetteCarousel
              slides={[
                { id: '1', label: 'Side A', sublabel: 'Mixtape Vol. 1', modalContent: <p>Content for Side A</p> },
                { id: '2', label: 'Side B', sublabel: 'Chill Vibes', modalContent: <p>Content for Side B</p> },
                { id: '3', label: 'Demo', sublabel: 'Unreleased', modalContent: <p>Demo tape content</p> },
                { id: '4', label: 'Lo-Fi', sublabel: 'Late Night', modalContent: <p>Lo-fi tape content</p> },
              ]}
            />
          </div>
          <div>
            <p className="mb-2 text-sm text-[var(--sea-ink-soft)]">
              Vertical
            </p>
            <CassetteCarousel
              orientation="vertical"
              className="h-64"
              slides={[
                { id: '1', label: 'Track 1', sublabel: 'Intro' },
                { id: '2', label: 'Track 2', sublabel: 'Main Theme' },
                { id: '3', label: 'Track 3', sublabel: 'Outro' },
              ]}
            />
          </div>
        </div>
      </Section>

      {/* Playlist */}
      <Section title="Playlist">
        <Playlist
          videos={[
            { id: 'vteCosE9qnM', title: 'Track 1' },
          ]}
        />
      </Section>
    </main>
  );
}
