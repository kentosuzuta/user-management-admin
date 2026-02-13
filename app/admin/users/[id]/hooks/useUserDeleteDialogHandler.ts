"use client";

import { usersService } from "@/app/services/users/service";
import { useCallback, useState } from "react";

export type UseUserDeleteDialogParams = {
  userId: string;
  onDeleted: () => void;
};

export const useUserDeleteDialogHandler = ({
  userId,
  onDeleted,
}: UseUserDeleteDialogParams) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const openDelete = useCallback(() => {
    setError(null);
    setIsDeleteOpen(true);
  }, []);

  const closeDelete = useCallback(() => {
    if (isDeleting) return;
    setIsDeleteOpen(false);
  }, [isDeleting]);

  const confirmDelete = useCallback(async () => {
    try {
      setIsDeleting(true);
      setError(null);

      await usersService.delete({ id: userId });

      setIsDeleteOpen(false);
      onDeleted();
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setIsDeleting(false);
    }
  }, [userId, onDeleted]);

  return {
    isDeleteOpen,
    isDeleting,
    error,
    openDelete,
    closeDelete,
    confirmDelete,
  };
};
