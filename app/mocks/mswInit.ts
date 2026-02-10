export const initMsw = async () => {
  if (typeof window === "undefined") return;

  const { worker } = await import("./browser");

  await worker.start({
    onUnhandledRequest: "bypass",
  });
};
