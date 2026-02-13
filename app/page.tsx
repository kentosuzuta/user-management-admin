"use client";

import { Box, CircularProgress } from "@mui/material";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { tokenStorage } from "./utils/auth/tokenStorage";

export default function Home() {
  useEffect(() => {
    const token = tokenStorage.get();
    if (token) {
      redirect("/admin");
    } else {
      redirect("/login");
    }
  }, []);

  return (
    <Box sx={{ minHeight: "100dvh", display: "grid", placeItems: "center" }}>
      <CircularProgress />
    </Box>
  );
}
