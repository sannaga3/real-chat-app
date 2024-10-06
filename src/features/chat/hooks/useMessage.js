import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authStore from "../../../stores/authStore";
import chatStore from "../../../stores/chatStore";
import roomStore from "../../../stores/roomStore";
import socketStore from "../../../stores/socketStore";

const useMessage = () => {
  const navigate = useNavigate();
  const room = roomStore((state) => state.room);
  const socket = socketStore((state) => state.socket);
  const loginUser = authStore((state) => state.loginUser);
  const { setMessage } = chatStore();

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (data) => {
        if (data.receiveMessage) {
          console.log("updated newMessage");
          setMessage(data.receiveMessage);
        }
      });
      return () => socket.off("receiveMessage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const sendMessage = (content) => {
    if (socket && room && loginUser) {
      socket.emit("sendMessage", {
        roomName: room.name,
        nickname: loginUser.nickname,
        content: content,
      });
    } else {
      console.error("Room or user not found");
      navigate("/lobby");
    }
  };

  return { sendMessage };
};

export default useMessage;
