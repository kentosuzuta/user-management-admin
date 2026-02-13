export type AuthLoginInDto = {
  email: string;
  password: string;
};

export type AuthLoginResponseOutDto = {
  accessToken: string;
};

export type AuthLogoutResponseOutDto = void;
