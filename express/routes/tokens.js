const express = require("express");
const router = express.Router();
const Token = require("../models/token.model");

router.post("/token", async (req, res) => {
  const { token } = req.body;

  try {
    const newToken = new Token({ value: token });
    await newToken.save();
    res.status(201).json({ message: "Token saved to the database" });
  } catch (error) {
    console.error("Error saving token to the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Add token to user's token array
router.post("/token/add", async (req, res) => {
  const { token } = req.body;

  try {
    const newToken = new Token({ value: token });
    await newToken.save();
    res.status(201).json({ message: "Token saved to the database" });
  } catch (error) {
    console.error("Error saving token to the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get all tokens
router.get("/token", async (req, res) => {
  try {
    const tokens = await Token.find();
    res.json(tokens);
  } catch (error) {
    console.error("Error getting tokens from the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
