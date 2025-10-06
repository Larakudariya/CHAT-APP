import { io } from "socket.io-client";

let socket;

export const connectSocket = (userId) => {
  const PROD_URL = "https://chat-app-7-kc7f.onrender.com";
  const DEV_URL = "http://localhost:5002"; // backend port

  const SOCKET_URL = import.meta.env.MODE === "development" ? DEV_URL : PROD_URL;

  socket = io(SOCKET_URL, {
    query: { userId }, // explicitly send userId
    withCredentials: true,
  });

  socket.on("connect", () => console.log("Socket connected:", socket.id));

  socket.on("getOnlineUsers", (users) => {
    console.log("Online Users:", users);
  });

  socket.on("disconnect", () => console.log("Socket disconnected"));

  return socket;
};

export const getSocket = () => socket;
