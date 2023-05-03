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

interface CancelShiftDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  confirmAction: () => void;
}

const CancelShiftDialog: React.FC<CancelShiftDialogProps> = ({ isOpen, setIsOpen, confirmAction }): ReactJSXElement => {
  const handleClose = (): void => setIsOpen(false);
  const onSubmit = (): void => {
    confirmAction();
    handleClose();
  }

  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-cancel-shift"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-cancel-shift">
        Are you sure you want to cancel this shift?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Canceling this shift is permanent and cannot be undone. Please confirm that you want to cancel this shift.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>Dismiss</Button>
        <Button variant='contained' color='error' onClick={onSubmit}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CancelShiftDialog;