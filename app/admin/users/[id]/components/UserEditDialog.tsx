"use client";

import {
  USER_ROLE_OPTIONS,
  USER_STATUS_OPTIONS,
} from "@/app/services/users/constants";
import type {
  UserOutDto,
  UserRoleOutDto,
  UserStatusOutDto,
} from "@/app/services/users/dto";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

export type UserEditFormValues = {
  name: string;
  email: string;
  role: UserRoleOutDto;
  status: UserStatusOutDto;
};

export type UserEditDialogProps = {
  isOpen: boolean;
  user: UserOutDto;
  values: UserEditFormValues;
  onChange: <Key extends keyof UserEditFormValues>(
    key: Key,
    value: UserEditFormValues[Key],
  ) => void;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
};

export const UserEditDialog = ({
  isOpen,
  user,
  values,
  onChange,
  onClose,
  onConfirm,
  isSubmitting = false,
}: UserEditDialogProps) => {
  const isValid =
    values.name.trim().length > 0 && values.email.trim().length > 0;

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 800 }}>
        ユーザー編集（{user.name}）
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="名前"
            value={values.name}
            onChange={(e) => onChange("name", e.target.value)}
            fullWidth
            required
            disabled={isSubmitting}
          />

          <TextField
            label="メールアドレス"
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
            type="email"
            fullWidth
            required
            disabled={isSubmitting}
          />

          <TextField
            label="Role"
            value={values.role}
            onChange={(e) => onChange("role", e.target.value as UserRoleOutDto)}
            select
            fullWidth
            disabled={isSubmitting}
          >
            {USER_ROLE_OPTIONS.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Status"
            value={values.status}
            onChange={(e) =>
              onChange("status", e.target.value as UserStatusOutDto)
            }
            select
            fullWidth
            disabled={isSubmitting}
          >
            {USER_STATUS_OPTIONS.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          sx={{ minWidth: 100 }}
          variant="contained"
          onClick={onClose}
          disabled={isSubmitting}
        >
          キャンセル
        </Button>
        <Button
          sx={{ minWidth: 100 }}
          variant="contained"
          onClick={onConfirm}
          disabled={!isValid || isSubmitting}
        >
          確定
        </Button>
      </DialogActions>
    </Dialog>
  );
};
