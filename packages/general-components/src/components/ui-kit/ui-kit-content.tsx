import { forwardRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { Section } from './section';
import { Button } from '../ui/button';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import { ScrollArea } from '../ui/scroll-area';
import { AspectRatio } from '../ui/aspect-ratio';

import { CassetteCarousel } from '../cassette-carousel';
import { Playlist } from '../playlist';
import { SocialBar } from '../modern/social-bar';
import { AppHeader } from '../app-header';
import { Switch } from '../ui/switch';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { AnimatedTitle } from '../animated-title';
import { ImageModal } from '../image-modal';
import { ImageComparison } from '../image-comparison';
import { Typewriter } from '../typewriter';
import { ContactForm } from '../contact-form';
import { useTranslation } from 'react-i18next';

export interface UIKitContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const UIKitContent = forwardRef<HTMLDivElement, UIKitContentProps>(
  ({ className, ...props }, ref) => {
    const { t } = useTranslation('uiKit');
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
      <div
        ref={ref}
        data-component="ui-kit-content"
        className={cn('flex flex-col gap-10', className)}
        {...props}
      >
        {/* Switch */}
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

        {/* App Header */}
        <Section title={t('sections.appHeader.title')}>
          <AppHeader className="rounded-lg border border-[var(--line)] bg-[var(--surface)]" />
        </Section>

        {/* Buttons */}
        <Section title={t('sections.button.title')}>
          <div className="flex flex-wrap gap-3">
            <Button>{t('sections.button.default')}</Button>
            <Button variant="secondary">
              {t('sections.button.secondary')}
            </Button>
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

        {/* Animated Title */}
        <Section title={t('sections.animatedTitle.title')}>
          <div className="space-y-6">
            <AnimatedTitle className="text-2xl">
              {t('sections.animatedTitle.hover')}
            </AnimatedTitle>
            <AnimatedTitle className="text-3xl font-bold">
              {t('sections.animatedTitle.large')}
            </AnimatedTitle>
            <AnimatedTitle className="text-xl">
              {t('sections.animatedTitle.small')}
            </AnimatedTitle>
          </div>
        </Section>

        {/* Badge */}
        <Section title={t('sections.badge.title')}>
          <div className="flex flex-wrap gap-3">
            <Badge>{t('sections.badge.default')}</Badge>
            <Badge variant="secondary">{t('sections.badge.secondary')}</Badge>
            <Badge variant="destructive">
              {t('sections.badge.destructive')}
            </Badge>
            <Badge variant="outline">{t('sections.badge.outline')}</Badge>
          </div>
        </Section>

        {/* Alert */}
        <Section title={t('sections.alert.title')}>
          <div className="flex flex-col gap-4">
            <Alert>
              <AlertTitle>{t('sections.alert.defaultTitle')}</AlertTitle>
              <AlertDescription>
                {t('sections.alert.defaultDescription')}
              </AlertDescription>
            </Alert>
            <Alert variant="info">
              <AlertTitle>{t('sections.alert.infoTitle')}</AlertTitle>
              <AlertDescription>
                {t('sections.alert.infoDescription')}
              </AlertDescription>
            </Alert>
            <Alert variant="success">
              <AlertTitle>{t('sections.alert.successTitle')}</AlertTitle>
              <AlertDescription>
                {t('sections.alert.successDescription')}
              </AlertDescription>
            </Alert>
            <Alert variant="error">
              <AlertTitle>{t('sections.alert.errorTitle')}</AlertTitle>
              <AlertDescription>
                {t('sections.alert.errorDescription')}
              </AlertDescription>
            </Alert>
            <Alert variant="success" onDismiss={() => {}}>
              <AlertTitle>
                {t('sections.alert.dismissibleSuccessTitle')}
              </AlertTitle>
              <AlertDescription>
                {t('sections.alert.dismissDescription')}
              </AlertDescription>
            </Alert>
            <Alert variant="error" onDismiss={() => {}}>
              <AlertTitle>
                {t('sections.alert.dismissibleErrorTitle')}
              </AlertTitle>
              <AlertDescription>
                {t('sections.alert.dismissDescription')}
              </AlertDescription>
            </Alert>
          </div>
        </Section>

        {/* Card */}
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
                  <Badge variant="secondary">
                    {t('sections.card.typescript')}
                  </Badge>
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

        {/* Dialog */}
        <Section title={t('sections.dialog.title')}>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>{t('sections.dialog.trigger')}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('sections.dialog.dialogTitle')}</DialogTitle>
                <DialogDescription>
                  {t('sections.dialog.description')}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-[var(--sea-ink-soft)]">
                  {t('sections.dialog.body')}
                </p>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">
                    {t('sections.dialog.cancel')}
                  </Button>
                </DialogClose>
                <Button onClick={() => setDialogOpen(false)}>
                  {t('sections.dialog.confirm')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        {/* Image Modal */}
        <Section title={t('sections.imageModal.title')}>
          <div className="flex flex-wrap gap-8">
            <div className="max-w-[200px]">
              <ImageModal
                src="/placeholder-man.jpg"
                alt={t('sections.imageModal.placeholderAlt')}
                className="rounded-md"
              />
            </div>
            <div className="max-w-[200px]">
              <ImageModal
                variant="compare"
                before={{
                  src: '/placeholder-man.jpg',
                  alt: t('sections.imageModal.beforeAlt'),
                }}
                after={{
                  src: '/temp-header.jpg',
                  alt: t('sections.imageModal.afterAlt'),
                }}
                className="rounded-md"
              />
            </div>
          </div>
        </Section>

        {/* Image Comparison */}
        <Section title={t('sections.imageComparison.title')}>
          <div className="max-w-md">
            <ImageComparison
              before={{
                src: '/placeholder-man.jpg',
                alt: t('sections.imageComparison.beforeAlt'),
              }}
              after={{
                src: '/temp-header.jpg',
                alt: t('sections.imageComparison.afterAlt'),
              }}
              className="aspect-square rounded-md"
            />
          </div>
        </Section>

        {/* Typewriter */}
        <Section title={t('sections.typewriter.title')}>
          <Typewriter text={t('sections.typewriter.text')} />
        </Section>

        {/* Contact Form */}
        <Section title={t('sections.contactForm.title')}>
          <ContactForm className="max-w-lg" onSubmit={() => {}} />
        </Section>

        {/* Tooltip */}
        <Section title={t('sections.tooltip.title')}>
          <div className="flex flex-wrap gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  {t('sections.tooltip.hoverMe')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {t('sections.tooltip.hoverContent')}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">
                  {t('sections.tooltip.withDelay')}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {t('sections.tooltip.delayContent')}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="cursor-default">
                  {t('sections.tooltip.badgeTooltip')}
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="right">
                {t('sections.tooltip.badgeContent')}
              </TooltipContent>
            </Tooltip>
          </div>
        </Section>

        {/* Separator */}
        <Section title={t('sections.separator.title')}>
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm text-[var(--sea-ink-soft)]">
                {t('sections.separator.horizontalLabel')}
              </p>
              <Separator />
            </div>
            <div className="flex h-8 items-center gap-4">
              <span className="text-sm">{t('sections.separator.itemA')}</span>
              <Separator orientation="vertical" />
              <span className="text-sm">{t('sections.separator.itemB')}</span>
              <Separator orientation="vertical" />
              <span className="text-sm">{t('sections.separator.itemC')}</span>
            </div>
          </div>
        </Section>

        {/* Skeleton */}
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

        {/* Aspect Ratio */}
        <Section title={t('sections.aspectRatio.title')}>
          <div className="w-full max-w-md">
            <AspectRatio ratio={16 / 9}>
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-[var(--lagoon)]/10 text-[var(--lagoon-deep)]">
                {t('sections.aspectRatio.label')}
              </div>
            </AspectRatio>
          </div>
        </Section>

        {/* Scroll Area */}
        <Section title={t('sections.scrollArea.title')}>
          <ScrollArea className="h-48 w-full rounded-lg border border-[var(--line)]">
            <div className="p-4">
              {Array.from({ length: 20 }, (_, i) => (
                <p
                  key={i}
                  className="border-b border-[var(--line)] py-2 text-sm text-[var(--sea-ink-soft)] last:border-0"
                >
                  {t('sections.scrollArea.itemPrefix')} {i + 1}
                </p>
              ))}
            </div>
          </ScrollArea>
        </Section>

        {/* Cassette Carousel */}
        <Section title={t('sections.cassetteCarousel.title')}>
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm text-[var(--sea-ink-soft)]">
                {t('sections.cassetteCarousel.horizontalLabel')}
              </p>
              <CassetteCarousel
                slides={[
                  {
                    id: '1',
                    label: t('sections.cassetteCarousel.sideALabel'),
                    sublabel: t('sections.cassetteCarousel.sideASublabel'),
                    modalContent: (
                      <p>{t('sections.cassetteCarousel.sideAContent')}</p>
                    ),
                  },
                  {
                    id: '2',
                    label: t('sections.cassetteCarousel.sideBLabel'),
                    sublabel: t('sections.cassetteCarousel.sideBSublabel'),
                    modalContent: (
                      <p>{t('sections.cassetteCarousel.sideBContent')}</p>
                    ),
                  },
                  {
                    id: '3',
                    label: t('sections.cassetteCarousel.demoLabel'),
                    sublabel: t('sections.cassetteCarousel.demoSublabel'),
                    modalContent: (
                      <p>{t('sections.cassetteCarousel.demoContent')}</p>
                    ),
                  },
                  {
                    id: '4',
                    label: t('sections.cassetteCarousel.loFiLabel'),
                    sublabel: t('sections.cassetteCarousel.loFiSublabel'),
                    modalContent: (
                      <p>{t('sections.cassetteCarousel.loFiContent')}</p>
                    ),
                  },
                ]}
              />
            </div>
            <div>
              <p className="mb-2 text-sm text-[var(--sea-ink-soft)]">
                {t('sections.cassetteCarousel.verticalLabel')}
              </p>
              <CassetteCarousel
                orientation="vertical"
                className="h-64"
                slides={[
                  {
                    id: '1',
                    label: t('sections.cassetteCarousel.track1Label'),
                    sublabel: t('sections.cassetteCarousel.track1Sublabel'),
                  },
                  {
                    id: '2',
                    label: t('sections.cassetteCarousel.track2Label'),
                    sublabel: t('sections.cassetteCarousel.track2Sublabel'),
                  },
                  {
                    id: '3',
                    label: t('sections.cassetteCarousel.track3Label'),
                    sublabel: t('sections.cassetteCarousel.track3Sublabel'),
                  },
                ]}
              />
            </div>
          </div>
        </Section>

        {/* Playlist */}
        <Section title={t('sections.playlist.title')}>
          <Playlist
            videos={[
              {
                id: 'vteCosE9qnM',
                title: t('sections.playlist.track1Title'),
              },
            ]}
          />
        </Section>

        {/* Social Bar */}
        <Section title={t('sections.socialBar.title')}>
          <SocialBar className="rounded-lg bg-black p-4" />
        </Section>
      </div>
    );
  },
);
UIKitContent.displayName = 'UIKitContent';

export { UIKitContent };
