import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, expect, it, afterEach } from 'vitest';

import { ImageModal } from '../src/components/image-modal';

describe('ImageModal', () => {
  afterEach(cleanup);

  it('renders a thumbnail trigger and no full image until clicked', () => {
    render(<ImageModal src="/full.jpg" alt="A mountain view" />);
    expect(
      screen.getByRole('button', { name: 'View full image: A mountain view' }),
    ).not.toBeNull();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('opens the full image on click', () => {
    render(<ImageModal src="/full.jpg" alt="A mountain view" />);
    fireEvent.click(
      screen.getByRole('button', { name: 'View full image: A mountain view' }),
    );
    const dialog = screen.getByRole('dialog');
    const fullImage = screen.getByAltText('A mountain view');
    expect(dialog).not.toBeNull();
    expect(fullImage.getAttribute('src')).toBe('/full.jpg');
  });

  it('closes when the close button is clicked', () => {
    render(<ImageModal src="/full.jpg" alt="A mountain view" />);
    fireEvent.click(
      screen.getByRole('button', { name: 'View full image: A mountain view' }),
    );
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('uses thumbnailSrc for the trigger image when provided', () => {
    render(
      <ImageModal
        src="/full.jpg"
        thumbnailSrc="/thumb.jpg"
        alt="A mountain view"
      />,
    );
    const trigger = screen.getByRole('button', {
      name: 'View full image: A mountain view',
    });
    const thumb = trigger.querySelector('img');
    expect(thumb?.getAttribute('src')).toBe('/thumb.jpg');
  });
});
