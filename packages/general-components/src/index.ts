// UI Components
export { AspectRatio } from './components/ui/aspect-ratio';
export { Badge, badgeVariants } from './components/ui/badge';
export { Button, buttonVariants } from './components/ui/button';
export {
  PortfolioButton,
  portfolioButtonVariants,
} from './components/portfolio-button';
export type { PortfolioButtonProps } from './components/portfolio-button';
export { Container } from './components/ui/container';
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
export type {
  CassetteSlide,
  CassetteCarouselProps,
} from './components/cassette-carousel';
export { Playlist } from './components/playlist';
export type { PlaylistVideo, PlaylistProps } from './components/playlist';
export { AnimatedFooter } from './components/animated-footer';
export type { AnimatedFooterProps } from './components/animated-footer';
export { TentacleFooter } from './components/tentacle-footer';
export type { TentacleFooterProps } from './components/tentacle-footer';
export { WebGLTentacleFooter } from './components/webgl-tentacle-footer';
export type { WebGLTentacleFooterProps } from './components/webgl-tentacle-footer';
export { WebGLTentacleWall } from './components/webgl-tentacle-wall';
export type { WebGLTentacleWallProps } from './components/webgl-tentacle-wall';
export { ExperienceList } from './components/experience-list';
export type {
  ExperienceListProps,
  ExperienceItem,
} from './components/experience-list';
export { CaseStudyList } from './components/case-study-list';
export type {
  CaseStudyListProps,
  CaseStudyItem,
} from './components/case-study-list';
export { CaseStudyDetail } from './components/case-study-detail';
export type {
  CaseStudyDetailProps,
  CaseStudyDetailItem,
  CaseStudyContributor,
  CaseStudyOverview,
  CaseStudySection,
} from './components/case-study-detail';
export { Hero } from './components/hero';
export type { HeroProps } from './components/hero';
export { SpriteAnimation } from './components/sprite-animation';
export type { SpriteAnimationProps } from './components/sprite-animation';
export { AppHeader } from './components/app-header';
export type {
  AppHeaderProps,
  ThemeVariant,
  ColorMode,
} from './components/app-header';
export { AnimatedTitle } from './components/animated-title';
export type { AnimatedTitleProps } from './components/animated-title';
export { GlitchEffect } from './components/glitch-effect';
export type { GlitchEffectProps } from './components/glitch-effect';
export { Slider } from './components/slider';
export type {
  SliderProps,
  SliderSlide,
  SliderSlides,
  SliderSlideImage,
  SliderSlideLink,
} from './components/slider';
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './components/ui/tooltip';
export { PageTransitionProvider } from './components/page-transition/page-transition-provider';
export { usePageTransition } from './components/page-transition/page-transition-context';
export type { StartTransitionOptions } from './components/page-transition/page-transition-context';

// 2005 theme components
export { ImageHeader } from './components/2005/image-header';
export { SidebarOld } from './components/2005/sidebar-old';

// Modern theme components
export { ArtGallery } from './components/modern/art-gallery';
export { HomeLoadingOverlay } from './components/modern/home-loading-overlay';
export type { HomeLoadingOverlayProps } from './components/modern/home-loading-overlay';
export { default as LoadIn } from './components/modern/load-in';
export { default as LoadInCard } from './components/modern/load-in-card';
export { Navigation } from './components/modern/navigation';
export { NavToggle } from './components/modern/nav-toggle';

// Pages
export { default as UiKitPage } from './pages/ui-kit-page';

// Utilities
export { cn } from './lib/utils';

// Hooks
export { useAvoidOverlap } from './hooks/use-avoid-overlap';
export type { UseAvoidOverlapOptions } from './hooks/use-avoid-overlap';
export { useSlider } from './hooks/use-slider';
export { useActiveSection } from './hooks/use-active-section';
