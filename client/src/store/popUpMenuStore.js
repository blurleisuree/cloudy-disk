import { create } from "zustand";

const useStore = create((set) => ({
  anchorEl: null,
  menuItems: [],
  open: (anchorEl, items) => set({ anchorEl, menuItems: items }),
  close: () => set({ anchorEl: null, menuItems: [] }),
}));

export default useStore;
