import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authStore from "../../../stores/authStore";
import chatStore from "../../../stores/chatStore";
import flashMessageStore from "../../../stores/flashMessageStore";
import roomStore from "../../../stores/roomStore";
import socketStore from "../../../stores/socketStore";

const useRoom = () => {
  const navigate = useNavigate();
  const socket = socketStore((state) => state.socket);
  const { room, setRoom, resetRoom } = roomStore();
  const { loginUser, setLoginUser, resetLoginUser } = authStore();
  const { resetMessages } = chatStore();
  const { setFlashMessage } = flashMessageStore();

  useEffect(() => {
    if (socket) {
      socket.on("updatedRoom", (data) => {
        if (data.updatedRoom) {
          console.log("updated room");
          setRoom(data.updatedRoom);
          setFlashMessage(data.flashMessage);
        } else {
          setRoom(null);
          setLoginUser(null);
          setFlashMessage(data.flashMessage);
        }
      });

      return () => {
        socket.off("updatedRoom");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const createRoom = (nickname, roomName, roomPassword) => {
    socket.emit("createRoom", {
      nickname,
      roomName,
      roomPassword,
    });

    socket.once("roomCreated", (data) => {
      console.log("successfully created room");
      setRoom(data.room);
      setLoginUser({ id: socket.id, nickname: nickname });
      setFlashMessage(data.flashMessage);
      navigate("/chat_room");
    });
  };

  const joinRoom = (nickname, roomName, roomPassword) => {
    socket.emit("joinRoom", {
      nickname,
      roomName,
      roomPassword,
    });

    socket.once("joinedRoom", (data) => {
      console.log("successfully joined room");
      setRoom(data.room);
      setLoginUser({ id: socket.id, nickname });
      setFlashMessage(data.flashMessage);

      navigate("/chat_room");
    });
  };

  const reJoinRoom = (newSocket, nickname, roomName, roomPassword) => {
    newSocket.emit("reJoinRoom", {
      nickname,
      roomName,
      roomPassword,
    });

    newSocket.once("reJoinedRoom", (data) => {
      console.log("successfully rejoined room");
      setRoom(data.updatedRoom);
      setLoginUser({ id: newSocket.id, nickname });
      setFlashMessage(data.flashMessage);
    });
  };

  const leaveRoom = () => {
    if (room) {
      socket.emit("leaveRoom", {
        roomName: room.name,
        nickname: loginUser.nickname,
      });
    }

    socket.once("leftRoom", (data) => {
      console.log("successfully left room");
      setFlashMessage(data.flashMessage);
    });

    navigate(`/lobby`);
    resetRoom();
    resetLoginUser();
    resetMessages();
  };

  return { createRoom, joinRoom, reJoinRoom, leaveRoom };
};

export default useRoom;
