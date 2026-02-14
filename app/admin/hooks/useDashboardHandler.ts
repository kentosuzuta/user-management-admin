"use client";

import type { UserOutDto } from "@/app/services/users/dto";
import { useMemo } from "react";

export const useDashboardHandler = (users: UserOutDto[]) => {
  const total = users.length;

  const statusCount = useMemo(() => {
    return {
      active: users.filter((u) => u.status === "active").length,
      invited: users.filter((u) => u.status === "invited").length,
      suspended: users.filter((u) => u.status === "suspended").length,
    };
  }, [users]);

  const roleCount = useMemo(() => {
    return {
      admin: users.filter((u) => u.role === "admin").length,
      member: users.filter((u) => u.role === "member").length,
      viewer: users.filter((u) => u.role === "viewer").length,
    };
  }, [users]);

  return {
    total,
    statusCount,
    roleCount,
  };
};
