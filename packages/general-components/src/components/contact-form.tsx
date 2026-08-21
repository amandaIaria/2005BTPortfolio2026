import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from '@tanstack/react-form';
import { CircleNotchIcon } from '@phosphor-icons/react';

import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { FormInput } from './atoms/form-input';
import { PortfolioButton } from './atoms/portfolio-button';
import type { ContactFormProps } from '@packages/general-components/src/components/types.ts';
import { PortfolioFormInput } from './atoms/portfolio-form-input';

const CONTACT_ENDPOINT = '/.netlify/functions/contact';

function required(label: string) {
  return (value: string) => (value.trim() ? undefined : `${label} is required`);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function ContactForm({ className, onSubmit }: ContactFormProps) {
  const { t } = useTranslation();
  const [isPending, setIsPending] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const formLoadedAt = useRef(Date.now());

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    onSubmit: async ({ value, formApi }) => {
      setIsPending(true);
      try {
        const response = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...value,
            company: honeypot,
            formLoadedAt: formLoadedAt.current,
          }),
        });
        if (!response.ok) {
          throw new Error('Request failed');
        }
        onSubmit('success');
        formApi.reset();
      } catch {
        onSubmit('error');
      } finally {
        setIsPending(false);
      }
    },
  });

  return (
    <form
      data-component="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
      className={cn('relative grid grid-cols-1 gap-6', className)}
    >
      {/* Honeypot — hidden from real users, only bots fill this in. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>
      <form.Field
        name="name"
        validators={{ onChange: ({ value }) => required('Name')(value) }}
        children={(field) => (
          <PortfolioFormInput
            field={field}
            label={t('contact.namePlaceholder')}
            disabled={isPending}
          />
        )}
      />
      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) =>
            required('Email')(value) ??
            (isValidEmail(value) ? undefined : 'Enter a valid email'),
        }}
        children={(field) => (
          <PortfolioFormInput
            field={field}
            label={t('contact.emailPlaceholder')}
            type="email"
            disabled={isPending}
          />
        )}
      />
      <form.Field
        name="message"
        validators={{ onChange: ({ value }) => required('Message')(value) }}
        children={(field) => (
          <PortfolioFormInput
            field={field}
            label={t('contact.messagePlaceholder')}
            multiline
            rows={6}
            disabled={isPending}
          />
        )}
      />
      <div className="flex items-center justify-end">
        <PortfolioButton
          type="submit"
          size="lg"
          disabled={isPending}
         
        >
          {isPending && (
            <CircleNotchIcon className="size-4 shrink-0 animate-spin" />
          )}
          {isPending ? t('contact.sendingLabel') : t('contact.submitLabel')}
        </PortfolioButton>
      </div>
    </form>
  );
}

export { ContactForm };
