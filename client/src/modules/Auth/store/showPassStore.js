import { create } from "zustand";

const useShowPassStore = create((set) => ({
  isShowPass: false,

  toggleIsShowPass: () => {
    set((state) => ({ isShowPass: !state.isShowPass }));
  },
}));

export default useShowPassStore;
