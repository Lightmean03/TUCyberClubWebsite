const express = require("express");
const router = express.Router();
const { db } = require("../config/db");
const { ObjectId } = require("mongodb");
const verifyTokenAndRole = require("../controllers/VerifyTokenAndRoles");

router.get("/events", async (req, res) => {
  try {
    const events = await db.collection("events").find().toArray();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/createEvent", async (req, res) => {
  try {
    const events = await db.collection("events").insertOne(req.body);
    res.json(events);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const events = await db
      .collection("events")
      .updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body });
    res.json(events);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
