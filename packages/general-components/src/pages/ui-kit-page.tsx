import { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';
import { useActiveSection } from '../hooks/use-active-section';
import { Button } from '../components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';
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
import { Footer } from '../components/modern/footer';
import { SocialBar } from '../components/modern/social-bar';
import { AnimatedFooter } from '../components/animated-footer';
import { TentacleFooter } from '../components/tentacle-footer';
import { WebGLTentacleFooter } from '../components/webgl-tentacle-footer';
import { WebGLTentacleWall } from '../components/webgl-tentacle-wall';
import { SpriteAnimation } from '../components/sprite-animation';
import { AppHeader } from '../components/app-header';
import { Switch } from '../components/ui/switch';
import { Slider } from '../components/slider';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '../components/ui/tooltip';
import { AnimatedTitle } from '../components/animated-title';
import { ImageModal } from '../components/image-modal';
import { ImageComparison } from '../components/image-comparison';
import { ContactForm } from '../components/contact-form';
import { sliderSamples } from '@json/data';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={slugify(title)} className="scroll-mt-24 space-y-4">
      <h2 className="text-xl font-semibold text-[var(--sea-ink)]">{title}</h2>
      <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-6">
        {children}
      </div>
    </section>
  );
}

export default function UiKitPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [tocItems, setTocItems] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    const sections = contentRef.current?.querySelectorAll('section[id]');
    if (!sections) return;
    setTocItems(
      Array.from(sections).map((section) => ({
        id: section.id,
        title: section.querySelector('h2')?.textContent ?? section.id,
      })),
    );
  }, []);

  const activeId = useActiveSection(tocItems.map((item) => item.id));

  return (
    <main className="max-w-[1200px] w-full mx-auto bg-background text-foreground space-y-10 px-4 pb-16 pt-14">
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

      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[240px_1fr]">
        <nav className="sticky top-10 flex flex-col gap-1">
          {tocItems.map(({ id, title }) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                'border-l-2 py-1 pl-4 text-sm transition-colors',
                id === activeId
                  ? 'border-accent font-semibold text-[var(--sea-ink)]'
                  : 'border-transparent text-[var(--sea-ink-soft)] hover:text-[var(--sea-ink)]',
              )}
            >
              {title}
            </a>
          ))}
        </nav>
        <div ref={contentRef} className="flex flex-col gap-10">
          {/* Switch */}
          <Section title="Switch">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch id="switch-demo" />
                <label htmlFor="switch-demo" className="text-sm">
                  Default
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="switch-sm" size="sm" />
                <label htmlFor="switch-sm" className="text-sm">
                  Small
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="switch-disabled" disabled />
                <label
                  htmlFor="switch-disabled"
                  className="text-sm text-muted-foreground"
                >
                  Disabled
                </label>
              </div>
            </div>
          </Section>

          {/* App Header */}
          <Section title="App Header">
            <AppHeader className="rounded-lg border border-[var(--line)] bg-[var(--surface)]" />
          </Section>

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

          {/* Animated Title */}
          <Section title="Animated Title">
            <div className="space-y-6">
              <AnimatedTitle className="text-2xl">
                Hover for animation
              </AnimatedTitle>
              <AnimatedTitle className="text-3xl font-bold">
                Large animated title
              </AnimatedTitle>
              <AnimatedTitle className="text-xl">
                Small animated title
              </AnimatedTitle>
            </div>
          </Section>

          {/* Slider */}
          <Section title="Slider">
            <div className="h-96 rounded-lg overflow-hidden border border-[var(--line)]">
              <Slider slides={sliderSamples} ariaLabel="Featured projects" />
            </div>
            <p className="mt-4 text-sm text-[var(--sea-ink-soft)]">
              Bounded container demo. The Slider fills its parent height (h-96).
              Try: keyboard arrows, swipe on mobile, click pagination dots.
            </p>
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

          {/* Alert */}
          <Section title="Alert">
            <div className="flex flex-col gap-4">
              <Alert>
                <AlertTitle>Default</AlertTitle>
                <AlertDescription>
                  A neutral, informational alert.
                </AlertDescription>
              </Alert>
              <Alert variant="info">
                <AlertTitle>Info</AlertTitle>
                <AlertDescription>
                  Uses the BT active/info blue.
                </AlertDescription>
              </Alert>
              <Alert variant="success">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Uses the BT success green.</AlertDescription>
              </Alert>
              <Alert variant="error">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Uses the BT error red.</AlertDescription>
              </Alert>
              <Alert variant="success" onDismiss={() => {}}>
                <AlertTitle>Dismissible success</AlertTitle>
                <AlertDescription>Click the × to dismiss.</AlertDescription>
              </Alert>
              <Alert variant="error" onDismiss={() => {}}>
                <AlertTitle>Dismissible error</AlertTitle>
                <AlertDescription>Click the × to dismiss.</AlertDescription>
              </Alert>
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
                    This is a description of the dialog content. It explains
                    what the user should expect.
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

          {/* Image Modal */}
          <Section title="Image Modal">
            <div className="flex flex-wrap gap-8">
              <div className="max-w-[200px]">
                <ImageModal
                  src="/placeholder-man.jpg"
                  alt="Placeholder portrait"
                  className="rounded-md"
                />
              </div>
              <div className="max-w-[200px]">
                <ImageModal
                  variant="compare"
                  before={{ src: '/placeholder-man.jpg', alt: 'Before' }}
                  after={{ src: '/temp-header.jpg', alt: 'After' }}
                  className="rounded-md"
                />
              </div>
            </div>
          </Section>

          {/* Image Comparison */}
          <Section title="Image Comparison">
            <div className="max-w-md">
              <ImageComparison
                before={{ src: '/placeholder-man.jpg', alt: 'Before' }}
                after={{ src: '/temp-header.jpg', alt: 'After' }}
                className="aspect-square rounded-md"
              />
            </div>
          </Section>

          {/* Contact Form */}
          <Section title="Contact Form">
            <ContactForm className="max-w-lg" onSubmit={() => {}} />
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
                <TooltipContent side="bottom">
                  Appears on the bottom
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="cursor-default">
                    Badge tooltip
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Works on any element
                </TooltipContent>
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
                    {
                      id: '1',
                      label: 'Side A',
                      sublabel: 'Mixtape Vol. 1',
                      modalContent: <p>Content for Side A</p>,
                    },
                    {
                      id: '2',
                      label: 'Side B',
                      sublabel: 'Chill Vibes',
                      modalContent: <p>Content for Side B</p>,
                    },
                    {
                      id: '3',
                      label: 'Demo',
                      sublabel: 'Unreleased',
                      modalContent: <p>Demo tape content</p>,
                    },
                    {
                      id: '4',
                      label: 'Lo-Fi',
                      sublabel: 'Late Night',
                      modalContent: <p>Lo-fi tape content</p>,
                    },
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
            <Playlist videos={[{ id: 'vteCosE9qnM', title: 'Track 1' }]} />
          </Section>

          {/* Footer */}
          <Section title="Footer">
            <Footer className="rounded-lg" />
          </Section>

          {/* Social Bar */}
          <Section title="Social Bar">
            <SocialBar className="rounded-lg bg-black p-4" />
          </Section>

          {/* Animated Footer */}
          <Section title="Animated Footer">
            <AnimatedFooter text="© 2026 Portfolio" className="rounded-lg" />
          </Section>

          {/* Tentacle Footer */}
          <Section title="Tentacle Footer">
            <TentacleFooter text="© 2026 Portfolio" className="rounded-lg" />
          </Section>

          {/* WebGL Tentacle Footer */}
          <Section title="WebGL Tentacle Footer">
            <WebGLTentacleFooter
              text="© 2026 Portfolio"
              tentacleCount={8}
              className="rounded-lg"
            />
          </Section>

          {/* WebGL Tentacle Wall */}
          <Section title="WebGL Tentacle Wall">
            <WebGLTentacleWall
              tentacleCount={6}
              className="h-[50vh] w-full rounded-lg"
            />
          </Section>

          {/* Sprite Animation */}
          <Section title="Sprite Animation">
            <div className="flex flex-wrap items-end gap-6">
              <SpriteAnimation
                src="/tenacleAsset.png"
                columns={10}
                rows={2}
                frameCount={20}
                frameWidth={150}
                frameHeight={150}
                duration={1600}
              />
              <SpriteAnimation
                src="/tenacleAsset.png"
                columns={10}
                rows={2}
                frameCount={20}
                frameWidth={150}
                frameHeight={150}
                duration={1600}
                scale={0.5}
              />
            </div>
            <p className="mt-3 text-sm text-white/60">
              Uses <code>tenacleAsset.png</code> sprite sheet — 10 columns × 2
              rows, 20 frames. Adjust <code>frameWidth</code>/
              <code>frameHeight</code> to match your sprite dimensions.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}
