import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

export default function OnlineUsers({ setChatWith }) {
  const { onlineUsers, authUser } = useAuthStore();

  return (
    <div className="online-users">
      <h3>Online Users</h3>
      <ul>
        {onlineUsers
          .filter((id) => id !== authUser?._id)
          .map((userId) => (
            <li key={userId}>
              <button onClick={() => setChatWith(userId)} className="chat-user-btn">
                {userId}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
