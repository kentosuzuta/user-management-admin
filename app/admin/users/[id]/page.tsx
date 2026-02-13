"use client";

import { Alert, Box, CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import { useUserDetailHandler } from "./hooks/useUserDetailHandler";
import { UserDetailContent } from "./UserDetailContent";

export default function UserDetailPage() {
  const params = useParams<{ id: string }>();
  const userId = params.id;

  const { user, isLoading, error, mutate } = useUserDetailHandler(userId);

  if (isLoading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">取得に失敗しました: {String(error)}</Alert>;
  }

  if (!user) {
    return <Alert severity="warning">ユーザーが見つかりませんでした</Alert>;
  }

  return (
    <UserDetailContent
      user={user}
      onRefetch={async () => {
        await mutate();
      }}
    />
  );
}
