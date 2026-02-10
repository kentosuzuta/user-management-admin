export type UsersListInDto = {
  query?: string;
  page?: number;
  pageSize?: number;
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
