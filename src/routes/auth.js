const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Make sure this points to your User model

const router = express.Router();

// Register Route (For User Registration)
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
    });

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to DB
    await user.save();

    // Generate JWT Token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, "your_jwt_secret_key", { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ token }); // Send back the token
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Login Route (For User Login)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT Token
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, "your_jwt_secret_key", { expiresIn: "1h" });
    res.json({ token });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
