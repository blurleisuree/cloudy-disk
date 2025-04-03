// src/hooks/useAuthCheck.js
import { useEffect } from "react";
import useAuthStore from "../store/authStore";

const useAuthCheck = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth();
      } catch (e) {
        console.error("Ошибка проверки авторизации:", e);
      }
    };
    verifyAuth();
  }, [checkAuth]);

  return { loading };
};

export default useAuthCheck;
