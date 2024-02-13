require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.DB_URL;
const dbName = process.env.DB_NAME;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: dbName,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = {
  connectDB,
};
