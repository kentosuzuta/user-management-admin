export const formatDateYmd = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(
    d.getDate(),
  ).padStart(2, "0")}`;
};

export const normalize = (value: string) =>
  value.replace(/\u3000/g, " ").toLowerCase();

export const splitTokens = (value: string) => {
  return normalize(value).trim().split(/\s+/).filter(Boolean);
};
