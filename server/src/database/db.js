const mongoose = require("mongoose");

const dbConnection = async (url) => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true });
    console.log("Database connected");
  } catch (error) {
    console.log("error while database connection", error.message);
  }
};

module.exports = { dbConnection };
