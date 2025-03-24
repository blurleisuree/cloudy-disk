import { create } from "zustand";

const useStore = create((set) => ({
  isOpen: false,

  toggleModal: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },
}));

export default useStore;
