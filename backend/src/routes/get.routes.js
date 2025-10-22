import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

const router = express.Router();

/**
 * @route GET /api/get/users
 * @desc Get all users except the current logged-in user
 * @access Private
 */
router.get("/users", verifyToken, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } })
      .select("-password")
      .lean();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

/**
 * @route GET /api/get/messages/:chatId
 * @desc Get all messages for a specific chat
 * @access Private
 */
router.get("/messages/:chatId", verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId })
      .populate("sender", "name email avatar")
      .sort({ createdAt: 1 }); // oldest to newest
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

/**
 * @route GET /api/get/message/:id
 * @desc Get a single message by ID
 * @access Private
 */
router.get("/message/:id", verifyToken, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate("sender", "name email avatar");
    if (!message) return res.status(404).json({ message: "Message not found" });

    res.status(200).json(message);
  } catch (err) {
    console.error("Error fetching message:", err);
    res.status(500).json({ message: "Failed to fetch message" });
  }
});

export default router;
