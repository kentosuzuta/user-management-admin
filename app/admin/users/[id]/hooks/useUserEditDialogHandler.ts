"use client";

import type { UserOutDto } from "@/app/services/users/dto";
import { usersService } from "@/app/services/users/service";
import { useCallback, useMemo, useState } from "react";
import type { UserEditFormValues } from "../components/UserEditDialog";

export type ChangedFields = {
  name?: boolean;
  email?: boolean;
  role?: boolean;
  status?: boolean;
};

export type UseUserEditDialogParams = {
  user: UserOutDto;
  onSaved?: () => void | Promise<void>;
};

export const useUserEditDialogHandler = ({
  user,
  onSaved,
}: UseUserEditDialogParams) => {
  const initialValues = useMemo<UserEditFormValues>(
    () => ({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    }),
    [user],
  );

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [values, setValues] = useState<UserEditFormValues>(initialValues);
  const [changedFields, setChangedFields] = useState<ChangedFields>({});
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const closeSnackbar = useCallback(() => {
    setIsSnackbarOpen(false);
  }, []);

  const openEdit = useCallback(() => {
    setValues(initialValues);
    setIsEditOpen(true);
  }, [initialValues]);

  const closeEdit = useCallback(() => {
    if (isSaving) return;
    setIsEditOpen(false);
  }, [isSaving]);

  const changeValue = useCallback(
    <K extends keyof UserEditFormValues>(
      key: K,
      value: UserEditFormValues[K],
    ) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const confirmEdit = useCallback(async () => {
    try {
      setIsSaving(true);

      const next = {
        name: values.name.trim(),
        email: values.email.trim(),
        role: values.role,
        status: values.status,
      };

      await usersService.update({
        id: user.id,
        ...next,
      });

      setChangedFields({
        name: user.name !== next.name,
        email: user.email !== next.email,
        role: user.role !== next.role,
        status: user.status !== next.status,
      });

      setIsSnackbarOpen(true);
      setIsEditOpen(false);
      await onSaved?.();
    } finally {
      setIsSaving(false);
    }
  }, [onSaved, user, values]);

  return {
    isEditOpen,
    isSaving,
    values,
    changedFields,
    isSnackbarOpen,
    closeSnackbar,
    openEdit,
    closeEdit,
    changeValue,
    confirmEdit,
  };
};
