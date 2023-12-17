const mongoose = require("mongoose");
const User = require("../models/users");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

const connectDB = async (event, context) => {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    mongoose.set("strictQuery", false);
    await mongoose
      .connect(uri)
      .then(() => console.log("mongoose connected"))
      .catch((err) => console.log(err));

    const db = mongoose.connection;

    return db;
  } catch (error) {
    // Ensures that the client will close when you finish/error
    console.log(error);
  }
};

module.exports = connectDB;
