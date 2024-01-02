const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const connectDB = require("../helpers/dbMongoose");
const router = express.Router();
require("dotenv").config();

router.post("/authenticate", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  await connectDB();
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }

  const user = await User.findOne({ email: email });
  // If the user doesn't exist or the password is incorrect, return an error
  if (!user) {
    return res.status(401).json({ message: "Email or password is incorrect" });
  }
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Email or password is incorrect" });
  }

  // Generate a JWT token with the user ID as payload
  
  const token = jwt.sign({ user }, process.env.JWT_SECRET);

  // Return the token as JSON
  res.status(200).json({
    userToken: token,
    userInfo: { userName: user.name, userEmail: user.email, userId: user._id },
  });
});

module.exports = router;
