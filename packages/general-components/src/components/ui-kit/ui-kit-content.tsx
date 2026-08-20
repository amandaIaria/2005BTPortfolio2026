import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { SwitchSection } from './sections/switch-section';
import { PortfolioSwitchSection } from './sections/portfolio-switch-section';
import { AppHeaderSection } from './sections/app-header-section';
import { ButtonSection } from './sections/button-section';
import { AnimatedTitleSection } from './sections/animated-title-section';
import { BadgeSection } from './sections/badge-section';
import { AlertSection } from './sections/alert-section';
import { PortfolioAlertSection } from './sections/portfolio-alert-section';
import { CardSection } from './sections/card-section';
import { DialogSection } from './sections/dialog-section';
import { ImageModalSection } from './sections/image-modal-section';
import { ImageComparisonSection } from './sections/image-comparison-section';
import { TypewriterSection } from './sections/typewriter-section';
import { ContactFormSection } from './sections/contact-form-section';
import { TooltipSection } from './sections/tooltip-section';
import { SeparatorSection } from './sections/separator-section';
import { SkeletonSection } from './sections/skeleton-section';
import { AspectRatioSection } from './sections/aspect-ratio-section';
import { ScrollAreaSection } from './sections/scroll-area-section';
import { CassetteCarouselSection } from './sections/cassette-carousel-section';
import { PlaylistSection } from './sections/playlist-section';
import { SocialBarSection } from './sections/social-bar-section';
import { PortfolioButtonSection } from './sections/portfolio-button-section';


export interface UIKitContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const UIKitContent = forwardRef<HTMLDivElement, UIKitContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-component="ui-kit-content"
      className={cn('flex flex-col gap-10', className)}
      {...props}
    >
      <SwitchSection />
      <PortfolioSwitchSection />
      <AppHeaderSection />
      <ButtonSection />
      <PortfolioButtonSection />
      <AnimatedTitleSection />
      <BadgeSection />
      <AlertSection />
      <PortfolioAlertSection />
      <CardSection />
      <DialogSection />
      <ImageModalSection />
      <ImageComparisonSection />
      <TypewriterSection />
      <ContactFormSection />
      <TooltipSection />
      <SeparatorSection />
      <SkeletonSection />
      <AspectRatioSection />
      <ScrollAreaSection />
      <CassetteCarouselSection />
      <PlaylistSection />
      <SocialBarSection />
    </div>
  ),
);
UIKitContent.displayName = 'UIKitContent';

export { UIKitContent };
