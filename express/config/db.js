require("dotenv").config();
const { MongoClient } = require("mongodb");
const { default: mongoose } = require("mongoose");
const uri = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const client = new MongoClient(uri, { useUnifiedTopology: true });
const db = client.db(dbName);

const connectDB = async () => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: dbName,
  });
};

module.exports = {
  connectDB,
};
