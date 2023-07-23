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

const mongoConnect = async ()=>{
  await mongoose.connect(process.env.MONGO_URL);

}

const mongoDisconnect = async()=>{
  setTimeout(async() => {await mongoose.connection.close()}, 10000)
  ;
}


module.exports = {
  mongoConnect,
  mongoDisconnect
}