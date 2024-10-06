import { useEffect, useState } from "react";
import FlashMessage from "../common/components/FlashMessage";
import MessageForm from "../features/chat/components/MessageForm";
import MessageList from "../features/chat/components/MessageList";
import RoomMemberList from "../features/room/components/RoomMemberList";
import useRoom from "../features/room/hooks/useRoom";
import useSocket from "../features/socket/hooks/useSocket";
import authStore from "../stores/authStore";
import roomStore from "../stores/roomStore";
import socketStore from "../stores/socketStore";

const ChatRoom = () => {
  const { leaveRoom } = useRoom();
  const { reConnect } = useSocket();
  const room = roomStore((state) => state.room);
  const loginUser = authStore((state) => state.loginUser);
  const socket = socketStore((state) => state.socket);
  const [isPasswordDisabled, setIsPasswordDisabled] = useState(true);

  useEffect(() => {
    if (room && loginUser && !socket) reConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room, socket]);

  const handleLeaveRoom = () => {
    leaveRoom();
  };

  return (
    <>
      {room && Object.keys(room).length > 0 && (
        <>
          <div className="flex-auto w-full h-1/10">
            <div className="w-1/2 h-16 flex flex-col justify-center bg-white border-4 border-gray-300 rounded-lg mx-auto">
              <div className="font-mono text-2xl pl-3">
                <span className="text-sm">ルーム名:</span> {room.name}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => handleLeaveRoom()}
              className="w-30 bg-gray-500 text-white font-semibold text-xs rounded-md hover:bg-gray-600 p-2 mb-1"
            >
              退室
            </button>
          </div>
          <div className="flex-auto w-full h-36 flex justify-between space-x-5 mb-5">
            <div className="w-1/3 bg-white border-4 border-gray-300 rounded-lg p-3">
              <div className="font-mono text-lg text-center">参加者</div>
              <RoomMemberList />
            </div>
            <div className="w-2/3 bg-white border-4 border-gray-300 rounded-lg p-3">
              <div className="font-mono text-lg text-center">お絵描き</div>
            </div>
          </div>
          <div className="flex justify-between items-center rounded-t-lg bg-gray-700 text-white px-4 pt-1.5">
            <div>ルーム名: {room.name}</div>
            <div className="flex justify-start space-x-2">
              <span
                className="w-24 cursor-pointer"
                onClick={() => setIsPasswordDisabled(!isPasswordDisabled)}
              >
                パスワード:
              </span>
              <span className="w-20">
                {isPasswordDisabled ? "＊＊＊＊＊" : room.name}
              </span>
            </div>
          </div>
          <div className="w-full flex items-center bg-gray-700 px-4 space-x-2 py-1.5">
            <span className=" text-white">投稿 : </span>
            <MessageForm />
          </div>
          <FlashMessage />
          <div className="w-full h-96 bg-blue-200 rounded-b-lg overflow-y-auto max-h-[400px] p-4">
            <MessageList />
          </div>
        </>
      )}
    </>
  );
};

export default ChatRoom;
