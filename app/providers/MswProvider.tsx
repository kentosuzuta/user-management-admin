"use client";

import { useEffect } from "react";
import { initMsw } from "../mocks/mswInit";

export const MswProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      void initMsw();
    }
  }, []);

  return <>{children}</>;
};
