// // backend/src/controllers/message.controller.js
// import Message from "../models/message.model.js";
// import User from "../models/user.model.js";

// // Send message
// export const sendMessage = async (req, res) => {
//   try {
//     const { id } = req.params; // recipient ID
//     const { message } = req.body;

//     if (!message) {
//       return res.status(400).json({ message: "Message cannot be empty" });
//     }

//     const newMessage = new Message({
//       sender: req.user._id,
//       recipient: id,
//       message,
//     });

//     await newMessage.save();

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.log("Error in sendMessage:", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // Get messages between logged-in user and another user
// export const getMessages = async (req, res) => {
//   try {
//     const { id } = req.params; // other user ID

//     const messages = await Message.find({
//       $or: [
//         { sender: req.user._id, recipient: id },
//         { sender: id, recipient: req.user._id },
//       ],
//     }).sort({ createdAt: 1 });

//     res.status(200).json(messages);
//   } catch (error) {
//     console.log("Error in getMessages:", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // Get users list for sidebar
// export const getUsersForSidebar = async (req, res) => {
//   try {
//     const users = await User.find({ _id: { $ne: req.user._id } }).select(
//       "fullName email profilePic"
//     );
//     res.status(200).json(users);
//   } catch (error) {
//     console.log("Error in getUsersForSidebar:", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };



import { Router } from "express";
import {
  sendMessage,
  getMessages,
  getUsersForSidebar,
} from "../controllers/message.controller.js";

const router = Router();

router.get("/users", getUsersForSidebar);
router.post("/send/:id", sendMessage);
router.get("/:id", getMessages);

export default router;
