import en from './en/common.json';
import uiKit from './en/ui-kit-copy.json';

export const resources = {
  en: {
    common: en,
    uiKit,
  },
} as const;

export type DefaultNamespace = 'common';

export { sliderSamples, sliderFeatured } from './slider-samples';
