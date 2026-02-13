"use client";

import { createContext, useContext } from "react";

export type AdminContextValue = {
  comInfo: string | null;
  isLoading: boolean;
  error: unknown;
};

export const AdminContext = createContext<AdminContextValue | null>(null);

export const useAdminContext = (): AdminContextValue => {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("useAdminContext must be used within AdminProvider");
  }
  return ctx;
};
