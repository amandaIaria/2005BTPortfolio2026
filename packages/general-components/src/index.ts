// UI Components
export { AspectRatio } from './components/ui/aspect-ratio';
export {
  Alert,
  AlertTitle,
  AlertDescription,
  alertVariants,
} from './components/ui/alert';
export { Badge, badgeVariants } from './components/ui/badge';
export { Button, buttonVariants } from './components/ui/button';
export {
  PortfolioButton,
  portfolioButtonVariants,
} from './components/atoms/portfolio-button';
export { Container } from './components/ui/container';
export { Input } from './components/ui/input';
export { Label } from './components/ui/label';
export { Textarea } from './components/ui/textarea';
export { Modal } from './components/atoms/modal';
export { FormInput } from './components/atoms/form-input';
export { ImageModal } from './components/image-modal';
export { ImageComparison } from './components/image-comparison';
export { Typewriter } from './components/modern/typewriter';
export { ContactForm } from './components/contact-form';
export { Switch } from './components/ui/switch';
export { PortfolioSwitch } from './components/atoms/portfolio-switch';
export {
  PortfolioAlert,
  PortfolioAlertTitle,
  PortfolioAlertDescription,
} from './components/atoms/portfolio-alert';
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
export {
  UIKitSticky,
  type UIKitStickyProps,
} from './components/ui-kit/ui-kit-sticky';
export { CassetteCarousel } from './components/2005/cassette-carousel';
export { Playlist } from './components/2005/playlist';
export { AnimatedFooter } from './components/2005/animated-footer';
export { TentacleFooter } from './components/2005/tentacle-footer';
export { WebGLTentacleWall } from './components/webgl-tentacle-wall';
export { ExperienceList } from './components/modern/experience-list';
export { CaseStudyList } from './components/modern/case-study-list';
export { CaseStudyDetail } from './components/modern/case-study-detail';
export { Hero } from './components/atoms/hero';
export { SpriteAnimation } from './components/2005/sprite-animation';
export { AppHeader } from './components/app-header';
export { AnimatedTitle } from './components/2005/animated-title';
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
export { default as LegacyStylesPage } from './pages/legacy-styles-page';

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
  PortfolioSwitchProps,
  PortfolioAlertProps,
  PortfolioAlertVariant,
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
  ImageModalProps,
  ImageModalDefaultProps,
  ImageComparisonProps,
  TypewriterProps,
  ContactFormProps,
  SubmitStatus,
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
  ModernAboutPageProps,
} from '@packages/general-components/src/components/types.ts';
