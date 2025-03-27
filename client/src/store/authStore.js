import { create } from "zustand";
import { API_URL } from "../apiConfig";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: true,
  isAuth: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const responce = await fetch(`${API_URL}api/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await responce.json();
      if (!responce.ok) {
        throw new Error(data.message || "Login failed");
      }

      set({
        user: { userId: data.userId, email, avatar: data.avatar },
        token: data.token,
        isAuth: true,
        loading: false,
      });

      localStorage.setItem("token", data.token);
    } catch (e) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  registration: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}api/auth/registration`, {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      set({ loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  logout: () => {
    set({ user: null, token: null, isAuth: false, error: null });
    localStorage.removeItem("token");
  },

  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ isAuth: false, loading: false });
      return;
    }

    set({ loading: true });
    try {
      const response = await fetch(`${API_URL}api/auth/me`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Auth check failed");
      }

      set({
        user: { userId: data.userId, email: data.email, avatar: data.avatar },
        token,
        isAuth: true,
        loading: false,
      });
    } catch (e) {
      set({ error: e.message, loading: false, isAuth: false });
      localStorage.removeItem("token");
      throw e;
    }
  },

  verify: async (code, email) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}api/auth/verify`, {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ code, email }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Verification failed");
      }

      set({
        user: { userId: data.userId, email },
        token: data.token,
        isAuth: true,
        loading: false,
      });

      localStorage.setItem("token", data.token);
    } catch (e) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  resendCode: async (email) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}api/auth/resend-code`, {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Resend Failed");
      }

      set({ loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  forgotPassword: async (email) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Password reset failed");
      }

      set({ loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  resetPassword: async (email, resetCode, newPassword) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ email, resetCode, newPassword }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Password reset failed");
      }

      set({ loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },
}));

export default useAuthStore;
