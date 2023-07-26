const { MongoClient } = require('mongodb');
const crypto = require('crypto');
const uri = 'mongodb+srv://trecottman60:Bobby@towsonclub.ja3qb7f.mongodb.net/';
const dbName = 'TowsonClub';
const client = new MongoClient(uri, { useUnifiedTopology: true });
const db = client.db(dbName);

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with a non-zero status code
  }
};


module.exports = {
  db,
  connectDB,
};
