import type { UserRoleOutDto, UserStatusOutDto } from "./dto";

export const USER_ROLE_OPTIONS: UserRoleOutDto[] = [
  "admin",
  "member",
  "viewer",
];

export const USER_STATUS_OPTIONS: UserStatusOutDto[] = [
  "active",
  "invited",
  "suspended",
];
