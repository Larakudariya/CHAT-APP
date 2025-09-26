import { useEffect, useState } from "react";
import { socket } from "../socket";

function OnlineUsers() {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, []);

  return (
    <div>
      <h2>Online Users ({onlineUsers.length})</h2>
      <ul>
        {onlineUsers.map((user) => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default OnlineUsers;
