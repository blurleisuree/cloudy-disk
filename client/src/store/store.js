import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useFormStore = create(
  devtools((set) => ({
    password: "",
    email: "",
    setPassword: (password) => set({ password }),
    setEmail: (email) => set({ email }),
    resetForm: () => set({ password: "", email: "" }),
  }))
);