"use client";

import { authService } from "@/app/services/auth/service";
import { loginNotice } from "@/app/utils/auth/loginNotice";
import { tokenStorage } from "@/app/utils/auth/tokenStorage";
import { useCallback, useState } from "react";

export const useLoginHandler = () => {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    email.trim() !== "" && password.trim() !== "" && !isSubmitting;

  const login = useCallback(async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      const res = await authService.login({
        email: email.trim(),
        password: password.trim(),
      });

      tokenStorage.set(res.accessToken);
      loginNotice.set();
      return true;
    } catch (e) {
      setError("ログインに失敗しました（メール/パスワードを確認してください）");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [email, password]);

  return {
    email,
    password,
    setEmail,
    setPassword,
    isSubmitting,
    error,
    canSubmit,
    login,
  };
};
