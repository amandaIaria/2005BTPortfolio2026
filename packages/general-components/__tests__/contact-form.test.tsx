import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { describe, expect, it, afterEach, beforeEach, vi } from 'vitest';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from '@json/data';

import { ContactForm } from '../src/components/contact-form';

i18n.use(initReactI18next).init({
  resources: { en: resources.en },
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

describe('ContactForm', () => {
  afterEach(cleanup);

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('shows validation errors when required fields are empty on submit', async () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getAllByText(/is required/i).length).toBeGreaterThan(0);
    });
  });

  it('posts the expected payload and shows success copy on a successful submit', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    vi.stubGlobal('fetch', fetchMock);

    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText('Your Name'), {
      target: { value: 'Ada Lovelace' },
    });
    fireEvent.change(screen.getByLabelText('Your Email'), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Your Message'), {
      target: { value: 'Hello there' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/.netlify/functions/contact',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            name: 'Ada Lovelace',
            email: 'ada@example.com',
            message: 'Hello there',
          }),
        }),
      );
    });
    expect(await screen.findByText(/thanks for reaching out/i)).not.toBeNull();
  });

  it('shows error copy when the request fails', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 500 });
    vi.stubGlobal('fetch', fetchMock);

    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText('Your Name'), {
      target: { value: 'Ada Lovelace' },
    });
    fireEvent.change(screen.getByLabelText('Your Email'), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Your Message'), {
      target: { value: 'Hello there' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/something went wrong/i)).not.toBeNull();
  });
});
