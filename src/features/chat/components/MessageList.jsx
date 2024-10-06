import authStore from "../../../stores/authStore";
import chatStore from "../../../stores/chatStore";

const MessageList = () => {
  const messages = chatStore((state) => state.messages);
  const loginUser = authStore((state) => state.loginUser);

  return (
    <div>
      {messages.length > 0 && (
        <div className="space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                loginUser.nickname === msg.nickname
                  ? "justify-start"
                  : "justify-end"
              }`}
            >
              <div className="space-x-2">
                <span className="text-xm">{msg.nickname}:</span>
                <span
                  className={` bg-white border rounded-3xl text-xl px-5 py-1`}
                >
                  {msg.content}
                </span>
                <span className="text-xs">{msg.created_at.slice(-5)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageList;
