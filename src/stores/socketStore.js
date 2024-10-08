import io from "socket.io-client";
import { create } from "zustand";

const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";

const createInstance = () => {
  return io(serverUrl, {
    withCredentials: true,
    reconnection: true, // 自動再接続有効
    reconnectionAttempts: 5, // 再接続の試行回数
    reconnectionDelay: 1000, // 再接続の間
  });
};

const socketStore = create((set) => ({
  socket: null,
  createSocket: () => {
    new Promise((resolve) => {
      const socket = createInstance();
      set(() => ({ socket: socket }));
      resolve();
    });
  },
  reConnectSocket() {
    return new Promise((resolve) => {
      const socket = createInstance();
      set(() => ({ socket: socket }));
      resolve(socket);
    });
  },
}));

export default socketStore;
