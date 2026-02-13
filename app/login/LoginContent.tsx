"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { logoutNotice } from "../utils/auth/logoutNotice";
import { useLoginHandler } from "./hooks/useLoginHandler";

export const LoginContent = () => {
  const router = useRouter();
  const {
    email,
    password,
    setEmail,
    setPassword,
    isSubmitting,
    error,
    canSubmit,
    login,
  } = useLoginHandler();
  const [isLogoutSnackbarOpen, setIsLogoutSnackbarOpen] = useState(() => {
    return logoutNotice.consume();
  });

  const closeLogoutSnackbar = () => {
    setIsLogoutSnackbarOpen(false);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const ok = await login();
    if (ok) router.push("/admin");
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          p: 3,
        }}
      >
        <Card sx={{ width: "100%", maxWidth: 520 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Login
            </Typography>

            <Typography
              variant="body2"
              sx={{ mt: 0.5, color: "text.secondary" }}
            >
              デモ用ログイン（admin@example.com / password）
            </Typography>

            <Stack
              component="form"
              spacing={2}
              sx={{ mt: 2 }}
              onSubmit={handleSubmit}
            >
              {error ? <Alert severity="error">{error}</Alert> : null}

              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                disabled={isSubmitting}
                fullWidth
              />

              <TextField
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
                disabled={isSubmitting}
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                disabled={!canSubmit}
                sx={{ py: 1.2, fontWeight: 700 }}
              >
                ログイン
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <Snackbar
        open={isLogoutSnackbarOpen}
        autoHideDuration={2000}
        onClose={closeLogoutSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={closeLogoutSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          ログアウトしました
        </Alert>
      </Snackbar>
    </>
  );
};
