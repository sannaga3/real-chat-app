import { rooms } from "./roomController.js";

export const sendMessage = (io, { roomName, nickname, content }) => {
  let room = rooms[roomName];
  if (!room) return;

  const addedMessage = room.sendMessage(
    nickname,
    content,
    room.messages.length
  );

  io.to(roomName).emit("receiveMessage", {
    receiveMessage: addedMessage,
    message: null,
  });
};
