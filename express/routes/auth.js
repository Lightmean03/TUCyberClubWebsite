require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { db } = require("./db");
const { ObjectId } = require("mongodb");
const router = express.Router();
const saltRounds = 10;
const secretKey = process.env.JWT_SECRET_KEY;
const verifyTokenAndRole = require("../controllers/VerifyTokenAndRoles");

router.post("/signup", async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;

  try {
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    if (!email || !password || !username || !firstname || !lastname) {
      return res.status(400).json({ error: "Empty Fields " });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Set the role to "user" by default
    const newUser = {
      username,
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: "user",
      userId: new ObjectId(),
    };
    await db.collection("users").insertOne(newUser);

    res.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log("Email: " + email);
  try {
    const user = await db.collection("users").findOne({ email: email });
    console.log("Password: " + password);
    console.log("User password in the database:", user.password);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect Password" });
    }

    // Build JWT payload
    const payload = {
      email: user.email,
    };

    // Generate JWT access token
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    console.log("Access token:", token);

    //store JWT refresh token
    const refreshToken = jwt.sign({ UserId: user._id }, secretKey, {
      expiresIn: "1hr",
    });
    console.log("Refresh token:", refreshToken);

    // Store refresh token in database
    await db
      .collection("users")
      .updateOne({ email: email }, { $set: { refreshToken: refreshToken } });

    // Set cookies for tokens and user data
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
    console.log("User: " + payload.UserId);
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: "Failed to sign in" });
  }
});

//Add username to user

router.put("/user/:id", async (req, res) => {
  try {
    const { username, email } = req.body;
    const token = req.cookies.token;
    console.log("Token:", token);

    console.log("Username:", username)

    if (!token) {
      return res.status(401).json({ error: "Unauthorized - Token missing" });
    }

    const decoded = jwt.verify(token, secretKey);
    const user = await db.collection("users").findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User Role:", user.role);

    if (user.role !== "user" && user.role !== "admin") {
      return res.status(403).json({ error: "Access Forbidden" });
    }
    let userEmail = user.email;
   
    const collection = db.collection("users");
    const result = await collection.updateOne(
      { email: userEmail },
      { $set: { username: username } }
    );
    console.log(result);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Username added successfully" });
  } catch (error) {
    console.error("Error adding username:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/username", async (req, res) => {
    try {
      const token = req.cookies.token;
      const decoded = jwt.verify(token, secretKey);
      const user = await db.collection("users").findOne({ email: decoded.email });

      if (user.username) {
        return  res.json({ message: user.username});
      }else{
        return res.status(404).json({ error: "Username not found" });
      }
     
    }catch (error) {
      console.error("Error getting username:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});


router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;

  try {
    // Verify the refresh token
    const user = await db
      .collection("users")
      .findOne({ refreshToken: refreshToken });

    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { email: user.email, role: user.role },
      secretKey,
      { expiresIn: "1h" }
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ message: "Token refresh failed" });
  }
});

router.get("/admin", async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log("Token:", token);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - Token missing" });
    }

    const decoded = jwt.verify(token, secretKey);
    const user = await db.collection("users").findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User Role:", user.role);

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
    const users = await db
      .collection("users")
      .find({}, { projection: { email: 1, role: 1 } })
      .toArray();
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/user", async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log("Token:", token);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - Token missing" });
    }

    const decoded = jwt.verify(token, secretKey);
    const user = await db.collection("users").findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User Role:", user.role);

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
    const users = await db
      .collection("users")
      .find({ role: req.params.role })
      .toArray();
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/signout", async (req, res) => {
  res.clearCookie("token");
  res.clearCookie("user");
  res.clearCookie("refreshToken");

  res.status(200).json({ message: "User signed out successfully" });
});

module.exports = router;
