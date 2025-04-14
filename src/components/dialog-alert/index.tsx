import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IDialogAlertActions {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickYes: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export function DialogAlert({
  open,
  setOpen,
  handleClickYes,
}: IDialogAlertActions) {
  const handleClickNo = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClickNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ alignSelf: 'center' }} id="alert-dialog-title">
          {'Delete product'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete product?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-evenly' }}>
          <Button
            sx={{ color: 'black' }}
            disableRipple={true}
            onClick={handleClickNo}
          >
            No
          </Button>
          <Button
            sx={{ color: 'black' }}
            disableRipple={true}
            onClick={handleClickYes}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
