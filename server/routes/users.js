// Import necessary modules
const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Pharmacy = require("../models/pharmacySchema");
const Code = require("../models/codeSchema");
const auth = require("../middleware/auth");
const connectDB = require("../helpers/dbMongoose");

const { mongoose } = require("mongoose");

const { MongoClient, ServerApiVersion } = require("mongodb");

// Create a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, userRole } = req.body;

    // Validate the incoming data
    if (!name || !email || !password || !userRole) {
      return res.status(400).send('Validation failed: Name, email, password, and userRole are required');
    }

    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );

    await connectDB();

    const newUser = new User({
      name,
      email,
      password,
      userRole,
    });

    try {
      await newUser.save();
      res.status(200).json({
        userName: newUser.name,
        userEmail: newUser.email,
      });
    } catch (error) {
      if (error.code === 11000) {
        // MongoDB duplicate key error
        return res.status(400).send('Email already exists');
      } else {
        return res.status(500).send(error);
      }
    }
  } catch (validationError) {
    console.error(validationError);
    return res.status(400).send('Validation failed: Name, email, password, and userRole are required');
  }
});


router.get("/user", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    const userName = user.name;

    res.json({ name: userName });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
