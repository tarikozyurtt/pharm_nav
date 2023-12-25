const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const connectDB = require("../helpers/dbMongoose");
const codeSchema = require("../models/codeSchema");
const pharmacySchema = require("../models/pharmacySchema");
const router = express.Router();
require("dotenv").config();
router.post("/pharmacy", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  await connectDB();
  const { code, location } = req.body;
  let codeData = await codeSchema.findOne({ code: code });
  if (!codeData) {
    return res.status(401).json({ message: "Code is incorrect" });
  }
  const { drugs } = codeData;
  const matchConditions = Object.keys(drugs).reduce((acc, drug) => {
    acc[`drugs.${drug}`] = { $gt: drugs[drug] };
    return acc;
  }, {});
  let pipeline = [
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [location.longitude, location.latitude],
        },
        distanceField: "distance",
        spherical: true,
      },
    },
    {
      $match: matchConditions,
    },
    {
      $project: {
        ownerId: 1,
        name: 1,
        drugs: 1, // Include the entire drugs object in the output
        location: 1,
      },
    },
  ];
  console.log(location);

  let pharmacyData = await pharmacySchema.aggregate(pipeline);
  // Return the token as JSON
  res.status(200).json({
    pharmacyData: pharmacyData,
  });
});

module.exports = router;
