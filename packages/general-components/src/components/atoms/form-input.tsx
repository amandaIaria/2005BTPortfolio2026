import { cn } from '../../lib/utils';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import type { FormInputProps } from '@packages/general-components/src/components/types.ts';

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

function FormInput({
  field,
  label,
  type = 'text',
  multiline = false,
  rows = 6,
  disabled = false,
  className,
}: FormInputProps) {
  const hasError = !field.state.meta.isValid;
  const hasValue = field.state.value.length > 0;

  return (
    <div
      data-component="form-input"
      className={cn('grid gap-1.5 bg-white dark:bg-background', className)}
    >
      <div
        className={cn(
          fieldContainerClassName(hasError),
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
              ? floatingLabelClassNameTextarea(hasValue)
              : floatingLabelClassName(hasValue)
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
