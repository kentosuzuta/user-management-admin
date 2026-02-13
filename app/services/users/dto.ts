export type UsersListInDto = {
  comInfo: string;
};

export type UserStatusOutDto = "active" | "invited" | "suspended";
export type UserRoleOutDto = "admin" | "member" | "viewer";

export type UserOutDto = {
  id: string;
  name: string;
  email: string;
  role: UserRoleOutDto;
  status: UserStatusOutDto;
  createdAt: string;
};

export type UsersListResponseOutDto = {
  users: UserOutDto[];
};

export type UsersGetInDto = {
  id: string;
};

export type UsersGetResponseOutDto = UserOutDto;

export type UsersDeleteInDto = {
  id: string;
};

export type UsersUpdateInDto = {
  id: string;
  name: string;
  email: string;
  role: UserRoleOutDto;
  status: UserStatusOutDto;
};

export type UsersUpdateResponseOutDto = UserOutDto;
