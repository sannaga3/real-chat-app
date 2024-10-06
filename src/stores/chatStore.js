import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const chatStore = create(
  persist(
    (set, get) => ({
      messages: [],
      setMessage: (message) => {
        if (message)
          set(() => ({
            messages: [...get().messages, message],
          }));
      },
      setMessages: (messages) =>
        set(() => ({
          messages: messages,
        })),
      resetMessages: () => set({ messages: [] }),
    }),
    {
      name: "chat-store-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default chatStore;
