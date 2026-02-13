"use client";

import { getUserStatusChip } from "@/app/admin/users/utils/status";
import type { UserOutDto } from "@/app/services/users/dto";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import type { ChangedFields } from "../hooks/useUserEditDialogHandler";

export type UserDetailHeaderProps = {
  user: UserOutDto;
  changedFields?: ChangedFields;
  onBack: () => void;
};

export const UserDetailHeader = ({
  user,
  changedFields,
  onBack,
}: UserDetailHeaderProps) => {
  const meta = getUserStatusChip(user.status);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: changedFields?.name ? "primary.main" : "text.primary",
            }}
          >
            {user.name}
          </Typography>

          <Chip size="small" label={meta.label} color={meta.color} />
        </Stack>

        <Typography
          variant="body2"
          sx={{
            mt: 0.5,
            color: changedFields?.email ? "primary.main" : "text.secondary",
          }}
        >
          {user.email}
        </Typography>
      </Box>

      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
        sx={{ whiteSpace: "nowrap" }}
      >
        一覧へ戻る
      </Button>
    </Stack>
  );
};
