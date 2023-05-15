import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface LongShiftDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  confirmAction: () => void;
}

const LongShiftDialog: React.FC<LongShiftDialogProps> = ({ isOpen, setIsOpen, confirmAction }): ReactJSXElement => {
  const handleClose = (): void => setIsOpen(false);
  const onSubmit = (): void => {
    confirmAction();
    handleClose();
    console.log('handle close')
  }

  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-long-shift"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-long-shift">
        Warning: Long Shift
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This shift will be scheduled for a duration longer than 12 hours. Are you sure you want to schedule a shift this long?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>Dismiss</Button>
        <Button variant='contained' onClick={onSubmit}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LongShiftDialog;