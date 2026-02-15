"use client";

import { getUserStatusChip } from "@/app/admin/users/utils/status";
import type { UserOutDto } from "@/app/services/users/dto";
import { formatDateYmd } from "@/app/utils/utils";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useDashboardHandler } from "./hooks/useDashboardHandler";

export type DashboardContentProps = {
  users: UserOutDto[];
};

const KpiCard = ({
  label,
  value,
  helper,
}: {
  label: string;
  value: string | number;
  helper?: string;
}) => (
  <Card sx={{ minWidth: 0 }}>
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 800 }}>
        {value}
      </Typography>
      {helper ? (
        <Typography variant="caption" color="text.secondary">
          {helper}
        </Typography>
      ) : null}
    </CardContent>
  </Card>
);

const DistributionCard = ({
  title,
  rows,
}: {
  title: string;
  rows: { key: string; label: string; count: number; ratio: number }[];
}) => (
  <Card sx={{ minWidth: 0 }}>
    <CardContent>
      <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
        {title}
      </Typography>

      <Stack spacing={1.5} sx={{ mt: 2 }}>
        {rows.map((row) => (
          <Box key={row.key}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
              <Typography variant="body2">{row.label}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {row.count} ({row.ratio}%)
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={row.ratio}
              sx={{ height: 8, borderRadius: 999 }}
            />
          </Box>
        ))}
      </Stack>
    </CardContent>
  </Card>
);

export const DashboardContent = ({ users }: DashboardContentProps) => {
  const {
    total,
    statusCount,
    roleCount,
    recentUsers,
    newUsersLast7Days,
    activeRate,
    roleDistribution,
    statusDistribution,
  } = useDashboardHandler(users);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Dashboard
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5, color: "text.secondary" }}>
          ユーザー状況のサマリー
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
        }}
      >
        <KpiCard label="Total Users" value={total} />
        <KpiCard label="Active Rate" value={`${activeRate}%`} />
        <KpiCard label="New Users (7 days)" value={newUsersLast7Days} />
        <KpiCard
          label="Admin / Member / Viewer"
          value={`${roleCount.admin} / ${roleCount.member} / ${roleCount.viewer}`}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", lg: "repeat(2, minmax(0, 1fr))" },
        }}
      >
        <DistributionCard title="Role Distribution" rows={roleDistribution} />
        <DistributionCard title="Status Distribution" rows={statusDistribution} />
      </Box>

      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
              Recent Users
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active: {statusCount.active} / Invited: {statusCount.invited} /
              Suspended: {statusCount.suspended}
            </Typography>
          </Stack>

          <Stack divider={<Divider />} sx={{ mt: 1.5 }}>
            {recentUsers.map((user) => {
              const statusMeta = getUserStatusChip(user.status);
              return (
                <Stack
                  key={user.id}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1.5}
                  sx={{ py: 1.25 }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Avatar sx={{ width: 36, height: 36 }}>
                      {user.name.slice(0, 1)}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>{user.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Chip size="small" label={user.role} variant="outlined" />
                    <Chip
                      size="small"
                      label={statusMeta.label}
                      color={statusMeta.color}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {formatDateYmd(user.createdAt)}
                    </Typography>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};
