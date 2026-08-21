import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { Button } from '../../ui/button';
import {
  PortfolioDialog,
  PortfolioDialogTrigger,
  PortfolioDialogContent,
  PortfolioDialogHeader,
  PortfolioDialogTitle,
  PortfolioDialogDescription,
  PortfolioDialogFooter,
  PortfolioDialogClose,
} from '../../atoms/portfolio-dialog';
import { PortfolioButton } from '../../atoms/portfolio-button';

function PortfolioDialogSection() {
  const { t } = useTranslation('uiKit');
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Section title={t('sections.portfolioDialog.title')}>
      <PortfolioDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <PortfolioDialogTrigger asChild>
          <PortfolioButton>{t('sections.portfolioDialog.trigger')}</PortfolioButton>
        </PortfolioDialogTrigger>
        <PortfolioDialogContent>
          <PortfolioDialogHeader>
            <PortfolioDialogTitle>
              {t('sections.portfolioDialog.dialogTitle')}
            </PortfolioDialogTitle>
            <PortfolioDialogDescription>
              {t('sections.portfolioDialog.description')}
            </PortfolioDialogDescription>
          </PortfolioDialogHeader>
          <div className="py-4">
            <p className="text-sm text-[var(--sea-ink-soft)]">
              {t('sections.portfolioDialog.body')}
            </p>
          </div>
          <PortfolioDialogFooter>
            <PortfolioDialogClose asChild>
              <PortfolioButton variant="outline">
                {t('sections.portfolioDialog.cancel')}
              </PortfolioButton>
            </PortfolioDialogClose>
            <PortfolioButton onClick={() => setDialogOpen(false)}>
              {t('sections.portfolioDialog.confirm')}
            </PortfolioButton>
          </PortfolioDialogFooter>
        </PortfolioDialogContent>
      </PortfolioDialog>
    </Section>
  );
}

export { PortfolioDialogSection };
