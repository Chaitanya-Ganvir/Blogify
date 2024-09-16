const mongoose = require("mongoose");
async function connectMongodb(url) {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connectMongodb };
