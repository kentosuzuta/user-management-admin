export type AdminIconKey = "dashboard" | "users" | "settings";

export type NavItem = {
  href: string;
  label: string;
  icon: AdminIconKey;
};

export const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/users", label: "Users", icon: "users" },
  { href: "/admin/settings", label: "Settings", icon: "settings" },
] as const;

export const getPageTitle = (pathname: string): string => {
  const matched = NAV_ITEMS.filter((item) =>
    item.href === "/admin"
      ? pathname === "/admin"
      : pathname.startsWith(item.href),
  ).sort((a, b) => b.href.length - a.href.length)[0];

  return matched?.label ?? "Admin";
};
