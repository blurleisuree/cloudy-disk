import { create } from "zustand";

const useNewCode = create((set) => ({
  codeIsResend: false,
  error: null,

  getNewCode: async (resendFunc, email) => {
    try {
      await resendFunc(email);
      set({ codeIsResend: true });
    } catch (e) {
      set({ error: e });
      console.log(e);
    }
  },
  
  disableCodeIsResend: () => {
    set({ codeIsResend: false });
  },
}));

export default useNewCode;
