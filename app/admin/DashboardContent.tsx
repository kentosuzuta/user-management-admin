"use client";

import type { UserOutDto } from "@/app/services/users/dto";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { useDashboardHandler } from "./hooks/useDashboardHandler";

export type DashboardContentProps = {
  users: UserOutDto[];
};

const KpiCard = ({ label, value }: { label: string; value: number }) => (
  <Card>
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 800 }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export const DashboardContent = ({ users }: DashboardContentProps) => {
  const { total, statusCount, roleCount } = useDashboardHandler(users);

  return (
    <Stack spacing={3}>
      <Typography variant="h5" sx={{ fontWeight: 800 }}>
        Dashboard
      </Typography>

      <Stack direction="row" spacing={2} flexWrap="wrap">
        <KpiCard label="Total Users" value={total} />
        <KpiCard label="Active" value={statusCount.active} />
        <KpiCard label="Invited" value={statusCount.invited} />
        <KpiCard label="Suspended" value={statusCount.suspended} />
      </Stack>

      <Stack direction="row" spacing={2} flexWrap="wrap">
        <KpiCard label="Admin" value={roleCount.admin} />
        <KpiCard label="Member" value={roleCount.member} />
        <KpiCard label="Viewer" value={roleCount.viewer} />
      </Stack>
    </Stack>
  );
};
