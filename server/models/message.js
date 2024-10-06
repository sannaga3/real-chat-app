import dayjs from "dayjs";

export class Message {
  constructor(nickname, content, messageLen) {
    this.id = messageLen + 1;
    this.nickname = nickname;
    this.content = content;
    this.created_at = dayjs().format("YYYY-MM-DD HH:mm:ss");
  }
}
