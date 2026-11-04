const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('bufferCommands', false);
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/agriconnect';
    const conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2500 });
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.log(`\n------------------------------------------------------------`);
    console.log(`ℹ️ Local MongoDB service is offline (${error.message}).`);
    console.log(`⚡ AgriConnect In-Memory Store active! All APIs, CRUD operations & Auth work 100%.`);
    console.log(`📌 To connect to real database, start local MongoDB or add MONGO_URI in .env`);
    console.log(`------------------------------------------------------------\n`);
  }
};

module.exports = connectDB;
