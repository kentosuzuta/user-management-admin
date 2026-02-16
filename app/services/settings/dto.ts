import type { UserRoleOutDto } from "../users/dto";

export type SettingsOutDto = {
  companyName: string;
  timezone: string;
  defaultRole: UserRoleOutDto;
  sessionTimeoutMin: number;
  requireTwoFactor: boolean;
  notifyUserCreated: boolean;
  notifyUserUpdated: boolean;
  notifyUserDeleted: boolean;
};

export type SettingsGetInDto = {
  comInfo: string;
};

export type SettingsGetResponseOutDto = {
  settings: SettingsOutDto;
};

export type SettingsUpdateInDto = {
  comInfo: string;
  companyName: string;
  timezone: string;
  defaultRole: UserRoleOutDto;
  sessionTimeoutMin: number;
  requireTwoFactor: boolean;
  notifyUserCreated: boolean;
  notifyUserUpdated: boolean;
  notifyUserDeleted: boolean;
};

export type SettingsUpdateResponseOutDto = {
  settings: SettingsOutDto;
};
