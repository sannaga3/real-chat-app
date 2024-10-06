import { useEffect } from "react";
import flashMessageStore from "../../stores/flashMessageStore";

const FlashMessage = () => {
  const { flashMessage, resetFlashMessage } = flashMessageStore();

  useEffect(() => {
    // フラッシュメッセージがある場合5秒後にリセット
    if (flashMessage.message) {
      const timer = setTimeout(() => {
        resetFlashMessage();
      }, 5000);

      // フラッシュメッセージが変更された際にタイマーをクリア
      return () => clearTimeout(timer);
    }
  }, [flashMessage.message, resetFlashMessage]);

  const handleTextColor = () => {
    if (flashMessage.type === "error") return "text-red-600 font-bold";
    return "";
  };

  return (
    <div className={`w-full h-6 bg-green-400 ${handleTextColor()} px-5`}>
      {/* nullの場合でも高さを保持 */}
      {flashMessage.message || <span>&nbsp;</span>}
    </div>
  );
};

export default FlashMessage;
