import type * as React from 'react';
import type { Variants, Transition, MotionValue } from 'motion/react';
import type { VariantProps } from 'class-variance-authority';
import type { portfolioButtonVariants } from './portfolio-button';

export interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

// hero.tsx
export interface HeroProps extends React.ComponentProps<'div'> {
  image: ImageProps;
  topText: string;
  bottomText: string;
  caption: React.ReactNode;
  heading: React.ReactNode;
  hiddenH1: string;
}

// playlist.tsx
export interface PlaylistVideoProps {
  id: string;
  title: string;
}

export interface PlaylistProps extends React.ComponentProps<'div'> {
  videos: PlaylistVideoProps[];
}

// glitch-effect.tsx
export interface GlitchEffectProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Screen-reader-only label announced in place of the glitched content.
   * The glitch wrapper is marked `aria-hidden` because powerglitch clones
   * its children internally (1 shake layer + slice layers) to build the
   * visual effect, so without this, assistive tech would announce the
   * content multiple times over due to that DOM cloning.
   */
  accessibleLabel?: string;
  /** 'always' runs continuously, 'hover'/'click' wait for interaction. Default 'always'. */
  playMode?: 'always' | 'hover' | 'click';
  /** Duration of one glitch loop in ms. Default 2000 for 'always'; library default (250ms) for 'hover'/'click' unless explicitly set. */
  duration?: number;
  /** Restricts the glitch to a fraction (0-1) of the loop, peaking at the midpoint. Default { start: 0.5, end: 0.7 } for 'always', { start: 0, end: 1 } for 'hover'/'click'. Pass false to glitch uniformly across the whole loop. */
  glitchTimeSpan?: { start: number; end: number } | false;
  /** Jitter animation. Pass false to disable. Omit to use the library default. */
  shake?:
    | {
        velocity?: number;
        amplitudeX?: number;
        amplitudeY?: number;
      }
    | false;
  /** Horizontal slice-clip distortion. Omit to use the library default. */
  slice?: {
    count?: number;
    velocity?: number;
    minHeight?: number;
    maxHeight?: number;
    hueRotate?: boolean;
    /** Custom CSS filter(s) applied to glitch layers. Setting this disables hueRotate. */
    cssFilters?: string;
  };
  /** Clips the glitch animation to this element's bounds. Default false. */
  hideOverflow?: boolean;
}

// portfolio-button.tsx
export interface PortfolioButtonProps
  extends
    React.ComponentProps<'button'>,
    VariantProps<typeof portfolioButtonVariants> {
  asChild?: boolean;
}

// cassette-carousel.tsx
export interface CassetteSlideProps {
  id: string;
  label: string;
  sublabel?: string;
  modalTitle?: string;
  modalContent?: React.ReactNode;
}

export interface CassetteCarouselProps extends React.ComponentProps<'div'> {
  slides: CassetteSlideProps[];
  orientation?: 'horizontal' | 'vertical';
}

// animated-footer.tsx
export interface AnimatedFooterProps extends React.ComponentProps<'footer'> {
  text?: string;
}

// webgl-tentacle-wall.tsx
export interface WebGLTentacleWallProps extends React.ComponentProps<'div'> {
  tentacleCount?: number;
  rotate?: number;
  /**
   * Overrides the rendered tentacle color — a hex code (e.g. '#ff0000') or a
   * CSS variable (e.g. 'var(--lagoon)'). When set, this replaces the default
   * light/dark black-white toggle in the shader itself. Omit to keep the
   * default behavior.
   */
  colorValue?: string;
}

// tentacle-footer.tsx
export interface TentacleFooterProps extends React.ComponentProps<'footer'> {
  text?: string;
  tentacleCount?: number;
}

// app-header.tsx + modern/theme-toggle.tsx (shared shape)
export type ThemeVariantProps = '2005' | 'modern';
export type ColorModeProps = 'light' | 'dark';

export interface AppHeaderProps extends React.ComponentProps<'header'> {
  themeVariant?: ThemeVariantProps;
  onThemeVariantChange?: (variant: ThemeVariantProps) => void;
  colorMode?: ColorModeProps;
  onColorModeChange?: (mode: ColorModeProps) => void;
  /** Called when the theme variant changes — use to navigate between routes */
  navigate?: (path: string) => void;
}

// sprite-animation.tsx
export interface SpriteAnimationProps extends React.ComponentProps<'div'> {
  /** Path to the sprite sheet image */
  src: string;
  /** Number of columns in the sprite sheet */
  columns: number;
  /** Number of rows in the sprite sheet */
  rows: number;
  /** Total number of frames (defaults to columns * rows) */
  frameCount?: number;
  /** Width of each frame in pixels */
  frameWidth: number;
  /** Height of each frame in pixels */
  frameHeight: number;
  /** Duration of one full animation cycle in milliseconds */
  duration?: number;
  /** Whether the animation is playing */
  playing?: boolean;
  /** Scale factor for display size (default: 1) */
  scale?: number;
}

// modal.tsx
export interface ModalProps {
  id: string;
  title: string;
  description: string;
  type?: 'confirmation' | 'info';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// webgl-tentacle-footer.tsx
export interface WebGLTentacleFooterProps extends React.ComponentProps<'footer'> {
  text?: string;
  tentacleCount?: number;
}

// animated-title.tsx
export interface AnimatedTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// experience-list.tsx
export interface ExperienceItemProps {
  title: string;
  company: string;
  years: string;
  type: string;
  tags: string[];
  summary: string;
}

export interface ExperienceListProps extends React.ComponentProps<'div'> {
  experiences: ExperienceItemProps[];
}

// slider/types.ts
export interface SliderSlideLinkProps {
  url: string;
  copy?: string;
}

export interface SliderSlideProps {
  left: { image: ImageProps };
  right: {
    title: string;
    description: string;
    list: string[];
    link: SliderSlideLinkProps;
    company: string;
    tags: string[];
  };
}

export type SliderSlidesProps = SliderSlideProps[];

export interface SliderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  slides: SliderSlidesProps;
  initialIndex?: number;
  loop?: boolean;
  ariaLabel?: string;
  onSlideChange?: (index: number) => void;
}

// slider/slide-pane.tsx
export interface SlidePaneProps {
  slide: SliderSlideProps;
  isTransitioning?: boolean;
  direction: 1 | -1;
  variants: Variants;
  transition: Transition;
}

// slider/slide-content.tsx
export interface SlideContentProps {
  slide: SliderSlideProps;
}

// slider/slider-tags.tsx
export interface SlideTagsProps {
  tags: string[];
}

// slider/slider-pagination.tsx
export interface SliderPaginationProps {
  total: number;
  current: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
  isFirst: boolean;
  isLast: boolean;
  loop: boolean;
  dotsTrackRef: React.RefObject<HTMLDivElement | null>;
  dotsInnerRef: React.RefObject<HTMLDivElement | null>;
}

// slider/codepen-slider.tsx — dead/unused prototype, kept distinctly named to
// avoid colliding with the real SliderSlideProps/SliderProps shapes above.
export interface CodepenSliderSlideLinkProps {
  url: string;
  copy?: string;
}

export interface CodepenSliderSlideProps {
  left: { image: ImageProps };
  right: {
    title: string;
    description: string;
    list: string[];
    link: CodepenSliderSlideLinkProps;
  };
}

export interface CodepenSliderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  slides: CodepenSliderSlideProps[];
  initialIndex?: number;
  loop?: boolean;
  ariaLabel?: string;
  onSlideChange?: (index: number) => void;
}

export type CodepenSliderDirectionProps = 1 | -1;

export interface CodepenUseSliderOptionsProps {
  count: number;
  initialIndex?: number;
  loop?: boolean;
  onChange?: (index: number) => void;
}

export interface CodepenUseSliderResultProps {
  index: number;
  direction: CodepenSliderDirectionProps;
  isTransitioning: boolean;
  next: () => void;
  prev: () => void;
  goTo: (targetIndex: number) => void;
  onTransitionSettled: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export interface CodepenSliderStateProps {
  index: number;
  direction: CodepenSliderDirectionProps;
  isTransitioning: boolean;
}

export type CodepenSliderActionProps =
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'GOTO'; target: number }
  | { type: 'SETTLE' };

// page-transition/use-transition-link-click.ts
export interface UseTransitionLinkClickOptionsProps {
  href: string;
  external?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

// page-transition/external-transition-link.tsx
export interface ExternalTransitionLinkProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'target'
> {
  href: string;
  children?: React.ReactNode;
}

// page-transition/internal-transition-link.tsx
export interface InternalTransitionLinkProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> {
  href: string;
  children?: React.ReactNode;
}

// page-transition/page-transition-overlay.tsx
export interface PageTransitionOverlayProps {
  top: MotionValue<number>;
  left: MotionValue<number>;
  width: MotionValue<number>;
  height: MotionValue<number>;
  opacity: MotionValue<number>;
  backgroundColor: string;
  active: boolean;
  className?: string;
}

// page-transition/page-transition-provider.tsx
export interface PageTransitionProviderProps {
  children: React.ReactNode;
}

// page-transition/page-transition-context.ts
export interface StartTransitionOptionsProps {
  rect: DOMRect;
  href: string;
  backgroundColor: string;
  external?: boolean;
}

export interface PageTransitionContextValueProps {
  startTransition: (options: StartTransitionOptionsProps) => void;
  isTransitioning: boolean;
}

// modern/shrine-listing.tsx
// shrines.json `listing` entries — summary shown in the shrine grid
export interface ShrineListItemProps {
  slug: string;
  title: string;
  description?: string;
  image: ImageProps;
}

// shrines.json `shrine-pages` content blocks
export interface ShrineContentBlockProps {
  id: string;
  title: string;
  copy: string;
  image?: ImageProps;
}

// shrines.json `shrine-pages` entries — full detail page data
export interface ShrineItemProps {
  id: string;
  title: string;
  description?: string;
  image: ImageProps;
  gallery?: ImageProps[];
  content?: ShrineContentBlockProps[];
}

export interface ShrineListingProps {
  kicker?: string;
  heading: string;
  intro?: string;
}

// modern/shrine-detail.tsx
export interface ShrineDetailProps extends React.ComponentProps<'div'> {
  shrine: ShrineItemProps;
}

// modern/art-gallery.tsx
export interface ArtItemProps {
  title: string;
  image: ImageProps & { height: number; width: number };
}

// modern/menu-toggle-icon.tsx
export interface MenuToggleIconProps {
  isOpen: boolean;
  shouldReduceMotion: boolean | null;
}

// modern/case-study-list.tsx
export interface CaseStudyItemProps {
  slug: string;
  title: string;
  description: string;
  image: ImageProps;
  link: {
    copy: string;
  };
}

export interface CaseStudyListProps extends React.ComponentProps<'div'> {
  caseStudies: CaseStudyItemProps[];
}

// modern/home-loading-overlay.tsx
export interface HomeLoadingOverlayProps {
  onDone: () => void;
}

// modern/case-study-detail.tsx
export interface CaseStudyContributorProps {
  name: string;
  role: string;
  avatar: ImageProps;
}

export interface CaseStudyOverviewProps {
  label: string;
  description: string;
  sector: string;
  teamSize: string;
  location: string;
}

export interface CaseStudySectionProps {
  id: string;
  title: string;
  copy: string;
  className?: string;
  image?: ImageProps;
}

export interface CaseStudyDetailItemProps {
  slug: string;
  title: string;
  description: string;
  image: ImageProps;
  contributor: CaseStudyContributorProps;
  overview: CaseStudyOverviewProps;
  problem: string;
  approach: string;
  outcomes: string[];
  content: CaseStudySectionProps[];
}

export interface CaseStudyDetailProps extends React.ComponentProps<'div'> {
  caseStudy: CaseStudyDetailItemProps;
}

// modern/sticky-side-nav.tsx — accepts anything with a content-block list
// (CaseStudyDetailItemProps and ShrineItemProps both qualify)
export interface StickySideNavProps {
  content: { content?: Array<{ id: string; title: string }> };
  navLabel: string;
}

// modern/load-in-card.tsx
export interface LoadInCardProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
}

export interface RevealingTentacleProps {
  maskId: string;
  hovered: boolean;
  className?: string;
}

// modern/navigation.tsx
export interface NavigationProps {
  isOpen: boolean;
  onNavigate?: () => void;
}

export interface NavLinkProps {
  href: string;
  label: string;
}

export interface NavItemProps {
  link: NavLinkProps;
  onNavigate?: () => void;
}

// 2005/image-header.tsx
export interface ImageHeaderProps extends React.ComponentProps<'div'> {
  pageName: string;
  siteName?: string;
  src: string;
  alt: string;
}

// modern/breadcrumb.tsx
export interface BreadcrumbProps extends React.ComponentProps<'div'> {
  href: string;
  label: string;
}
