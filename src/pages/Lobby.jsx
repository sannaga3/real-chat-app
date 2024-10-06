import { useState } from "react";
import CreateRoomForm from "../features/room/components/CreateRoomForm";
import EnterRoomForm from "../features/room/components/EnterRoomForm";

const Login = () => {
  const [loginType, setLoginType] = useState("createRoom");

  return (
    <div className="flex justify-center">
      <div className="w-2/5 max-w-md bg-white border-2 border-gray-300 rounded-md p-5">
        <div className="flex justify-around text-xs mb-7">
          <button
            className={`${
              loginType === "createRoom"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500"
            } font-semibold`}
            onClick={() => setLoginType("createRoom")}
          >
            ルーム作成
          </button>
          <button
            className={`${
              loginType === "enterRoom"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500"
            } font-semibold`}
            onClick={() => setLoginType("enterRoom")}
          >
            ルーム入室
          </button>
        </div>

        {loginType === "createRoom" ? <CreateRoomForm /> : <EnterRoomForm />}
      </div>
    </div>
  );
};

export default Login;
