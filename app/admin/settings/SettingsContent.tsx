"use client";

import { USER_ROLE_OPTIONS } from "@/app/services/users/constants";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useSettingsHandler } from "./hooks/useSettingsHandler";

const TIMEZONE_OPTIONS = [
  "Asia/Tokyo",
  "UTC",
  "America/Los_Angeles",
  "America/New_York",
  "Europe/London",
] as const;

export const SettingsContent = () => {
  const {
    values,
    isLoading,
    loadError,
    isDirty,
    isSaving,
    isSavedSnackbarOpen,
    error,
    updateValue,
    reset,
    restoreDefaults,
    save,
    closeSavedSnackbar,
  } = useSettingsHandler();

  if (isLoading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Settings
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, color: "text.secondary" }}>
            管理画面の基本設定
          </Typography>
        </Box>

        {loadError ? (
          <Alert severity="error">
            設定の取得に失敗しました: {String(loadError)}
          </Alert>
        ) : null}

        {error ? <Alert severity="error">{error}</Alert> : null}

        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                基本設定
              </Typography>

              <TextField
                label="会社名"
                value={values.companyName}
                onChange={(e) => updateValue("companyName", e.target.value)}
                disabled={isSaving}
                fullWidth
              />

              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <TextField
                  label="タイムゾーン"
                  select
                  value={values.timezone}
                  onChange={(e) => updateValue("timezone", e.target.value)}
                  disabled={isSaving}
                  fullWidth
                >
                  {TIMEZONE_OPTIONS.map((timezone) => (
                    <MenuItem key={timezone} value={timezone}>
                      {timezone}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="新規ユーザーの初期権限"
                  select
                  value={values.defaultRole}
                  onChange={(e) =>
                    updateValue(
                      "defaultRole",
                      e.target.value as (typeof USER_ROLE_OPTIONS)[number],
                    )
                  }
                  disabled={isSaving}
                  fullWidth
                >
                  {USER_ROLE_OPTIONS.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <TextField
                label="セッションタイムアウト"
                type="number"
                value={values.sessionTimeoutMin}
                onChange={(e) =>
                  updateValue(
                    "sessionTimeoutMin",
                    Number.isNaN(Number(e.target.value))
                      ? 0
                      : Number(e.target.value),
                  )
                }
                disabled={isSaving}
                inputProps={{ min: 5, max: 240 }}
                fullWidth
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={values.requireTwoFactor}
                    onChange={(e) =>
                      updateValue("requireTwoFactor", e.target.checked)
                    }
                    disabled={isSaving}
                  />
                }
                label="二段階認証を必須にする（デモ）"
              />
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                通知設定
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={values.notifyUserCreated}
                    onChange={(e) =>
                      updateValue("notifyUserCreated", e.target.checked)
                    }
                    disabled={isSaving}
                  />
                }
                label="ユーザー作成時に通知する"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={values.notifyUserUpdated}
                    onChange={(e) =>
                      updateValue("notifyUserUpdated", e.target.checked)
                    }
                    disabled={isSaving}
                  />
                }
                label="ユーザー更新時に通知する"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={values.notifyUserDeleted}
                    onChange={(e) =>
                      updateValue("notifyUserDeleted", e.target.checked)
                    }
                    disabled={isSaving}
                  />
                }
                label="ユーザー削除時に通知する"
              />
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              spacing={2}
              alignItems={{ xs: "flex-start", md: "center" }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Save Status
                </Typography>
                <Chip
                  size="small"
                  label={isDirty ? "未保存の変更あり" : "保存状態"}
                  color={isDirty ? "warning" : "success"}
                />
              </Stack>

              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  onClick={restoreDefaults}
                  disabled={isSaving}
                >
                  デフォルトに戻す
                </Button>
                <Button
                  variant="outlined"
                  onClick={reset}
                  disabled={isSaving || !isDirty}
                >
                  変更を破棄
                </Button>
                <Button
                  variant="contained"
                  onClick={save}
                  disabled={isSaving || !isDirty}
                >
                  保存
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Snackbar
        open={isSavedSnackbarOpen}
        autoHideDuration={2500}
        onClose={closeSavedSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={closeSavedSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          設定を保存しました
        </Alert>
      </Snackbar>
    </>
  );
};
