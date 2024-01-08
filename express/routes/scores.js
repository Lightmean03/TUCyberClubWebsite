require("dotenv").config();
const Score = require("../models/Score");

router.get("/scores", async (req, res) => {
  try {
    const scores = await Score.find();
    res.json(scores);
  } catch (error) {
    console.error("Error retrieving scores:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/scores", async (req, res) => {
  try {
    const scores = await Score.find();
    res.json(scores);
  } catch (error) {
    console.error("Error retrieving scores:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
