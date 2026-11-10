import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, expect, it, afterEach } from 'vitest';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from '@json/data';

import { ImageComparison } from '../src/components/image-comparison';

i18n.use(initReactI18next).init({
  resources: { en: resources.en },
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

describe('ImageComparison', () => {
  afterEach(cleanup);

  it('renders both before and after images', () => {
    render(
      <ImageComparison
        before={{ src: '/before.jpg', alt: 'Before shot' }}
        after={{ src: '/after.jpg', alt: 'After shot' }}
      />,
    );
    expect(screen.getByAltText('Before shot').getAttribute('src')).toBe(
      '/before.jpg',
    );
    expect(screen.getByAltText('After shot').getAttribute('src')).toBe(
      '/after.jpg',
    );
  });

  it('has a slider with correct aria attributes', () => {
    render(
      <ImageComparison
        before={{ src: '/before.jpg', alt: 'Before shot' }}
        after={{ src: '/after.jpg', alt: 'After shot' }}
      />,
    );
    const slider = screen.getByRole('slider');
    expect(slider.getAttribute('aria-valuenow')).toBe('50');
    expect(slider.getAttribute('aria-valuemin')).toBe('0');
    expect(slider.getAttribute('aria-valuemax')).toBe('100');
  });

  it('increases aria-valuenow on ArrowRight', () => {
    render(
      <ImageComparison
        before={{ src: '/before.jpg', alt: 'Before shot' }}
        after={{ src: '/after.jpg', alt: 'After shot' }}
      />,
    );
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(slider.getAttribute('aria-valuenow')).toBe('51');
  });

  it('decreases aria-valuenow on ArrowLeft', () => {
    render(
      <ImageComparison
        before={{ src: '/before.jpg', alt: 'Before shot' }}
        after={{ src: '/after.jpg', alt: 'After shot' }}
      />,
    );
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    expect(slider.getAttribute('aria-valuenow')).toBe('49');
  });

  it('sets aria-valuenow to 0 on Home and 100 on End', () => {
    render(
      <ImageComparison
        before={{ src: '/before.jpg', alt: 'Before shot' }}
        after={{ src: '/after.jpg', alt: 'After shot' }}
      />,
    );
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'Home' });
    expect(slider.getAttribute('aria-valuenow')).toBe('0');
    fireEvent.keyDown(slider, { key: 'End' });
    expect(slider.getAttribute('aria-valuenow')).toBe('100');
  });
});
