import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// REST API base URL
const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5002"
    : "https://chat-app-7-kc7f.onrender.com";

// SOCKET.IO base URL (important)
const SOCKET_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001"
    : "https://chat-app-7-kc7f.onrender.com";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // ✅ Check authentication
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get(`${API_URL}/api/auth/check`, {
        withCredentials: true,
      });
      set({ authUser: res.data });
      get().connectSocket(res.data._id);
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // ✅ Signup
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post(`${API_URL}/api/auth/signup`, data, {
        withCredentials: true,
      });
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket(res.data._id);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // ✅ Login
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post(`${API_URL}/api/auth/login`, data, {
        withCredentials: true,
      });
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket(res.data._id);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // ✅ Logout
  logout: async () => {
    try {
      await axiosInstance.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
      set({ authUser: null, onlineUsers: [] });
      get().disconnectSocket();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  // ✅ Update Profile
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put(`${API_URL}/api/auth/update-profile`, data, {
        withCredentials: true,
      });
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // ✅ Socket Connect
  connectSocket: (userId) => {
    const existingSocket = get().socket;
    if (existingSocket && existingSocket.connected) return; // avoid duplicates

    const socket = io(SOCKET_URL, {
      query: { userId },
      withCredentials: true,
    });

    socket.on("connect", () => console.log("🟢 Socket connected:", socket.id));

    socket.on("getOnlineUsers", (users) => {
      console.log("👥 Online users:", users);
      set({ onlineUsers: users });
    });

    socket.on("disconnect", () => console.log("🔴 Socket disconnected"));

    set({ socket });
  },

  // ✅ Socket Disconnect
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) {
      socket.disconnect();
      console.log("🔌 Socket manually disconnected");
    }
  },
}));

