"use client";

import { Alert, Box, CircularProgress } from "@mui/material";
import { DashboardContent } from "./DashboardContent";
import { useUsersListHandler } from "./users/hooks/useUsersListHandler";

export default function DashboardPage() {
  const { rows, isLoading, error } = useUsersListHandler();

  if (isLoading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">データ取得に失敗しました: {String(error)}</Alert>
    );
  }

  return <DashboardContent users={rows} />;
}
