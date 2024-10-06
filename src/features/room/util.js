export const handleFlashMsgColor = (flashMessage) => {
  if (flashMessage.type) {
    if (flashMessage.type === "success") return "text-green-500";
    else if (flashMessage.type === "error") return "text-red-500";
    return "";
  }
};

export const handleDisable = (nickname, roomName, roomPassword) => {
  const isDisabled =
    nickname.length < 2 || roomName.length < 2 || roomPassword.length < 6;
  return isDisabled;
};
