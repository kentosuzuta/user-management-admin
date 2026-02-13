"use client";

import type { UserOutDto } from "@/app/services/users/dto";
import { usersService } from "@/app/services/users/service";
import useSWR from "swr";

export const useUserDetailHandler = (userId: string) => {
  const { data, isLoading, error, mutate } = useSWR<UserOutDto>(
    ["user", userId],
    () => usersService.get({ id: userId }),
    { revalidateOnFocus: false },
  );

  return {
    user: data ?? null,
    isLoading,
    error,
    mutate,
  };
};
