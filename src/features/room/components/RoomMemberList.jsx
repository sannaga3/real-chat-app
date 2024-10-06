import authStore from "../../../stores/authStore";
import roomStore from "../../../stores/roomStore";

const RoomMemberList = () => {
  const room = roomStore((state) => state.room);
  const loginUser = authStore((state) => state.loginUser);

  return (
    <>
      {room &&
        room.members.length > 0 &&
        room.members.map((member) => (
          <li
            key={member.nickname}
            className={`${
              member.nickname === loginUser.nickname
                ? "text-orange-600"
                : "text-black"
            }`}
          >
            {member.nickname}
          </li>
        ))}
    </>
  );
};

export default RoomMemberList;
