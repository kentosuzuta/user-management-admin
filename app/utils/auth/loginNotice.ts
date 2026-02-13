"use client";

const LOGIN_NOTICE_KEY = "demo_login_notice";

export const loginNotice = {
  set: () => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(LOGIN_NOTICE_KEY, "1");
  },
  consume: (): boolean => {
    if (typeof window === "undefined") return false;

    const v = window.sessionStorage.getItem(LOGIN_NOTICE_KEY);
    if (!v) return false;

    window.sessionStorage.removeItem(LOGIN_NOTICE_KEY);
    return true;
  },
};
