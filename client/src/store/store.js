import { create } from "zustand";

export const useFormStore = create((set) => ({
  password: "",
  email: "",
  setPassword: (password) => set({ password }),
  setEmail: (email) => set({ email }),
  resetForm: () => set({ password: "", email: "" }),
}));
