"use client";

import { theme } from "@/theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { MswProvider } from "./MswProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MswProvider>{children}</MswProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
