import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuth: false,
  error: null,
  loading: false,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const responce = await fetch("http://localhost:5000/api/auth/login", {
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
        user: { userId: data.userId, email },
        token: data.token,
        isAuth: true,
        loading: false,
      });

      localStorage.setItem("token", data.token);
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  register: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/registration",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      set({ loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  logout: () => {
    set({ user: null, token: null, isAuth: false, error: null });
    localStorage.removeItem("token");
  },

  checkAuth: async () => {
    const token = localStorage.getItem("token");
    console.log("checkWork");
    if (!token) {
      set({ isAuth: false });
      return;
    }

    set({ loading: true });
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Auth check failed");
      }

      set({
        user: { userId: data.userId, email: data.email },
        token,
        isAuth: true,
        loading: false,
      });
    } catch (e) {
      set({ error: e.message, loading: false, isAuth: false });
      localStorage.removeItem("token");
    }
  },
}));

export default useAuthStore;
