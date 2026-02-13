"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export type UserDeleteDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
  isSubmitting?: boolean;
};

export const UserDeleteDialog = ({
  isOpen,
  onClose,
  onConfirm,
  userName,
  isSubmitting = false,
}: UserDeleteDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>ユーザー削除</DialogTitle>

      <DialogContent>
        <DialogContentText>
          「{userName}」を削除します。この操作は取り消せません。
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          sx={{ minWidth: 100 }}
          variant="contained"
          onClick={onClose}
          disabled={isSubmitting}
        >
          いいえ
        </Button>
        <Button
          sx={{ minWidth: 100 }}
          variant="contained"
          onClick={onConfirm}
          disabled={isSubmitting}
        >
          はい
        </Button>
      </DialogActions>
    </Dialog>
  );
};
