import type {
  AuthLoginInDto,
  AuthLoginResponseOutDto,
  AuthLogoutResponseOutDto,
} from "./dto";

export const authService = {
  login: async (inDto: AuthLoginInDto): Promise<AuthLoginResponseOutDto> => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inDto),
    });

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    return (await res.json()) as AuthLoginResponseOutDto;
  },

  logout: async (): Promise<AuthLogoutResponseOutDto> => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  },
};
