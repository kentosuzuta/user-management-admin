import type {
  UsersDeleteInDto,
  UsersGetInDto,
  UsersGetResponseOutDto,
  UsersListInDto,
  UsersListResponseOutDto,
  UsersUpdateInDto,
  UsersUpdateResponseOutDto,
} from "./dto";

export const usersService = {
  list: async (inDto: UsersListInDto): Promise<UsersListResponseOutDto> => {
    const params = new URLSearchParams();
    params.set("comInfo", inDto.comInfo);

    const res = await fetch(`/api/users?${params.toString()}`);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    return (await res.json()) as UsersListResponseOutDto;
  },

  get: async (inDto: UsersGetInDto): Promise<UsersGetResponseOutDto> => {
    const res = await fetch(`/api/users/${encodeURIComponent(inDto.id)}`);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    return (await res.json()) as UsersGetResponseOutDto;
  },

  delete: async (inDto: UsersDeleteInDto): Promise<void> => {
    const res = await fetch(`/api/users/${encodeURIComponent(inDto.id)}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  },

  update: async (
    inDto: UsersUpdateInDto,
  ): Promise<UsersUpdateResponseOutDto> => {
    const res = await fetch(`/api/users/${encodeURIComponent(inDto.id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: inDto.name,
        email: inDto.email,
        role: inDto.role,
        status: inDto.status,
      }),
    });

    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    return (await res.json()) as UsersUpdateResponseOutDto;
  },
};
