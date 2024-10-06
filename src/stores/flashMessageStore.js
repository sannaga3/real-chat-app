import { create } from "zustand";

const flashMessageStore = create((set) => ({
  flashMessage: {
    type: null,
    message: null,
  },
  setFlashMessage: (flashMessage) => set({ flashMessage: flashMessage }),
  resetFlashMessage: () =>
    set({
      flashMessage: {
        type: null,
        message: null,
      },
    }),
}));

export default flashMessageStore;
