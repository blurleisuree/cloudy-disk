import { create } from "zustand";

const useShowPassStore = create((set) => ({
  isShowPass: false,

  toggleIsShowPass: () => {
    set((state) => ({ isShowPass: !state.isShowPass }));
  },

  resetIsShowPass: () => set({ isShowPass: false }),
}));

export default useShowPassStore;
