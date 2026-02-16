import type {
  SettingsGetInDto,
  SettingsGetResponseOutDto,
  SettingsUpdateInDto,
  SettingsUpdateResponseOutDto,
} from "./dto";

export const settingsService = {
  get: async (
    inDto: SettingsGetInDto,
  ): Promise<SettingsGetResponseOutDto> => {
    const params = new URLSearchParams();
    params.set("comInfo", inDto.comInfo);

    const res = await fetch(`/api/settings?${params.toString()}`);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    return (await res.json()) as SettingsGetResponseOutDto;
  },

  update: async (
    inDto: SettingsUpdateInDto,
  ): Promise<SettingsUpdateResponseOutDto> => {
    const params = new URLSearchParams();
    params.set("comInfo", inDto.comInfo);

    const res = await fetch(`/api/settings?${params.toString()}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyName: inDto.companyName,
        timezone: inDto.timezone,
        defaultRole: inDto.defaultRole,
        sessionTimeoutMin: inDto.sessionTimeoutMin,
        requireTwoFactor: inDto.requireTwoFactor,
        notifyUserCreated: inDto.notifyUserCreated,
        notifyUserUpdated: inDto.notifyUserUpdated,
        notifyUserDeleted: inDto.notifyUserDeleted,
      }),
    });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    return (await res.json()) as SettingsUpdateResponseOutDto;
  },
};
