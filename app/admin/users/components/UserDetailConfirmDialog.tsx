"use client";

import type { UserOutDto } from "@/app/services/users/dto";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export type UserDetailConfirmDialogProps = {
  open: boolean;
  user: UserOutDto | null;
  onClose: () => void;
  onConfirm: (user: UserOutDto) => void;
};

export const UserDetailConfirmDialog = ({
  open,
  user,
  onClose,
  onConfirm,
}: UserDetailConfirmDialogProps) => {
  const handleConfirm = () => {
    if (!user) return;
    onConfirm(user);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 800 }}>詳細へ移動</DialogTitle>

      <DialogContent>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {user?.name ?? ""} の詳細画面へ移動しますか？
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button sx={{ minWidth: 100 }} variant="contained" onClick={onClose}>
          いいえ
        </Button>
        <Button
          sx={{ minWidth: 100 }}
          variant="contained"
          onClick={handleConfirm}
          disabled={!user}
        >
          はい
        </Button>
      </DialogActions>
    </Dialog>
  );
};
