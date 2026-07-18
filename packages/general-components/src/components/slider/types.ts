export interface SliderSlideImage {
  src: string;
  alt: string;
}

export interface SliderSlideLink {
  url: string;
  copy?: string;
}

export interface SliderSlide {
  left: { image: SliderSlideImage };
  right: {
    title: string;
    description: string;
    list: string[];
    link: SliderSlideLink;
  };
}

export type SliderSlides = SliderSlide[];

export interface SliderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  slides: SliderSlides;
  initialIndex?: number;
  loop?: boolean;
  ariaLabel?: string;
  onSlideChange?: (index: number) => void;
}
