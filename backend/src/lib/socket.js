// lib/socket.js
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// ✅ Configure socket.io with proper CORS
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://chat-app-7-kc7f.onrender.com",
      "https://chat-app-frontend2-nmig.onrender.com", // replace this
    ],
    methods:["GET","POST"],
    credentials: true,
  },
});

// ✅ Map to store userId → socketId
const userSocketMap = new Map();

// ✅ Socket.io connection handler
io.on("connection", (socket) => {
  console.log("⚡ A user connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap.set(userId, socket.id);
    console.log("Registered user:", userId);
  }

  // Emit online users list
  io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("❌ A user disconnected:", socket.id);
    if (userId) userSocketMap.delete(userId);
    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
  });
});

// ✅ Helper function to get receiver’s socket ID
export const getReceiverSocketId = (userId) => {
  return userSocketMap.get(userId);
};

// ✅ Export for use in other files
export { io, app, server };
