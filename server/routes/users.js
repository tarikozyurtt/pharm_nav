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
router.post("/register", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    userRole: req.body.userRole,
    // Other properties based on your schema
  });
  const result = async () => {
    try {
      const db = await connectDB();

      console.log("new user info");

      await newUser.save();
      await Pharmacy.create({
        ownerId: "test",
        name: "tset",
      });
      await Code.create({
        code: "ABC",
        drugs: {
          prozac: 2,
          aspirin: 3,
          parol: 4,
        },
      });

      return db;
    } catch (error) {
      console.log(error);
    }
  };
  const db = await result();

  //const { name, email, password } = req.body;

  // Create a new user with the provided name, email, and password

  // const user = new User(newUser);
  // await user.save();

  // Return the new user as JSON
  res.status(200).json({ userName: newUser.name, userEmail: newUser.email });
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
