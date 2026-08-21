import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { Button } from '../../ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../../ui/dialog';

function DialogSection() {
  const { t } = useTranslation('uiKit');
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Section title={t('sections.dialog.title')}>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button>{t('sections.dialog.trigger')}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('sections.dialog.dialogTitle')}</DialogTitle>
            <DialogDescription>
              {t('sections.dialog.description')}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-[var(--sea-ink-soft)]">
              {t('sections.dialog.body')}
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{t('sections.dialog.cancel')}</Button>
            </DialogClose>
            <Button onClick={() => setDialogOpen(false)}>
              {t('sections.dialog.confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Section>
  );
}

export { DialogSection };
