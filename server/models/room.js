import dayjs from "dayjs";
import { rooms } from "./controllers/roomController.js";
import { Message } from "./message.js";

class Room {
  constructor(socketId, name, password, nickname) {
    this.socketId = socketId;
    this.name = name;
    this.password = password;
    this.creator = nickname;
    this.members = [];
    this.messages = [];
    this.created_at = dayjs().format("YYYY-MM-DD HH:mm:ss");
    console.log(`created room 「${name}」`);
  }

  joinMember(socketId, nickname, isRejoin = false) {
    this.members = [
      ...this.members,
      { socketId: socketId, nickname: nickname },
    ];
    if (isRejoin) console.log(`${nickname} rejoined room「${this.name}」`);
    else console.log(`${nickname} joined room「${this.name}」`);
  }

  leaveMember(room, nickname) {
    room.members = room.members.filter(
      (member) => member.nickname !== nickname
    );
    rooms[room.name] = room;
  }

  updateSocketId(newSocketId) {
    this.socketId = newSocketId;
  }

  sendMessage(nickname, message) {
    const newMessage = new Message(nickname, message, this.messages.length);
    this.messages = [...this.messages, newMessage];
    return newMessage;
  }

  getMessages() {
    return this.messages;
  }

  reduceMessage(id) {
    this.messages = this.messages.filter((message) => message.id !== id);
  }
}

const createValidator = (roomName, roomPassword, nickname) => {
  // ルーム名の重複チェック
  if (rooms[roomName]) return [false, "そのルーム名は既に使われています。"];

  // ルーム名やパスワードのバリデーション
  if (nickname.length < 2 || roomName.length < 2 || roomPassword.length < 6)
    return [false, "ルーム名、パスワード、またはニックネームが無効です。"];

  return [true, null];
};

const joinValidator = (roomName, roomPassword, nickname) => {
  const room = rooms[roomName];

  // ルーム存在チェック
  if (!rooms[roomName]) return [false, "ルームがありません。"];

  // ニックネーム未使用チェック
  const nicknames = room.members.map((member) => member.nickname);
  if (nicknames.includes(nickname))
    return [false, "そのニックネームは既に使われています。"];

  // パスワードチェック
  if (room.password !== roomPassword)
    return [false, "パスワードが間違っています。"];

  return [true, null];
};

export { createValidator, joinValidator, Room };
