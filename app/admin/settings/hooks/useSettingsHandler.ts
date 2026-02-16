"use client";

import { useAdminContext } from "@/app/admin/context/AdminContext";
import type { SettingsOutDto } from "@/app/services/settings/dto";
import { settingsService } from "@/app/services/settings/service";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";

export type SettingsValues = SettingsOutDto;

const DEFAULT_VALUES: SettingsValues = {
  companyName: "Demo Company",
  timezone: "Asia/Tokyo",
  defaultRole: "member",
  sessionTimeoutMin: 60,
  requireTwoFactor: false,
  notifyUserCreated: true,
  notifyUserUpdated: true,
  notifyUserDeleted: true,
};

export const useSettingsHandler = () => {
  const {
    comInfo,
    isLoading: isAdminLoading,
    error: adminError,
  } = useAdminContext();
  const { data, isLoading, error: fetchError, mutate } = useSWR(
    comInfo ? ["settings", comInfo] : null,
    () => settingsService.get({ comInfo: String(comInfo) }),
    { revalidateOnFocus: false },
  );

  const [values, setValues] = useState<SettingsValues>(DEFAULT_VALUES);
  const [savedSnapshot, setSavedSnapshot] = useState<SettingsValues>(DEFAULT_VALUES);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavedSnackbarOpen, setIsSavedSnackbarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!data?.settings) return;
    setValues(data.settings);
    setSavedSnapshot(data.settings);
  }, [data]);

  const isDirty = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(savedSnapshot);
  }, [values, savedSnapshot]);

  const updateValue = useCallback(
    <K extends keyof SettingsValues>(key: K, value: SettingsValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const reset = useCallback(() => {
    setError(null);
    setValues(savedSnapshot);
  }, [savedSnapshot]);

  const restoreDefaults = useCallback(() => {
    setError(null);
    setValues(DEFAULT_VALUES);
  }, []);

  const save = useCallback(async () => {
    try {
      setIsSaving(true);
      setError(null);

      if (values.companyName.trim() === "") {
        setError("会社名は必須です。");
        return;
      }
      if (values.sessionTimeoutMin < 5 || values.sessionTimeoutMin > 240) {
        setError("セッション有効期限は 5〜240 分で設定してください。");
        return;
      }

      if (!comInfo) {
        setError("comInfo が取得できません。");
        return;
      }

      const res = await settingsService.update({
        comInfo,
        ...values,
      });
      const nextValues = res.settings;

      await mutate({ settings: nextValues }, false);

      setValues(nextValues);
      setSavedSnapshot(nextValues);
      setIsSavedSnackbarOpen(true);
    } catch (e) {
      setError(
        `設定の保存に失敗しました: ${
          e instanceof Error ? e.message : String(e)
        }`,
      );
    } finally {
      setIsSaving(false);
    }
  }, [comInfo, mutate, values]);

  const closeSavedSnackbar = useCallback(() => {
    setIsSavedSnackbarOpen(false);
  }, []);

  return {
    values,
    isLoading: isAdminLoading || isLoading,
    loadError: adminError ?? fetchError,
    isDirty,
    isSaving,
    isSavedSnackbarOpen,
    error,
    updateValue,
    reset,
    restoreDefaults,
    save,
    closeSavedSnackbar,
  };
};
