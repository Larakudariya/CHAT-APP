import { io } from "socket.io-client";

export const socket = io("http://localhost:5001", {
  query: { userId: localStorage.getItem("userId") }, // login के बाद userId save करना होगा
});
