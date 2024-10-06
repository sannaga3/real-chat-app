import { useEffect, useState } from "react";
import flashMessageStore from "../../../stores/flashMessageStore";
import socketStore from "../../../stores/socketStore";
import useRoom from "../hooks/useRoom";
import { handleDisable, handleFlashMsgColor } from "../util";

const EnterRoomForm = () => {
  const { socket } = socketStore();
  const { flashMessage } = flashMessageStore();
  const { joinRoom } = useRoom();

  const [nickname, setNickname] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [roomNameList, setRoomNameList] = useState("");

  useEffect(() => {
    // ルーム名リスト取得
    socket.emit("getRoomNameList");

    // ルーム名リストを受け取る
    const handleRoomNameList = (roomNameList) => {
      setRoomNameList(roomNameList); // 受け取ったルームリストを保存
    };
    socket.on("getRoomNameList", handleRoomNameList);

    return () => socket.off("getRoomNameList", handleRoomNameList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    joinRoom(nickname, roomName, roomPassword);

    setNickname("");
    setRoomName("");
    setRoomPassword("");
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-center mb-4">ルーム入室</h2>
      <p className={`text-sm ${handleFlashMsgColor(flashMessage)}`}>
        {flashMessage.message}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nickname" className="room-form-label">
            ニックネーム:
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            className="room-form-input"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="roomPassword" className="room-form-label">
            入室パスワード:
          </label>
          <input
            type="password"
            id="roomPassword"
            value={roomPassword}
            onChange={(e) => setRoomPassword(e.target.value)}
            required
            className="room-form-input"
          />
        </div>

        <div className="room-form-label">ルームリスト:</div>
        <div className="h-40 border border-gray-300 rounded-sm p-1">
          {roomNameList.length > 0 ? (
            roomNameList.map((name) => (
              <li
                key={name}
                onClick={() => setRoomName(name)}
                className={`${
                  name === roomName ? "bg-orange-400 text-white px-2" : ""
                }`}
              >
                <span>{name}</span>
              </li>
            ))
          ) : (
            <div className="text-center p-2">no room created</div>
          )}
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            onSubmit={handleSubmit}
            className={`w-2/3 ${
              handleDisable(nickname, roomName, roomPassword)
                ? "bg-blue-200"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white font-semibold rounded-md py-2 mt-2 mx-auto`}
            disabled={handleDisable(nickname, roomName, roomPassword)}
          >
            入室
          </button>
        </div>
      </form>
    </>
  );
};

export default EnterRoomForm;
