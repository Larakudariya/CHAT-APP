// import { io } from "socket.io-client";

// export const socket = io("http://localhost:5001", {
//   query: { userId: localStorage.getItem("userId") }, // login के बाद userId save करना होगा
// });
import { io } from "socket.io-client";

let socket;

export const connectSocket = (userId) => {
  socket = io("http://localhost:5001", {
    query: { userId },
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("getOnlineUsers", (users) => {
    console.log("Online Users:", users);
    // yaha tum apna state update function call karo
    // setOnlineUsers(users);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  return socket;
};

export const getSocket = () => socket;
