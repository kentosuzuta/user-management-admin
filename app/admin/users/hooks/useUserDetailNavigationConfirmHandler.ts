"use client";

import type { UserOutDto } from "@/app/services/users/dto";
import type { GridRowParams } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export type UseUserDetailNavigationConfirmResult = {
  confirmUser: UserOutDto | null;
  handleRowClick: (params: GridRowParams<UserOutDto>) => void;
  handleCloseConfirmDialog: () => void;
  handleConfirmGoDetail: (user: UserOutDto) => void;
};

export const useUserDetailNavigationConfirmHandler =
  (): UseUserDetailNavigationConfirmResult => {
    const router = useRouter();
    const [confirmUser, setConfirmUser] = useState<UserOutDto | null>(null);

    const handleRowClick = useCallback((params: GridRowParams<UserOutDto>) => {
      setConfirmUser(params.row);
    }, []);

    const handleCloseConfirmDialog = useCallback(() => {
      setConfirmUser(null);
    }, []);

    const handleConfirmGoDetail = useCallback(
      (user: UserOutDto) => {
        setConfirmUser(null);
        router.push(`/admin/users/${user.id}`);
      },
      [router],
    );

    return {
      confirmUser,
      handleRowClick,
      handleCloseConfirmDialog,
      handleConfirmGoDetail,
    };
  };
