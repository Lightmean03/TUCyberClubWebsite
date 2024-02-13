const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  date: Date,
  id: mongoose.Schema.Types.ObjectId,
});

const Events = mongoose.model("Event", eventSchema, "events");
module.exports = Events;
