import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./src/lib/db.js";
import { app, server } from "./src/lib/socket.js";

import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";

const PORT = process.env.PORT || 5002;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(path.resolve(), "../frontend", "dist", "index.html"));
  });
}

// Connect DB and start server
(async () => {
  await connectDB(); // Call once
  server.listen(PORT, () => {
    console.log("🚀 Server running on port", PORT);
  });
})();
