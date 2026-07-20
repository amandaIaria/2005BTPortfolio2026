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

// Pages
export { default as UiKitPage } from './pages/ui-kit-page';

// Utilities
export { cn } from './lib/utils';

// Hooks
export { useAvoidOverlap } from './hooks/use-avoid-overlap';
export type { UseAvoidOverlapOptions } from './hooks/use-avoid-overlap';
export { useSlider } from './hooks/use-slider';
