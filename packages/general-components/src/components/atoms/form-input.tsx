import { cn } from '../../lib/utils';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import type {
  FormInputProps,
  FormInputVariant,
} from '@packages/general-components/src/components/types.ts';

// Legacy "BT" input styling — bordered flat-black container, bold accent focus
// ring, floating label. Ported from packages/design-system/legacy-bt-scss's
// .aic-a-label / .aic-m-input-field (input/textarea height, colors, and the
// focus/error ring thickness all match the original values).
const BARE_FIELD_CLASSNAME =
  'h-auto border-transparent bg-transparent px-0 shadow-none focus-visible:border-transparent focus-visible:ring-0 aria-invalid:border-transparent aria-invalid:ring-0 dark:bg-transparent dark:aria-invalid:border-transparent dark:aria-invalid:ring-0';

const FIELD_CONTAINER_VARIANT_CLASSNAME: Record<FormInputVariant, string> = {
  legacy:
    'border-[var(--flat-black)] dark:border-white dark:active:border-accent   active:border-accent  focus-within:border-accent dark:focus-within:border-accent focus-within:shadow-[inset_0_0_0_4px_var(--accent)]',
  portfolio:
    'border-[var(--flat-black)] dark:border-white dark:active:border-accent   active:border-accent  focus-within:border-accent dark:focus-within:border-accent focus-within:shadow-[inset_0_0_0_4px_var(--accent)]',
};

const LABEL_VARIANT_CLASSNAME: Record<FormInputVariant, string> = {
  legacy: '',
  portfolio: '',
};

function fieldContainerClassName(hasError: boolean, variant: FormInputVariant) {
  return cn(
    'relative border active:border-accent focus-within:border-accent px-2 transition-[border-color,box-shadow] duration-150',
    FIELD_CONTAINER_VARIANT_CLASSNAME[variant],
    hasError &&
      'border-error active:dark:border-error focus-within:dark:border-error dark:border-error shadow-[inset_0_0_0_4px_var(--error)] focus-within:border-[var(--error)] focus-within:shadow-[inset_0_0_0_4px_var(--error)] dark:focus-within:shadow-[inset_0_0_0_4px_var(--error)]',
  );
}

function floatingLabelClassName(hasValue: boolean, variant: FormInputVariant) {
  return cn(
    'pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-base transition-all duration-150',
    LABEL_VARIANT_CLASSNAME[variant],
    'peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10px]',
    hasValue && 'top-2 translate-y-0 text-[10px]',
  );
}

function floatingLabelClassNameTextarea(
  hasValue: boolean,
  variant: FormInputVariant,
) {
  return cn(
    'pointer-events-none absolute left-2 top-4 text-base transition-all duration-150',
    LABEL_VARIANT_CLASSNAME[variant],
    'peer-focus:top-2 peer-focus:text-[10px]',
    hasValue && 'top-2 text-[10px]',
  );
}

function FormInput({
  field,
  label,
  type = 'text',
  multiline = false,
  rows = 6,
  disabled = false,
  variant = 'legacy',
  className,
}: FormInputProps) {
  const hasError = !field.state.meta.isValid;
  const hasValue = field.state.value.length > 0;

  return (
    <div
      data-component="form-input"
      data-variant={variant}
      className={cn('grid gap-1.5 bg-white dark:bg-background', className)}
    >
      <div
        className={cn(
          fieldContainerClassName(hasError, variant),
          multiline ? 'pt-5 pb-2' : 'flex min-h-14 items-center pt-4',
        )}
      >
        {multiline ? (
          <Textarea
            id={field.name}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            placeholder=" "
            onChange={(e) => field.handleChange(e.target.value)}
            aria-invalid={hasError}
            disabled={disabled}
            rows={rows}
            className={cn(BARE_FIELD_CLASSNAME, 'peer w-full')}
          />
        ) : (
          <Input
            id={field.name}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            type={type}
            placeholder=" "
            onChange={(e) => field.handleChange(e.target.value)}
            aria-invalid={hasError}
            disabled={disabled}
            className={cn(BARE_FIELD_CLASSNAME, 'peer w-full')}
          />
        )}
        <Label
          htmlFor={field.name}
          className={
            multiline
              ? floatingLabelClassNameTextarea(hasValue, variant)
              : floatingLabelClassName(hasValue, variant)
          }
        >
          {label}
        </Label>
      </div>
      {hasError && (
        <em className="text-xs text-[var(--bt-error)]">
          {field.state.meta.errors.join(', ')}
        </em>
      )}
    </div>
  );
}

export { FormInput };
