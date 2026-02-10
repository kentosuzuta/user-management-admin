import { UserStatusOutDto } from "@/app/services/users/dto";

export const getUserStatusChip = (status: UserStatusOutDto) => {
  const map: Record<
    UserStatusOutDto,
    { label: string; color: "default" | "success" | "warning" | "error" }
  > = {
    active: { label: "Active", color: "success" },
    invited: { label: "Invited", color: "warning" },
    suspended: { label: "Suspended", color: "error" },
  };

  return map[status];
};
