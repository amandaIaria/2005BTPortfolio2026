import { FormInput } from './form-input';
import type { PortfolioFormInputProps } from '@packages/general-components/src/components/types.ts';

function PortfolioFormInput(props: PortfolioFormInputProps) {
  return <FormInput {...props} variant="portfolio" />;
}

export { PortfolioFormInput };
