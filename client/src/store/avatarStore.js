import { create } from "zustand";
import { API_URL } from "../apiConfig";

const useStore = create((set) => ({
  // avatarSrc: undefined,
  loading: false,
  error: null,
  isHover: false,

  toggleIsHover: () => {
    set((state) => ({ isHover: !state.isHover }));
  },

  uploadAvatar: async (file, token) => {
    set({ loading: true, error: null });

    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    if (!token) {
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}api/user/avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message|| "Uploading avatar failed");
      }
      const data = await response.json();

      set({
        avatarSrc: data.avatar,
      });
    } catch (e) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },
}));

export default useStore;
