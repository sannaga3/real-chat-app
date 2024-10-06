import { useState } from "react";
import flashMessageStore from "../../../stores/flashMessageStore";
import useRoom from "../hooks/useRoom";
import { handleDisable, handleFlashMsgColor } from "../util";

const CreateRoomForm = () => {
  const { createRoom } = useRoom();
  const { flashMessage } = flashMessageStore();

  const [nickname, setNickname] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    createRoom(nickname, roomName, roomPassword);

    setNickname("");
    setRoomName("");
    setRoomPassword("");
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-center mb-4">ルーム作成</h2>
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
          <label htmlFor="roomName" className="room-form-label">
            ルーム名:
          </label>
          <input
            type="text"
            id="roomName"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
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

        <div className="flex space-x-3">
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className={`w-2/3 ${
              handleDisable(nickname, roomName, roomPassword)
                ? "bg-blue-200"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white font-semibold rounded-md py-2 mt-2 mx-auto`}
            disabled={handleDisable(nickname, roomName, roomPassword)}
          >
            作成
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateRoomForm;
