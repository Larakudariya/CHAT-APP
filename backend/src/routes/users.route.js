import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import User from "../models/user.model.js";

const router = express.Router();

/**
 * @route GET /api/users
 * @desc Get all users except the current logged-in user
 * @access Private
 */
router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } })
      .select("-password") // exclude password field
      .lean();

    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

/**
 * @route GET /api/users/:id
 * @desc Get single user profile by ID
 * @access Private
 */
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

/**
 * @route GET /api/users/search/:query
 * @desc Search users by name or email
 * @access Private
 */
router.get("/search/:query", verifyToken, async (req, res) => {
  try {
    const query = req.params.query.trim();
    const users = await User.find({
      $and: [
        { _id: { $ne: req.user._id } },
        {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
          ],
        },
      ],
    }).select("-password");

    res.status(200).json(users);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Failed to search users" });
  }
});

export default router;


