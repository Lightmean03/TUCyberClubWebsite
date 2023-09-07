const { MongoClient } = require('mongodb');
require('dotenv').config();
const uri = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const client = new MongoClient(uri, { useUnifiedTopology: true });
const db = client.db(dbName);

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};


module.exports = {
  db,
  connectDB,
};
