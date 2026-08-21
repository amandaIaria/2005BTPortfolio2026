import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import {
  PortfolioAlert,
  PortfolioAlertTitle,
  PortfolioAlertDescription,
} from '../../atoms/portfolio-alert';

function PortfolioAlertSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.portfolioAlert.title')}>
      <div className="flex flex-col gap-4">
        <PortfolioAlert>
          <PortfolioAlertTitle>
            {t('sections.portfolioAlert.defaultTitle')}
          </PortfolioAlertTitle>
          <PortfolioAlertDescription>
            {t('sections.portfolioAlert.defaultDescription')}
          </PortfolioAlertDescription>
        </PortfolioAlert>
        <PortfolioAlert variant="info">
          <PortfolioAlertTitle>
            {t('sections.portfolioAlert.infoTitle')}
          </PortfolioAlertTitle>
          <PortfolioAlertDescription>
            {t('sections.portfolioAlert.infoDescription')}
          </PortfolioAlertDescription>
        </PortfolioAlert>
        <PortfolioAlert variant="success">
          <PortfolioAlertTitle>
            {t('sections.portfolioAlert.successTitle')}
          </PortfolioAlertTitle>
          <PortfolioAlertDescription>
            {t('sections.portfolioAlert.successDescription')}
          </PortfolioAlertDescription>
        </PortfolioAlert>
        <PortfolioAlert variant="caution">
          <PortfolioAlertTitle>
            {t('sections.portfolioAlert.cautionTitle')}
          </PortfolioAlertTitle>
          <PortfolioAlertDescription>
            {t('sections.portfolioAlert.cautionDescription')}
          </PortfolioAlertDescription>
        </PortfolioAlert>
        <PortfolioAlert variant="error">
          <PortfolioAlertTitle>
            {t('sections.portfolioAlert.errorTitle')}
          </PortfolioAlertTitle>
          <PortfolioAlertDescription>
            {t('sections.portfolioAlert.errorDescription')}
          </PortfolioAlertDescription>
        </PortfolioAlert>
        <PortfolioAlert variant="success" onDismiss={() => {}}>
          <PortfolioAlertTitle>
            {t('sections.portfolioAlert.dismissibleSuccessTitle')}
          </PortfolioAlertTitle>
          <PortfolioAlertDescription>
            {t('sections.portfolioAlert.dismissDescription')}
          </PortfolioAlertDescription>
        </PortfolioAlert>
        <PortfolioAlert variant="error" onDismiss={() => {}}>
          <PortfolioAlertTitle>
            {t('sections.portfolioAlert.dismissibleErrorTitle')}
          </PortfolioAlertTitle>
          <PortfolioAlertDescription>
            {t('sections.portfolioAlert.dismissDescription')}
          </PortfolioAlertDescription>
        </PortfolioAlert>
         <PortfolioAlert variant="caution" onDismiss={() => {}}>
          <PortfolioAlertTitle>
            {t('sections.portfolioAlert.dismissibleCautionTitle')}
          </PortfolioAlertTitle>
          <PortfolioAlertDescription>
            {t('sections.portfolioAlert.dismissDescription')}
          </PortfolioAlertDescription>
        </PortfolioAlert>
      </div>
    </Section>
  );
}

export { PortfolioAlertSection };
