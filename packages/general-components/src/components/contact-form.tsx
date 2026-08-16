import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from '@tanstack/react-form';
import { CircleNotchIcon } from '@phosphor-icons/react';

import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import type { ContactFormProps } from '@packages/general-components/src/components/types.ts';

const CONTACT_ENDPOINT = '/.netlify/functions/contact';

function required(label: string) {
  return (value: string) => (value.trim() ? undefined : `${label} is required`);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Legacy "BT" input styling — bordered flat-black container, bold accent focus
// ring, floating label. Ported from packages/design-system/legacy-bt-scss's
// .aic-a-label / .aic-m-input-field (input/textarea height, colors, and the
// focus/error ring thickness all match the original values).
const BARE_FIELD_CLASSNAME =
  'h-auto border-transparent bg-transparent px-0 text-base shadow-none focus-visible:border-transparent focus-visible:ring-0 aria-invalid:border-transparent aria-invalid:ring-0 dark:bg-transparent dark:aria-invalid:border-transparent dark:aria-invalid:ring-0';

function fieldContainerClassName(hasError: boolean) {
  return cn(
    'relative border border-[var(--flat-black)] px-2 transition-[border-color,box-shadow] duration-150',
    'focus-within:border-[var(--bt-active)] focus-within:shadow-[inset_0_0_0_4px_var(--bt-active)]',
    hasError &&
      'border-[var(--bt-error)] shadow-[inset_0_0_0_4px_var(--bt-error)] focus-within:border-[var(--bt-error)] focus-within:shadow-[inset_0_0_0_4px_var(--bt-error)]',
  );
}

function floatingLabelClassName(hasValue: boolean) {
  return cn(
    'pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-base text-[var(--flat-black)] transition-all duration-150',
    'peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10px]',
    hasValue && 'top-2 translate-y-0 text-[10px]',
  );
}

function floatingLabelClassNameTextarea(hasValue: boolean) {
  return cn(
    'pointer-events-none absolute left-2 top-4 text-base text-[var(--flat-black)] transition-all duration-150',
    'peer-focus:top-2 peer-focus:text-[10px]',
    hasValue && 'top-2 text-[10px]',
  );
}

function ContactForm({ className, onSubmit }: ContactFormProps) {
  const { t } = useTranslation();
  const [isPending, setIsPending] = useState(false);

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
          body: JSON.stringify(value),
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
      className={cn('grid grid-cols-1 gap-6', className)}
    >
      <form.Field
        name="name"
        validators={{ onChange: ({ value }) => required('Name')(value) }}
        children={(field) => (
          <div className="grid gap-1.5 bg-white dark:bg-background">
            <div
              className={cn(
                fieldContainerClassName(!field.state.meta.isValid),
                'flex min-h-14 items-center pt-4',
              )}
            >
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
                className={cn(BARE_FIELD_CLASSNAME, 'peer w-full')}
              />
              <Label
                htmlFor={field.name}
                className={floatingLabelClassName(field.state.value.length > 0)}
              >
                {t('contact.namePlaceholder')}
              </Label>
            </div>
            {!field.state.meta.isValid && (
              <em className="text-xs text-[var(--bt-error)]">
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
          <div className="grid gap-1.5 bg-white dark:bg-background">
            <div
              className={cn(
                fieldContainerClassName(!field.state.meta.isValid),
                'flex min-h-14 items-center pt-4',
              )}
            >
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
                className={cn(BARE_FIELD_CLASSNAME, 'peer w-full')}
              />
              <Label
                htmlFor={field.name}
                className={floatingLabelClassName(field.state.value.length > 0)}
              >
                {t('contact.emailPlaceholder')}
              </Label>
            </div>
            {!field.state.meta.isValid && (
              <em className="text-xs text-[var(--bt-error)]">
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
          <div className="grid gap-1.5 bg-white dark:bg-background">
            <div
              className={cn(
                fieldContainerClassName(!field.state.meta.isValid),
                'pt-5 pb-2',
              )}
            >
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
                className={cn(BARE_FIELD_CLASSNAME, 'peer w-full')}
              />
              <Label
                htmlFor={field.name}
                className={floatingLabelClassNameTextarea(
                  field.state.value.length > 0,
                )}
              >
                {t('contact.messagePlaceholder')}
              </Label>
            </div>
            {!field.state.meta.isValid && (
              <em className="text-xs text-[var(--bt-error)]">
                {field.state.meta.errors.join(', ')}
              </em>
            )}
          </div>
        )}
      />
      <div className="flex items-center justify-end">
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className={cn(
            'cursor-pointer h-auto rounded-xs border border-[var(--bt-active)] bg-[var(--bt-active)] px-6 py-1.5 pb-2 font-extrabold text-white uppercase shadow-[inset_0_-4px_0_0_var(--bt-active-deep)] transition-[box-shadow,padding-bottom,top] duration-100',
            'active:top-1 active:pb-1.5 active:shadow-none',
            'focus-visible:ring-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--bt-active)] focus-visible:outline-offset-8',
          )}
        >
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
