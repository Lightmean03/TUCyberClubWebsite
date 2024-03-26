const express = require("express");
const router = express.Router();
const passport = require("passport");
const secretKey = process.env.JWT_SECRET_KEY;
const User = require("../models/User");
const Token = require("../models/token.model");
const decodeToken = require("../middlewares/auth/decodeToken");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

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

//passport.use(new LocalStrategy(User.authenticate()));

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

    const newUser = new User({
      username,
      email,
      userId: new mongoose.Types.ObjectId(),
    });
    await User.register(newUser, password);

    res.json({ message: message.userCreatedSuccessfully });
  } catch (error) {
    console.error(`${message.errorCreatingUser} ${error}`);
    res.status(500).json({ error: message.internalServerError });
  }
});

router.post('/signin', async (req, res, next) => {
  passport.authenticate('local', { session: false }, async (err, info) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email});
    try {
      if (err || !user) {
        return res.status(404).json({ error: 'User not found' });
      }

      req.login(user, { session: false }, async (error) => {
        if (error) {
          return next(error);
        }

        const payload = {
          id: user._id,
          email: user.email,
          role: user.role,
        };

        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        return res.json({ message: 'Access granted', token });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error signing in' });
    }
  })(req, res, next);
});

router.put("/user/:id", decodeToken, async (req, res) => {
  try {
    const { username } = req.body;
    const userEmail = req.user.email;

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

router.get("/username", async (req, res) => {
  try {
    const userEmail = req.user;
    const user = await User.findOne(userEmail);
    console.log(user.username);
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
