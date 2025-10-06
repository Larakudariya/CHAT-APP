import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const PORT = process.env.PORT || 5002;

// ✅ Dynamic CORS configuration
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://chat-app-7-kc7f.onrender.com" // Production Render app URL
];

app.use(cors({
  origin: function(origin, callback){
    if (!origin) return callback(null, true); // Allow mobile apps or curl requests
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy does not allow access from ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Production build serving
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(path.resolve(), "../frontend", "dist", "index.html"));
  });
}

// Connect DB and start server
(async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log("🚀 Server running on port", PORT);
  });
})();
