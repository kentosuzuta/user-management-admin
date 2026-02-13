"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { tokenStorage } from "../utils/auth/tokenStorage";
import { LoginContent } from "./LoginContent";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (tokenStorage.get()) router.replace("/admin");
  }, [router]);

  return <LoginContent />;
}
