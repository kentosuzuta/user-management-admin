import type { UsersListInDto, UsersListResponseOutDto } from "./dto";

export const usersService = {
  list: async (inDto: UsersListInDto): Promise<UsersListResponseOutDto> => {
    const params = new URLSearchParams();
    if (inDto.query) params.set("q", inDto.query);
    if (inDto.page != null) params.set("page", String(inDto.page));
    if (inDto.pageSize != null) params.set("pageSize", String(inDto.pageSize));

    const res = await fetch(`/api/users?${params.toString()}`);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    return (await res.json()) as UsersListResponseOutDto;
  },
};
