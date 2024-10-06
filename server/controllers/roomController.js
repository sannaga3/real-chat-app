import { Room, createValidator, joinValidator } from "../models/room.js";

export const rooms = {};

export const createRoom = (socket, { nickname, roomName, roomPassword }) => {
  // バリデーションチェック
  const [isValid, errorMessage] = createValidator(
    roomName,
    roomPassword,
    nickname
  );
  if (!isValid) {
    console.error(`createRoomError: ${errorMessage}`);
    return socket.emit("eventError", {
      flashMessage: {
        type: "error",
        message: errorMessage,
      },
    });
  }

  // ルーム作成
  const room = new Room(socket.id, roomName, roomPassword, nickname);
  // 通信レベルでの参加、クライアントがルームに参加できるようにする
  socket.join(roomName);
  // ルームリストに追加
  rooms[roomName] = room;
  // ルームに参加
  room.joinMember(socket.id, nickname);

  // フロント側にルーム情報を渡す
  socket.emit("roomCreated", {
    room: room,
    flashMessage: {
      type: "success",
      message: `ルーム「${roomName}」を作成しました。`,
    },
  });
};

export const joinRoom = (socket, { nickname, roomName, roomPassword }) => {
  const [isValid, errorMessage] = joinValidator(
    roomName,
    roomPassword,
    nickname
  );
  if (!isValid) {
    console.error(`joinRoomError: ${errorMessage}`);
    return socket.emit("eventError", {
      flashMessage: {
        type: "error",
        message: errorMessage,
      },
    });
  }

  const room = rooms[roomName];
  socket.join(roomName);
  room.joinMember(socket.id, nickname);
  rooms[roomName] = room;

  socket.emit("joinedRoom", {
    room: room,
    flashMessage: {
      type: "success",
      message: `ルーム「${roomName}」に参加しました。`,
    },
  });
  socket.to(roomName).emit("updatedRoom", {
    updatedRoom: room,
    flashMessage: {
      type: "success",
      message: `${nickname}さんが参加しました。`,
    },
  });
};

export const reJoinRoom = (socket, { nickname, roomName, roomPassword }) => {
  if (!roomName || !roomPassword || !nickname) {
    return socket.emit("eventError", {
      flashMessage: {
        type: "error",
        message: "再接続に失敗しました",
      },
    });
  }

  const room = rooms[roomName];
  room.updateSocketId(socket.id);
  room.leaveMember(room, nickname);
  room.joinMember(socket.id, nickname, true);
  socket.join(roomName);
  rooms[roomName] = room;

  socket.emit("reJoinedRoom", {
    updatedRoom: room,
    flashMessage: {
      type: "success",
      message: `ルーム「${roomName}」に再接続しました。`,
    },
  });
  // 自分以外に通知
  socket.to(roomName).emit("updatedRoom", {
    updatedRoom: room,
    flashMessage: {
      type: "success",
      message: `${nickname}さんが復帰しました。`,
    },
  });
};

// ルーム名リスト取得
export const getRoomNameList = (socket) => {
  const roomNameList = Object.keys(rooms);
  socket.emit("getRoomNameList", roomNameList);
};

// 退室
export const leaveRoom = (socket, io, { roomName, nickname }) => {
  let room = rooms[roomName];
  if (!room) return;

  socket.leave(roomName);
  console.log(`${nickname} left room`);

  // 退室する最後のメンバーの場合はルームも削除
  if (room.members.length === 1) {
    io.of("/").in(roomName).socketsLeave(roomName);
    delete rooms[roomName];
    console.log(`room 「${roomName}」 was deleted`);

    socket.emit("updatedRoom", {
      updatedRoom: null,
      flashMessage: {
        type: "success",
        message: `退室したルーム「${roomName}」は削除されました。`,
      },
    });
  } else {
    room.leaveMember(room, nickname);

    socket.emit("leftRoom", {
      updatedRoom: room,
      flashMessage: {
        type: "success",
        message: `ルーム「${roomName}」を退室しました。`,
      },
    });
    if (room.members.length > 0)
      socket.to(roomName).emit("updatedRoom", {
        updatedRoom: room,
        flashMessage: {
          type: "success",
          message: `${nickname}さんが退室しました。`,
        },
      });
  }
};
