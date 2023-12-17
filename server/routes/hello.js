const express = require("express");
const connectDB = require("../helpers/dbMongoose");
const User = require("../models/users");

names = { 1: "John", 2: "Jane", 3: "Jack" };

const router = express.Router();
const axios = require("axios");

// Get all names
router.get("/hello", async (req, res) => {
  const result = async () => {
    const connection = await connectDB();
    const x = await User.find({});
    console.log(x);
    const newUser = new User({
      name: "exampleUser",
      email: "user@example.com",
      password: "expw123",
      // Other properties based on your schema
    });

    
    await newUser.save();

    //console.log(connection);
  };
  await result();
  console.log(process.env.MONGODB_URI);
  console.log(process.env.JWT_SECRET);

  res.json(names);
  console.log(names);
});

// Get a single name

// Update a single name
router.put("/:id", (req, res, next) => {
  names[req.params.id] = req.body.name;
  res.json(names[req.params.id]);
  console.log(names);
});

// Add a new name
router.post("/", (req, res) => {
  names[req.body.id] = req.body.name;
  res.json(names[req.body.id]);
  console.log(names);
});

// Delete a name
router.delete("/:id", (req, res) => {
  delete names[req.params.id];
  res.json(names);
  console.log(names);
});

module.exports = router;
