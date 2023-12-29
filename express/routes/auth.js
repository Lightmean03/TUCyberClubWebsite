const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const saltRounds = 10;
const secretKey = process.env.JWT_SECRET_KEY;
const User = require("../models/User");
const Token = require("../models/token.model");
const decodeToken = require("../middlewares/auth/decodeToken");

router.post("/signup", async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    if (!email || !password || !username || !firstname || !lastname) {
      return res.status(400).json({ error: "Empty Fields " });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect Password" });
    }

    const payload = {
      email: user.email,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ UserId: user._id }, secretKey, {
      expiresIn: "1hr",
    });

    const newToken = new Token({
      user: user._id,
      refreshToken,
      accessToken: token,
    });

    await newToken.save();

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3600000,
      path: "/",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3600000,
      path: "/",
    });

    res.cookie("user", JSON.stringify(payload), {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3600000,
      path: "/",
    });

    res.status(200).json({
      token: token,
      user: payload,
      message: "User signed in successfully",
    });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: "Failed to sign in" });
  }
});

// Add username to user
router.put("/user/:id", decodeToken, async (req, res) => {
  try {
    const { username } = req.body;
    const userEmail = req.userId;

    const result = await User.updateOne(
      { email: userEmail },
      { $set: { username: username } },
    );

    console.log(result);

    if (result.nModified === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Username added successfully" });
  } catch (error) {
    console.error("Error adding username:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/username", decodeToken, async (req, res) => {
  try {
    const userEmail = req.userId;
    const user = await User.findOne({ email: userEmail });

    if (user.username) {
      return res.json({ message: user.username });
    } else {
      return res.status(404).json({ error: "Username not found" });
    }
  } catch (error) {
    console.error("Error getting username:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const user = await Token.findOne({ refreshToken });

    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { email: user.email, role: user.role },
      secretKey,
      { expiresIn: "1h" },
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ message: "Token refresh failed" });
  }
});

router.get("/admin", decodeToken, async (req, res) => {
  try {
    const userEmail = req.userId;
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(200).json({ message: "Access Given" });
    } else {
      return res.status(403).json({ error: "Access Forbidden" });
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, { projection: { email: 1, role: 1 } });
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/user", decodeToken, async (req, res) => {
  try {
    const userEmail = req.userId;
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role === "user") {
      return res.status(200).json({ message: "Access Given" });
    } else {
      return res.status(403).json({ error: "Access Forbidden" });
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
});

router.get("/users/:role", async (req, res) => {
  try {
    const users = await User.find({ role: req.params.role });
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/signout", async (req, res) => {
  const refreshToken = req.body.refreshToken;

  await Token.deleteOne({ refreshToken });

  res.clearCookie("token");
  res.clearCookie("user");
  res.clearCookie("refreshToken");

  res.status(200).json({ message: "User signed out successfully" });
});

module.exports = router;
