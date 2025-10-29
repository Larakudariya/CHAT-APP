// import dotenv from "dotenv";
// dotenv.config();
// // ✅ Debug environment variables
// console.log("✅ NODE_ENV =", process.env.NODE_ENV); 

// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";

// import { connectDB } from "./lib/db.js";
// import { app, server } from "./lib/socket.js";

// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const PORT = process.env.PORT || 5002;

// // ✅ Debug environment variables
// console.log("✅ JWT_SECRET exists:", !!process.env.JWT_SECRET);
// console.log("✅ MONGO_URI exists:", !!process.env.MONGO_URI);

// // ✅ Dynamic CORS configuration
// const allowedOrigins = [
//   "http://localhost:5173", // Local dev
//   "https://chat-app-7-kc7f.onrender.com", // Production
//   "http://frontend:3000" // Docker setup
// ];

// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin) return callback(null, true); // allow mobile apps/curl
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = `CORS policy does not allow access from ${origin}`;
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true
// }));

// // Middleware
// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// // Health check for tests / simple API check
// app.get("/", (req, res) => res.send("API is working 🚀"));

// // Production build serving
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
//   });
// }

// // Connect DB and start server
// (async () => {
//   try {
//     await connectDB();
//     server.listen(PORT, () => {
//       console.log("✅ MongoDB Connected");
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error("❌ Server failed to start", err);
//   }
// })();

// export default app;

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5002;

// ✅ Show environment only in development
if (process.env.NODE_ENV !== "production") {
  console.log("✅ NODE_ENV =", process.env.NODE_ENV);
  console.log("✅ JWT_SECRET exists:", !!process.env.JWT_SECRET);
  console.log("✅ MONGO_URI exists:", !!process.env.MONGO_URI);
}

// ✅ Allowed Origins (update frontend render URL if different)
const allowedOrigins = [
  "http://localhost:5173",                   // Local Dev
  "https://chat-app-7-kc7f.onrender.com",    // Render Frontend
];

// ✅ CORS setup (important for cookies + auth)
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // allow cookies (JWT)
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Health check
app.get("/", (req, res) => res.send("API is working 🚀"));

// ✅ Serve frontend build in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// ✅ Start Server
(async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log("✅ MongoDB Connected");
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start", err);
  }
})();

export default app;
