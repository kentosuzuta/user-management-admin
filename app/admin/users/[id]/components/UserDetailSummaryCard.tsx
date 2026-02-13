"use client";

import type { UserOutDto } from "@/app/services/users/dto";
import { formatDateYmd } from "@/app/utils/utils";
import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import type { ChangedFields } from "../hooks/useUserEditDialogHandler";

type RowProps = {
  label: string;
  value: string;
  isChanged?: boolean;
};

const Row = ({ label, value, isChanged = false }: RowProps) => {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: isChanged ? "primary.main" : "text.primary",
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
};

export type UserDetailSummaryCardProps = {
  user: UserOutDto;
  changedFields?: ChangedFields;
};

export const UserDetailSummaryCard = ({
  user,
  changedFields,
}: UserDetailSummaryCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
          基本情報
        </Typography>

        <Stack spacing={1.2}>
          <Row label="ID" value={user.id} />
          <Divider />
          <Row label="Role" value={user.role} isChanged={changedFields?.role} />
          <Divider />
          <Row
            label="Status"
            value={user.status}
            isChanged={changedFields?.status}
          />
          <Divider />
          <Row label="Created" value={formatDateYmd(user.createdAt)} />
        </Stack>
      </CardContent>
    </Card>
  );
};
