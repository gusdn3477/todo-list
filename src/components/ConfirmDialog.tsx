import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ConfirmDialogProps {
  title: string;
  contents: string;
  confirmText?: string;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

export const ConfirmDialog = ({
  title,
  contents,
  open,
  confirmText,
  handleClose,
  handleConfirm,
}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {contents}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleConfirm}>
          {confirmText ? confirmText : '삭제하기'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
