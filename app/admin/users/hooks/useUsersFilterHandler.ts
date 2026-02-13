import type {
  UserOutDto,
  UserRoleOutDto,
  UserStatusOutDto,
} from "@/app/services/users/dto";
import { normalize, splitTokens } from "@/app/utils/utils";
import type { ChangeEvent } from "react";
import { useCallback, useMemo, useState } from "react";

export type UseUsersFilterResult = {
  inputValue: string;
  role: UserRoleOutDto | "";
  status: UserStatusOutDto | "";
  filteredRows: UserOutDto[];
  filteredCount: number;
  totalCount: number;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
  handleRoleChange: (value: UserRoleOutDto | "") => void;
  handleStatusChange: (value: UserStatusOutDto | "") => void;
};

export const useUsersFilterHandler = (
  rows: UserOutDto[],
): UseUsersFilterResult => {
  const [inputValue, setInputValue] = useState("");
  const [role, setRole] = useState<UserRoleOutDto | "">("");
  const [status, setStatus] = useState<UserStatusOutDto | "">("");

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setInputValue("");
    setRole("");
    setStatus("");
  }, []);

  const handleRoleChange = useCallback((value: UserRoleOutDto | "") => {
    setRole(value);
  }, []);

  const handleStatusChange = useCallback((value: UserStatusOutDto | "") => {
    setStatus(value);
  }, []);

  const filteredRows = useMemo<UserOutDto[]>(() => {
    const tokens = splitTokens(inputValue);

    return rows.filter((u) => {
      if (role && u.role !== role) return false;
      if (status && u.status !== status) return false;

      if (tokens.length === 0) return true;

      const target = normalize([u.name, u.email, u.role, u.status].join(" "));
      return tokens.every((t) => target.includes(t));
    });
  }, [rows, inputValue, role, status]);

  return {
    inputValue,
    role,
    status,
    filteredRows,
    filteredCount: filteredRows.length,
    totalCount: rows.length,
    handleChange,
    handleClear,
    handleRoleChange,
    handleStatusChange,
  };
};
