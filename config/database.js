const mongoose = require("mongoose");

const { MONGO_URI = "mongodb://127.0.0.1/auth"} = process.env;

exports.connect = () => {
  // Connects to the database
  mongoose
    .connect(process.env.ATLAS_URI || MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to database!");
    })
    .catch((error) => {
      console.log("Failed to connect to database...");
      console.error(error);
      process.exit(1);
    });
};