import { useState } from "react";
import useMessage from "../hooks/useMessage";

const MessageForm = () => {
  const { sendMessage } = useMessage();
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="content"
        type="text"
        className="border rounded-lg px-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </form>
  );
};

export default MessageForm;
