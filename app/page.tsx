"use client";

import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { tokenStorage } from "./utils/auth/tokenStorage";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = tokenStorage.get();
    if (token) {
      router.replace("/admin");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <Box sx={{ minHeight: "100dvh", display: "grid", placeItems: "center" }}>
      <CircularProgress />
    </Box>
  );
}
