import { io } from "socket.io-client";

let socket;

export const connectSocket = (userId) => {
  const PROD_URL = "https://chat-app-7-kc7f.onrender.com";
  const DEV_URL = "http://localhost:5001"; // tumhara backend port

  // Environment ke hisaab se URL set karo
  const SOCKET_URL = process.env.NODE_ENV === "production" ? PROD_URL : DEV_URL;

  socket = io(SOCKET_URL, {
    query: { userId },
    withCredentials: true, // credentials allow karne ke liye
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("getOnlineUsers", (users) => {
    console.log("Online Users:", users);
    // Yaha tum apna state update function call kar sakte ho
    // setOnlineUsers(users);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  return socket;
};

export const getSocket = () => socket;
