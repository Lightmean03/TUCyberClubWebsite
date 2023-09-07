const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://trecottman60:KingZeus@towsonclub.ja3qb7f.mongodb.net/?retryWrites=true&w=majority";
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
