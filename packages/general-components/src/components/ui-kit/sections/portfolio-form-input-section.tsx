import { useForm } from '@tanstack/react-form';
import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { PortfolioFormInput } from '../../atoms/portfolio-form-input';

function PortfolioFormInputSection() {
  const { t } = useTranslation('uiKit');
  const form = useForm({
    defaultValues: { name: '', email: '', missing: '' },
    onSubmit: async () => {},
  });

  return (
    <Section title={t('sections.portfolioFormInput.title')}>
      <div className="grid max-w-sm gap-4">
        <form.Field
          name="name"
          children={(field) => (
            <PortfolioFormInput
              field={field}
              label={t('sections.portfolioFormInput.nameLabel')}
            />
          )}
        />
        <form.Field
          name="email"
          children={(field) => (
            <PortfolioFormInput
              field={field}
              label={t('sections.portfolioFormInput.disabledLabel')}
              type="email"
              disabled
            />
          )}
        />
        <form.Field
          name="missing"
          validators={{
            onMount: () => t('sections.portfolioFormInput.errorMessage'),
            onChange: ({ value }) =>
              value.trim()
                ? undefined
                : t('sections.portfolioFormInput.errorMessage'),
          }}
          children={(field) => (
            <PortfolioFormInput
              field={field}
              label={t('sections.portfolioFormInput.errorLabel')}
            />
          )}
        />
      </div>
    </Section>
  );
}

export { PortfolioFormInputSection };
