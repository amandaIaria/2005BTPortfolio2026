import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from '@tanstack/react-form';
import {
  CheckCircleIcon,
  WarningCircleIcon,
  CircleNotchIcon,
} from '@phosphor-icons/react';

import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import type { ContactFormProps } from '@packages/general-components/src/components/types.ts';

type SubmitStatus = 'idle' | 'pending' | 'success' | 'error';

const CONTACT_ENDPOINT = '/.netlify/functions/contact';

function required(label: string) {
  return (value: string) => (value.trim() ? undefined : `${label} is required`);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function floatingLabelClassName(hasValue: boolean) {
  return cn(
    'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-150 peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-[10px]',
    hasValue && 'top-2.5 translate-y-0 text-[10px]',
  );
}

function ContactForm({ className }: ContactFormProps) {
  const { t } = useTranslation();
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    onSubmit: async ({ value, formApi }) => {
      setStatus('pending');
      try {
        const response = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(value),
        });
        if (!response.ok) {
          throw new Error('Request failed');
        }
        setStatus('success');
        formApi.reset();
      } catch {
        setStatus('error');
      }
    },
  });

  const isPending = status === 'pending';

  return (
    <form
      data-component="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
      className={cn('grid grid-cols-1 gap-6', className)}
    >
      {status === 'success' && (
        <div
          role="status"
          className="flex animate-in items-center gap-2 border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800 fade-in-0 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
        >
          <CheckCircleIcon className="size-4 shrink-0" />
          {t('contact.successMessage')}
        </div>
      )}
      {status === 'error' && (
        <div
          role="alert"
          className="flex animate-in items-center gap-2 border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive fade-in-0"
        >
          <WarningCircleIcon className="size-4 shrink-0" />
          {t('contact.errorMessage')}
        </div>
      )}
      <form.Field
        name="name"
        validators={{ onChange: ({ value }) => required('Name')(value) }}
        children={(field) => (
          <div className="grid gap-1.5">
            <div className="relative">
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="text"
                placeholder=" "
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={!field.state.meta.isValid}
                disabled={isPending}
                className="peer pt-5 pb-1.5"
              />
              <Label
                htmlFor={field.name}
                className={floatingLabelClassName(field.state.value.length > 0)}
              >
                {t('contact.namePlaceholder')}
              </Label>
            </div>
            {!field.state.meta.isValid && (
              <em className="text-xs text-destructive">
                {field.state.meta.errors.join(', ')}
              </em>
            )}
          </div>
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
          <div className="grid gap-1.5">
            <div className="relative">
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="email"
                placeholder=" "
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={!field.state.meta.isValid}
                disabled={isPending}
                className="peer pt-5 pb-1.5"
              />
              <Label
                htmlFor={field.name}
                className={floatingLabelClassName(field.state.value.length > 0)}
              >
                {t('contact.emailPlaceholder')}
              </Label>
            </div>
            {!field.state.meta.isValid && (
              <em className="text-xs text-destructive">
                {field.state.meta.errors.join(', ')}
              </em>
            )}
          </div>
        )}
      />
      <form.Field
        name="message"
        validators={{ onChange: ({ value }) => required('Message')(value) }}
        children={(field) => (
          <div className="grid gap-1.5">
            <div className="relative">
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                placeholder=" "
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={!field.state.meta.isValid}
                disabled={isPending}
                rows={6}
                className="peer pt-5 pb-1.5"
              />
              <Label
                htmlFor={field.name}
                className={floatingLabelClassName(field.state.value.length > 0)}
              >
                {t('contact.messagePlaceholder')}
              </Label>
            </div>
            {!field.state.meta.isValid && (
              <em className="text-xs text-destructive">
                {field.state.meta.errors.join(', ')}
              </em>
            )}
          </div>
        )}
      />
      <div className="flex items-center justify-end">
        <Button type="submit" size="lg" disabled={isPending}>
          {isPending && (
            <CircleNotchIcon className="size-4 shrink-0 animate-spin" />
          )}
          {isPending ? t('contact.sendingLabel') : t('contact.submitLabel')}
        </Button>
      </div>
    </form>
  );
}

export { ContactForm };
