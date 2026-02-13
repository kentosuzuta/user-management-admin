"use client";

import { useEffect, useState } from "react";
import { initMsw } from "../mocks/mswInit";

export const MswProvider = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = async () => {
      if (process.env.NODE_ENV === "development") {
        await initMsw();
      }
      setReady(true);
    };

    start();
  }, []);

  if (!ready) return null;

  return <>{children}</>;
};
