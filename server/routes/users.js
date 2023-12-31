// Import necessary modules
const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Pharmacy = require("../models/pharmacySchema");
const Code = require("../models/codeSchema");
const auth = require("../middleware/auth");
const connectDB = require("../helpers/dbMongoose");
const ticketSchema = require("../models/supportSchema");
const { mongoose } = require("mongoose");
const formidable = require("formidable");
const fs = require("fs").promises;
const axios = require("axios");
const FormData = require("form-data");
const { MongoClient, ServerApiVersion } = require("mongodb");
const pharmacySchema = require("../models/pharmacySchema");

// Create a new user
router.post("/registerPatient", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  await connectDB();
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    userRole: req.body.userRole,
  });
  try {
    await newUser.save();
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error
      return res.status(400).send("Email already exists");
    } else {
      return res.status(500).send(error);
    }
  }

  //const { name, email, password } = req.body;

  // Create a new user with the provided name, email, and password

  // const user = new User(newUser);
  // await user.save();

  // Return the new user as JSON
  res.status(200).json({
    userName: newUser.name,
    userEmail: newUser.email,
    userId: newUser._id,
  });
});

router.post("/history", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  await connectDB();
  const { userId } = req.body;
  const userInfo = await User.findById(userId);

  if (!userInfo) {
    return res.status(400).send("User not found");
  }

  res
    .status(200)
    .json({ pastPrescriptions: userInfo?.pastPrescriptions ?? [] });
});
//
router.post("/registerPharmacist", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  await connectDB();
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    userRole: req.body.userRole,
    pharmacyName: req.body.pharmacyName,
  });
  try {
    await newUser.save();
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error
      return res.status(400).send("Email already exists");
    } else {
      return res.status(500).send(error);
    }
  }

  const newPharmacy = new Pharmacy({
    name: req.body.pharmacyName,
    location: req.body.location,
    ownerId: newUser._id,
    description: req.body.description,
    address: req.body.address,
    phoneNum: req.body.phoneNum,
  });
  try {
    console.log(newUser._id);
    console.log(req.body.location);
    await newPharmacy.save();
  } catch (error) {
    // MongoDB duplicate key error

    return res.status(500).send(error);
  }
  console.log("The host is:");
  console.log(req.get("host"));
  // Return the new user as JSON
  res.status(200).json({
    userId: newUser._id,
    userName: newUser.name,
    userEmail: newUser.email,
    pharmacyName: newUser.pharmacyName,
    location: newPharmacy.location,
  });
});

router.post("/sendticket", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  await connectDB();
  const { email, pharmacyName, pharmacistName, description } = req.body;
  const newTicket = new ticketSchema({
    email: email,
    pharmacyName: pharmacyName,
    pharmacistName: pharmacistName,
    description: description,
  });
  try {
    await newTicket.save();
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      // MongoDB duplicate key error
      return res.status(400).send("Ticket already exists");
    } else {
      return res.status(500).send(error);
    }
  }
  res.status(200).json({
    email: newTicket.email,
    pharmacyName: newTicket.pharmacyName,
    pharmacistName: newTicket.pharmacistName,
    description: newTicket.description,
  });
});

router.post("/image", async (req, res) => {
  console.log("here");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const formatted = formidable();
  formatted.parse(req, async (err, fields, files) => {
    if (!fields?.pharmacyId)
      return res.status(400).send("Pharmacy id is required");
    try {
      const file = await fs.readFile(files.file.filepath);
      var form = new FormData();
      form.append("file", file);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api.cloudflare.com/client/v4/accounts/ef12f5cfc8aa66a02afc9df9185e3d97/images/v1",
        headers: {
          Authorization: "Bearer 3rcWJpvU00LP3tejFLTxFlFeWt0k3dSqBWt3u4qp",
          ...form.getHeaders(),
        },
        data: form,
      };
      axios
        .request(config)
        .then(async (response) => {
          res.send({
            message: "success",
            image: response.data.result.variants[0],
          });
          await dbConnect();
          await pharmacySchema.updateOne(
            { _id: fields.pharmacyId },
            { $push: { pharmImages: response.data.result.variants[0] } }
          );
        })
        .catch((error) => {
          console.log(error);
          console.log("error");
          res.status(500).send({ message: "error", image: "error" });
        });
    } catch (error) {
      console.log(error);
      console.log("error");

      res.status(500).send({ message: "error", image: "error" });
    } finally {
      // Delete uploaded file
      await fs.unlink(files.file.filepath);
    }
  });
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
