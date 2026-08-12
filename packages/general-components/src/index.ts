// UI Components
export { AspectRatio } from './components/ui/aspect-ratio';
export { Badge, badgeVariants } from './components/ui/badge';
export { Button, buttonVariants } from './components/ui/button';
export {
  PortfolioButton,
  portfolioButtonVariants,
} from './components/portfolio-button';
export { Container } from './components/ui/container';
export { Modal } from './components/modal';
export { Switch } from './components/ui/switch';
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from './components/ui/card';
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog';
export { DirectionProvider, useDirection } from './components/ui/direction';
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from './components/ui/navigation-menu';
export { ScrollArea, ScrollBar } from './components/ui/scroll-area';
export { Separator } from './components/ui/separator';
export { Skeleton } from './components/ui/skeleton';
export { TempNav } from './components/temp-nav';
export { CassetteCarousel } from './components/cassette-carousel';
export { Playlist } from './components/playlist';
export { AnimatedFooter } from './components/animated-footer';
export { TentacleFooter } from './components/tentacle-footer';
export { WebGLTentacleFooter } from './components/webgl-tentacle-footer';
export { WebGLTentacleWall } from './components/webgl-tentacle-wall';
export { ExperienceList } from './components/experience-list';
export { CaseStudyList } from './components/modern/case-study-list';
export { CaseStudyDetail } from './components/modern/case-study-detail';
export { Hero } from './components/hero';
export { SpriteAnimation } from './components/sprite-animation';
export { AppHeader } from './components/app-header';
export { AnimatedTitle } from './components/animated-title';
export { GlitchEffect } from './components/glitch-effect';
export { Slider } from './components/slider';
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './components/ui/tooltip';
export { PageTransitionProvider } from './components/page-transition/page-transition-provider';
export { usePageTransition } from './components/page-transition/page-transition-context';
export { ExternalTransitionLink } from './components/page-transition/external-transition-link';
export { InternalTransitionLink } from './components/page-transition/internal-transition-link';

// 2005 theme components
export { ImageHeader } from './components/2005/image-header';
export { SidebarOld } from './components/2005/sidebar-old';

// Modern theme components
export { ArtGallery } from './components/modern/art-gallery';
export { ShrineListing } from './components/modern/shrine-listing';
export { ShrineDetail } from './components/modern/shrine-detail';
export { HomeLoadingOverlay } from './components/modern/home-loading-overlay';
export { default as LoadIn } from './components/modern/load-in';
export { default as LoadInCard } from './components/modern/load-in-card';
export { Navigation } from './components/modern/navigation';
export { NavToggle } from './components/modern/nav-toggle';
export { ThemeToggle } from './components/modern/theme-toggle';
export { Breadcrumb } from './components/modern/breadcrumb';
export { Footer } from './components/modern/footer';
export { SocialBar } from './components/modern/social-bar';

// Pages
export { default as UiKitPage } from './pages/ui-kit-page';

// Utilities
export { cn } from './lib/utils';

// Hooks
export { useAvoidOverlap } from './hooks/use-avoid-overlap';
export type { UseAvoidOverlapOptions } from './hooks/use-avoid-overlap';
export { useSlider } from './hooks/use-slider';
export { useActiveSection } from './hooks/use-active-section';

// Prop and data types
export type {
  ImageProps,
  HeroProps,
  PlaylistVideoProps,
  PlaylistProps,
  GlitchEffectProps,
  PortfolioButtonProps,
  CassetteSlideProps,
  CassetteCarouselProps,
  AnimatedFooterProps,
  WebGLTentacleWallProps,
  TentacleFooterProps,
  ThemeVariantProps,
  ColorModeProps,
  AppHeaderProps,
  SpriteAnimationProps,
  ModalProps,
  WebGLTentacleFooterProps,
  AnimatedTitleProps,
  ExperienceItemProps,
  ExperienceListProps,
  SliderSlideLinkProps,
  SliderSlideProps,
  SliderSlidesProps,
  SliderProps,
  SlidePaneProps,
  SlideContentProps,
  SlideTagsProps,
  SliderPaginationProps,
  UseTransitionLinkClickOptionsProps,
  ExternalTransitionLinkProps,
  InternalTransitionLinkProps,
  PageTransitionOverlayProps,
  PageTransitionProviderProps,
  StartTransitionOptionsProps,
  PageTransitionContextValueProps,
  ShrineListItemProps,
  ShrineContentBlockProps,
  ShrineItemProps,
  ShrineListingProps,
  ShrineDetailProps,
  ArtItemProps,
  MenuToggleIconProps,
  CaseStudyItemProps,
  CaseStudyListProps,
  HomeLoadingOverlayProps,
  CaseStudyContributorProps,
  CaseStudyOverviewProps,
  CaseStudySectionProps,
  CaseStudyDetailItemProps,
  CaseStudyDetailProps,
  StickySideNavProps,
  LoadInCardProps,
  RevealingTentacleProps,
  NavigationProps,
  NavLinkProps,
  NavItemProps,
  ImageHeaderProps,
  BreadcrumbProps,
  FooterProps,
  SocialBarProps,
} from '@packages/general-components/src/components/types.ts';
