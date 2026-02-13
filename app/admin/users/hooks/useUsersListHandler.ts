"use client";

import { useAdminContext } from "@/app/admin/context/AdminContext";
import type { UsersListResponseOutDto } from "@/app/services/users/dto";
import { usersService } from "@/app/services/users/service";
import useSWR from "swr";

export const useUsersListHandler = () => {
  const {
    comInfo,
    isLoading: isAdminLoading,
    error: adminError,
  } = useAdminContext();

  const { data, isLoading, error } = useSWR<UsersListResponseOutDto>(
    comInfo ? ["users", comInfo] : null,
    () => usersService.list({ comInfo: String(comInfo) }),
    { revalidateOnFocus: false },
  );

  return {
    rows: data?.users ?? [],
    isLoading: isAdminLoading || isLoading,
    error: adminError ?? error,
  };
};
