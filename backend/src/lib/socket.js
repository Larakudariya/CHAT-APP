import { Server } from "socket.io";
import User from "../models/user.model.js"; // सही path

const userSocketMap = {};

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

export function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", async (socket) => {
    console.log("✅ User connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap[userId] = socket.id;
      console.log("🔗 User mapped:", userId, "=>", socket.id);
    }

    async function sendOnlineUsers() {
      const onlineUsers = await Promise.all(
        Object.keys(userSocketMap).map(async (id) => {
          const user = await User.findById(id).select("name email");
          return { id, name: user?.name || "Unknown", email: user?.email || "" };
        })
      );
      io.emit("getOnlineUsers", onlineUsers);
    }

    await sendOnlineUsers();

    socket.on("disconnect", async () => {
      console.log("❌ User disconnected:", socket.id);
      if (userId) delete userSocketMap[userId];
      await sendOnlineUsers();
    });
  });

  return io;
}
