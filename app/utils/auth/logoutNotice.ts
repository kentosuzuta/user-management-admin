"use client";

const LOGOUT_NOTICE_KEY = "demo_logout_notice";

export const logoutNotice = {
  set: () => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(LOGOUT_NOTICE_KEY, "1");
  },
  consume: (): boolean => {
    if (typeof window === "undefined") return false;

    const v = window.sessionStorage.getItem(LOGOUT_NOTICE_KEY);
    if (!v) return false;

    window.sessionStorage.removeItem(LOGOUT_NOTICE_KEY);
    return true;
  },
};
