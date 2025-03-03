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
}));

export default useAuthStore;
