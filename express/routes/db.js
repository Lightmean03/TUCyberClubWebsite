const { MongoClient } = require('mongodb');
const crypto = require('crypto');
const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;
const client = new MongoClient(uri, { useUnifiedTopology: true });
const db = client.db(dbName);

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};


module.exports = {
  db,
  connectDB,
};
