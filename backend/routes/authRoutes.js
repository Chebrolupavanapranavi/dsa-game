import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import User from "../models/User.js"; 

const router = express.Router();

// ✅ Signup Route (Improved)
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // No manual hashing here (Mongoose will handle it)
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    console.log("🔍 Stored Hashed Password:", user.password); // Debugging

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 Password Match:", isMatch); // Debugging

    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});


export default router;
