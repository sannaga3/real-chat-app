import { sendMessage } from "./controllers/messageController.js";
import {
  createRoom,
  getRoomNameList,
  joinRoom,
  leaveRoom,
  reJoinRoom,
} from "./controllers/roomController.js";

const socketRoutes = (io) => {
  io.on("connection", (socket) => {
    console.log("created new connection", socket.id);

    // room
    socket.on("createRoom", (data) => createRoom(socket, data));
    socket.on("joinRoom", (data) => joinRoom(socket, data));
    socket.on("reJoinRoom", (data) => reJoinRoom(socket, data));
    socket.on("leaveRoom", (data) => leaveRoom(socket, io, data));
    socket.on("getRoomNameList", () => getRoomNameList(socket));

    // message
    socket.on("sendMessage", (data) => sendMessage(io, data));

    socket.on("disconnect", () => {
      console.log("user disconnected:", socket.id);
    });
  });
};

export default socketRoutes;
