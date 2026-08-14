import {
  Container,
  Button,
  WebGLTentacleWall,
  SocialBar,
  Footer,
} from '@general/components';
import { useTranslation } from 'react-i18next';
import { useForm } from '@tanstack/react-form';

const required = (label: string) => (value: string) =>
  value.trim() ? undefined : `${label} is required`;

function ModernContactPage() {
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    onSubmit: ({ value }) => {
      // Do something with form data
      alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <>
      <Container
        data-component="modern-contact-page"
        className=" h-screen grid items-center relative z-10"
      >
        <div className="grid gap-20 grid-cols-[400px_1fr] max-w-200 w-full mx-auto relative z-10 backdrop-blur-sm">
          <div className="flex flex-col gap-10">
            <h1 className="text-6xl">{t('contact.heading')}</h1>
            <p className="text-md font-medium text-accent">
              {t('contact.intro')}
            </p>
            <SocialBar />
          </div>
          <div className="flex flex-col gap-10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="grid grid-cols-1 gap-6"
            >
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) => required('Name')(value),
                }}
                children={(field) => (
                  <>
                    <input
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      type="text"
                      placeholder={t('contact.namePlaceholder')}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-4 text-lg focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
                    />
                    {!field.state.meta.isValid && (
                      <em>{field.state.meta.errors.join(',')}</em>
                    )}
                  </>
                )}
              />
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => required('Email')(value),
                }}
                children={(field) => (
                  <>
                    <input
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      type="email"
                      placeholder={t('contact.emailPlaceholder')}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-4 text-lg focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
                    />
                    {!field.state.meta.isValid && (
                      <em>{field.state.meta.errors.join(',')}</em>
                    )}
                  </>
                )}
              />
              <form.Field
                name="message"
                validators={{
                  onChange: ({ value }) => required('Message')(value),
                }}
                children={(field) => (
                  <>
                    <textarea
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      placeholder={t('contact.messagePlaceholder')}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-4 text-lg focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
                    ></textarea>
                    {!field.state.meta.isValid && (
                      <em>{field.state.meta.errors.join(',')}</em>
                    )}
                  </>
                )}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  className="cursor-pointer rounded-lg bg-accent p-6 text-lg font-semibold text-white transition-colors duration-300 hover:bg-accent-dark"
                >
                  {t('contact.submitLabel')}
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="absolute bottom-0">
          <Footer />
        </div>
      </Container>
    </>
  );
}

export { ModernContactPage };
