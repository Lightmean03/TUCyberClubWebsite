const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const saltRounds = 10;
const secretKey = process.env.JWT_SECRET_KEY;
const User = require("../models/User");
const Token = require("../models/token.model");
const decodeToken = require("../middlewares/auth/decodeToken");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");

const message = {
  userNotFound: "User not found",
  userAlreadyExists: "User already exists",
  userCreatedSuccessfully: "User created successfully",
  emptyFields: "Empty Fields",
  incorrectPassword: "Incorrect Password",
  internalServerError: "Internal Server Error",
  errorCreatingUser: "Error creating user:",
  errorSigningIn: "Error signing in:",
  errorAddingUsername: "Error adding username:",
  errorGettingUsername: "Error getting username:",
  errorDecodingToken: "Error decoding token:",
  errorGettingUsers: "Error getting users:",
  errorRefreshingToken: "Error refreshing token:",
  tokenRefreshFailed: "Token refresh failed",
  errorSigningOut: "Error signing out:",
  userSignedOutSuccessfully: "User signed out successfully",
  accessGiven: "Access Given",
  accessForbidden: "Access Forbidden",
};

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: message.userAlreadyExists });
    }

    if (!email || !password || !username) {
      return res.status(400).json({ error: message.emptyFields });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userId = new mongoose.Types.ObjectId();
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      userId: userId,
    });

    await newUser.save();

    res.json({ message: message.userCreatedSuccessfully });
  } catch (error) {
    console.error(`${message.errorCreatingUser} ${error}`);
    res.status(500).json({ error: message.internalServerError });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: message.userNotFound });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: message.incorrectPassword });
    }

    const payload = {
      email: user.email,
      role: user.role,
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
      message: message.accessGiven,
    });
  } catch (error) {
    console.error(`${message.errorSigningIn} ${error}`);
    res.status(500).json({ error: message.tokenRefreshFailed });
  }
});

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
      return res.status(404).json({ error: message.userNotFound });
    }

    res.json({ message: message.accessGiven });
  } catch (error) {
    console.error(`${message.errorAddingUsername} ${error}`);
    res.status(500).json({ error: message.internalServerError });
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
      return res.status(401).json({ message: message.tokenRefreshFailed });
    }

    const newAccessToken = jwt.sign(
      { email: user.email, role: user.role },
      secretKey,
      { expiresIn: "1h" },
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error(`${message.errorRefreshingToken} ${error}`);
    res.status(500).json({ message: message.tokenRefreshFailed });
  }
});

router.get("/admin", decodeToken, async (req, res) => {
  try {
    const userEmail = req.userId;
    console.log(userEmail);
    const user = await User.findOne({ email: userEmail });
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: message.userNotFound });
    }

    if (user.role === "admin") {
      return res.status(200).json({ message: message.accessGiven });
    } else {
      return res.status(403).json({ error: message.accessForbidden });
    }
  } catch (error) {
    console.error(`${message.errorDecodingToken} ${error}`);
    return res.status(401).json({ error: message.accessForbidden });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(`${message.errorGettingUsers} ${error}`);
    res.status(500).json({ error: message.internalServerError });
  }
});

router.get("/user", async (req, res) => {
  try {
    const userEmail = req.userId;
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: message.userNotFound });
    }

    if (user.role === "user") {
      return res.status(200).json({ message: message.accessGiven });
    } else {
      return res.status(403).json({ error: message.accessForbidden });
    }
  } catch (error) {
    console.error(`${message.errorDecodingToken} ${error}`);
    return res.status(401).json({ error: message.accessForbidden });
  }
});

router.get("/users/:role", async (req, res) => {
  try {
    const users = await User.find({ role: req.params.role });
    res.json(users);
  } catch (error) {
    console.error(`${message.errorGettingUsers} ${error}`);
    res.status(500).json({ error: message.internalServerError });
  }
});
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(`${message.errorGettingUsers} ${error}`);
    res.status(500).json({ error: message.internalServerError });
  }
});

router.get("/users/:role", async (req, res) => {
  try {
    const users = await User.find({ role: req.params.role });
    res.json(users);
  } catch (error) {
    console.error(`${message.errorGettingUsers} ${error}`);
    res.status(500).json({ error: message.internalServerError });
  }
});

router.post("/signout", async (req, res) => {
  const refreshToken = req.body.refreshToken;

  await Token.deleteOne({ refreshToken });

  res.clearCookie("token");
  res.clearCookie("user");
  res.clearCookie("refreshToken");

  res.status(200).json({ message: message.userSignedOutSuccessfully });
});

module.exports = router;
