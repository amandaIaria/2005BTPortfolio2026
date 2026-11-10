import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, beforeEach, vi } from 'vitest';

import { Modal } from '../src/components/ui/modal';

function clearCookies() {
  document.cookie.split('; ').forEach((cookie) => {
    const name = cookie.split('=')[0];
    document.cookie = `${name}=; path=/; max-age=0`;
  });
}

describe('Modal', () => {
  beforeEach(() => {
    clearCookies();
  });

  it('renders title and description when open', () => {
    render(
      <Modal
        id="test-info"
        title="Heads up"
        description="Something you should know."
        open
        onOpenChange={() => {}}
      />,
    );
    expect(screen.queryByText('Heads up')).not.toBeNull();
    expect(screen.queryByText('Something you should know.')).not.toBeNull();
  });

  it('info type never writes a cookie on OK', () => {
    const onOpenChange = vi.fn();
    render(
      <Modal
        id="test-info-ok"
        title="Info"
        description="Info body"
        type="info"
        open
        onOpenChange={onOpenChange}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(document.cookie).not.toContain('modal-dismissed-test-info-ok');
  });

  it('confirmation type sets cookie on OK and closes', () => {
    const onOpenChange = vi.fn();
    render(
      <Modal
        id="test-confirm"
        title="Confirm"
        description="Confirm body"
        type="confirmation"
        open
        onOpenChange={onOpenChange}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(document.cookie).toContain('modal-dismissed-test-confirm=1');
  });

  it('does not render and calls onOpenChange(false) when the cookie is already set', () => {
    document.cookie = 'modal-dismissed-test-remembered=1; path=/';
    const onOpenChange = vi.fn();
    render(
      <Modal
        id="test-remembered"
        title="Remembered"
        description="Should not show"
        type="confirmation"
        open
        onOpenChange={onOpenChange}
      />,
    );
    expect(screen.queryByText('Remembered')).toBeNull();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
