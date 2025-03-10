import { create } from "zustand";

const useStore = create((set) => ({
    codeIsResend: false,

    setCodeIsResend: (value) => {
        set({codeIsResend: value})
    }
}));

export default useStore