import { io } from "socket.io-client";

let socket;

export const connectSocket = (userId) => {
  const PROD_URL = "https://chat-app-backend.onrender.com"; // ⚡ Replace with backend Render URL
  const DEV_URL = "http://localhost:5002";

  const SOCKET_URL = import.meta.env.MODE === "development" ? DEV_URL : PROD_URL;

  console.log("Connecting to:", SOCKET_URL, "with userId:", userId);

  socket = io(SOCKET_URL, {
    query: { userId },
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
