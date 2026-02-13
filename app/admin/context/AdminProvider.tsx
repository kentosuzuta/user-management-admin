"use client";

import useSWR from "swr";
import { AdminContext } from "./AdminContext";

type AdminContextResponse = {
  comInfo: string;
};

export type AdminProviderProps = {
  children: React.ReactNode;
};

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const { data, isLoading, error } = useSWR<AdminContextResponse>(
    ["admin-context"],
    async () => {
      const res = await fetch("/api/admin/context");
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return (await res.json()) as AdminContextResponse;
    },
    { revalidateOnFocus: false },
  );

  return (
    <AdminContext.Provider
      value={{
        comInfo: data?.comInfo ?? null,
        isLoading,
        error,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
