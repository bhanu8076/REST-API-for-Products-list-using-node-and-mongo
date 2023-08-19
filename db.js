const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const uri = process.env.DB_URI;

const connectToDatabase = async () => {
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    db = client.db(); 
    console.log('Connected to MongoDB');
    return db;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

let db = connectToDatabase();

module.exports = { connectToDatabase, db };
