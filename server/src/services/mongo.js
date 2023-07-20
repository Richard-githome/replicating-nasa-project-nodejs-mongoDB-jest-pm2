require("dotenv").config()
const mongoose = require('mongoose');

// Update below to match your own MongoDB connection string.
const MONGO_URL = process.env.MONGO_URL

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function mongoConnect() {
  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
}

const mongoDisconnect = async()=>{
  mongoose.disconnect()
}


module.exports = {
  mongoConnect,
  mongoDisconnect
}