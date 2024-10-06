import { useEffect } from "react";
import authStore from "../../../stores/authStore";
import chatStore from "../../../stores/chatStore";
import flashMessageStore from "../../../stores/flashMessageStore";
import roomStore from "../../../stores/roomStore";
import socketStore from "../../../stores/socketStore";
import useRoom from "../../room/hooks/useRoom";

const useSocket = () => {
  const { socket, createSocket, reConnectSocket } = socketStore();
  const { loginUser, setLoginUser } = authStore();
  const { setMessage } = chatStore();
  const { room, setRoom } = roomStore();
  const { setFlashMessage } = flashMessageStore();
  const { reJoinRoom } = useRoom();

  useEffect(() => {
    if (socket) {
      socket.on("eventError", (data) => {
        if (data?.flashMessage) setFlashMessage(data.flashMessage);
      });
      return () => socket.off("eventError");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const initializeSocket = async () => {
    await createSocket();
  };

  const reConnect = async () => {
    const newSocket = await reConnectSocket();

    // 再接続時にリスナー再登録;
    newSocket.on("connect", () => {
      newSocket.on("receiveMessage", (data) => {
        if (data.receiveMessage) {
          console.log("updated newMessage");
          setMessage(data.receiveMessage);
        }
      });
      newSocket.on("updatedRoom", (data) => {
        if (data.updatedRoom) {
          console.log("updated room");
          setRoom(data.updatedRoom);
          setFlashMessage(data.flashMessage);
        } else {
          setRoom(null);
          setLoginUser(null);
        }
      });
    });

    reJoinRoom(newSocket, loginUser.nickname, room.name, room.password);
  };

  return { initializeSocket, reConnect };
};

export default useSocket;
