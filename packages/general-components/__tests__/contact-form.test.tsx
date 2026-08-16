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

function fillForm() {
  fireEvent.change(screen.getByLabelText('Your Name'), {
    target: { value: 'Ada Lovelace' },
  });
  fireEvent.change(screen.getByLabelText('Your Email'), {
    target: { value: 'ada@example.com' },
  });
  fireEvent.change(screen.getByLabelText('Your Message'), {
    target: { value: 'Hello there' },
  });
}

describe('ContactForm', () => {
  afterEach(cleanup);

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the honeypot field hidden and out of tab order', () => {
    render(<ContactForm onSubmit={vi.fn()} />);
    const honeypot = document.querySelector<HTMLInputElement>(
      'input[name="company"]',
    );
    expect(honeypot).not.toBeNull();
    expect(honeypot?.closest('[aria-hidden="true"]')).not.toBeNull();
    expect(honeypot?.tabIndex).toBe(-1);
  });

  it('shows validation errors when required fields are empty on submit', async () => {
    render(<ContactForm onSubmit={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getAllByText(/is required/i).length).toBeGreaterThan(0);
    });
  });

  it('posts the expected payload and calls onSubmit("success") on a successful submit', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    vi.stubGlobal('fetch', fetchMock);
    const onSubmit = vi.fn();

    render(<ContactForm onSubmit={onSubmit} />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/.netlify/functions/contact',
        expect.objectContaining({ method: 'POST' }),
      );
      const [, options] = fetchMock.mock.calls[0];
      const body = JSON.parse(options.body as string);
      expect(body).toMatchObject({
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        message: 'Hello there',
        company: '',
      });
      expect(typeof body.formLoadedAt).toBe('number');
      expect(onSubmit).toHaveBeenCalledWith('success');
    });
  });

  it('calls onSubmit("error") when the request fails', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 500 });
    vi.stubGlobal('fetch', fetchMock);
    const onSubmit = vi.fn();

    render(<ContactForm onSubmit={onSubmit} />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith('error');
    });
  });

  it('disables the submit button and shows a spinner while the request is in flight', async () => {
    let resolveFetch: (value: unknown) => void = () => {};
    const fetchMock = vi.fn(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        }),
    );
    vi.stubGlobal('fetch', fetchMock);

    render(<ContactForm onSubmit={vi.fn()} />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(
        screen
          .getByRole('button', { name: /sending/i })
          .hasAttribute('disabled'),
      ).toBe(true);
    });

    resolveFetch({ ok: true, json: async () => ({ ok: true }) });
  });
});
