import en from './en/common.json';

export const resources = {
  en: {
    common: en,
  },
} as const;

export type DefaultNamespace = 'common';
