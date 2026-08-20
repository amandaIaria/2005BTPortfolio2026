import { useEffect } from 'react';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { getCookie, setCookie } from '../../lib/cookies';
import type { ModalProps } from '@packages/general-components/src/components/types.ts';

const DISMISS_COOKIE_DAYS = 7;

function Modal({
  id,
  title,
  description,
  type = 'info',
  open,
  onOpenChange,
}: ModalProps) {
  const cookieKey = `modal-dismissed-${id}`;
  const dismissed = type === 'confirmation' && Boolean(getCookie(cookieKey));

  useEffect(() => {
    if (open && dismissed) onOpenChange(false);
  }, [open, dismissed, onOpenChange]);

  function handleOk() {
    if (type === 'confirmation') setCookie(cookieKey, '1', DISMISS_COOKIE_DAYS);
    onOpenChange(false);
  }

  return (
    <Dialog open={open && !dismissed} onOpenChange={onOpenChange}>
      <DialogContent data-component="modal">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleOk}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { Modal };
