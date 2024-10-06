import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const roomStore = create(
  persist(
    (set) => ({
      room: null,
      setRoom: (room) =>
        set((state) => ({
          ...state,
          room: room,
        })),
      resetRoom: () => set({ room: null }),
    }),
    {
      name: "room-store-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default roomStore;
